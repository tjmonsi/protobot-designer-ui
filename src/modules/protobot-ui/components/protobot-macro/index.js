// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
import { render, html } from 'lit-html';
import { template } from './template.js';
import { GetDomainUsersMixin } from '../../mixins/get-domain-users';
// import { GetDomainMixin } from '../../mixins/get-domain';
// import { GoogleCharts } from 'google-charts';
// import * as d3 from 'd3';
// import { d3sankey } from './sankey';
// import { sankey as d3sankey } from 'd3-sankey';
// import 'd3-sankey';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-macro')
class ProtobotMacro extends GetDomainUsersMixin(LitElement) {
  // @ts-ignore
  @property({ type: Object })
  tree;

  // @ts-ignore
  @property({ type: String })
  lastDeployedDomainVersion

  domainUsersChanged (data) {
    console.log(data);
  }

  updated (changedProps) {
    if (super.updated) super.updated(changedProps);
    if (changedProps.has('domainId') || changedProps.has('lastDeployedDomainVersion')) {
      this.getTreeStructure(this.queryObject.domain, this.lastDeployedDomainVersion);
    }
  }

  async getTreeStructure (domainId, lastDeployedDomainVersion) {
    console.log('start', domainId, lastDeployedDomainVersion);
    if (lastDeployedDomainVersion) {
      const s1 = await database.ref(`users/lists/domains/${domainId}/${lastDeployedDomainVersion}`).once('value');
      const d1 = s1.val();

      if (d1) {
        // console.log(d1);
        const promises = [];
        const uniqueUtterances = {};
        const uniqueTopic = {};
        const utteranceDictionary = {};
        const userDictionary = {};
        const topicDictionary = {
          'No Topic': { name: 'No Topic' }
        };
        const upromises = [];
        const tpromises = [];
        const u1promises = [];
        const d1users = {};
        const userUtterances = {};
        const userTopics = {};

        for (const user in d1) {
          u1promises.push(database.ref(`users/data/${user}`).once('value'));
        }

        const u1results = await Promise.all(u1promises);

        for (const snap of u1results) {
          const data = snap.val();
          const { LastEndTime } = data;
          const user = snap.key;
          if (LastEndTime) {
            d1users[user] = true;
            userDictionary[user] = data;
          }
        }

        for (const user in d1users) {
          promises.push(database.ref(`users/lists/domain-utterances/${user}/${domainId}/`).once('value'));
        }

        const results = await Promise.all(promises);

        for (const snap of results) {
          const d2 = snap.val();
          const userId = snap.ref.parent.key;
          userUtterances[userId] = {};
          if (d2) {
            for (const z in d2) {
              const x = d2[z];
              if (x) {
                const arr = [];
                for (const y in x) {
                  arr.push({ y, order: parseInt(x[y]) });
                  uniqueUtterances[y] = true;
                }
                const newArr = arr.sort((i, j) => i.order - j.order).map(i => i.y);
                userUtterances[userId][z] = newArr;
              }
            }
          }
        }

        console.log(userUtterances);

        for (const utteranceId in uniqueUtterances) {
          upromises.push(database.ref(`utterances/data/${utteranceId}/`).once('value'));
        }

        const uresults = await Promise.all(upromises);

        for (const usnap of uresults) {
          const d1 = usnap.val();
          const k1 = usnap.key;
          utteranceDictionary[k1] = d1;
          let topic = 'No Topic';
          for (const t1 in d1.topics) {
            topic = t1;
            uniqueTopic[topic] = true;
            break;
          }
          utteranceDictionary[k1].topic = topic;
        }

        for (const user in userUtterances) {
          userTopics[user] = {};
          for (const set in userUtterances[user]) {
            userTopics[user][set] = [];
            for (const utteranceId of userUtterances[user][set]) {
              const topicId = utteranceDictionary[utteranceId].topic;
              // console.log(userTopics[user][set][userTopics[user][set].length - 1], topicId);
              if ((userTopics[user][set].length === 0) || userTopics[user][set][userTopics[user][set].length - 1].topicId !== topicId) {
                userTopics[user][set].push({
                  topicId,
                  utterances: [utteranceId]
                });
              } else {
                userTopics[user][set][userTopics[user][set].length - 1].utterances.push(utteranceId);
              }
            }
          }
        }

        for (const user in userTopics) {
          for (const set in userTopics[user]) {
            for (const index in userTopics[user][set]) {
              // console.log(userTopics[user][set][parseInt(index) + 1], index + 1)
              userTopics[user][set][index].sourceTopic = `${userTopics[user][set][index].topicId}::${index}`;
              if (userTopics[user][set][parseInt(index) + 1]) {
                userTopics[user][set][index].targetUtterance = userTopics[user][set][parseInt(index) + 1].utterances[0];
                userTopics[user][set][index].targetTopic = `${userTopics[user][set][parseInt(index) + 1].topicId}::${parseInt(index) + 1}`;
              }
            }
          }
        }

        // console.log(userTopics);

        for (const topicId in uniqueTopic) {
          tpromises.push(database.ref(`labels/data/${topicId}/`).once('value'));
        }

        const tresults = await Promise.all(tpromises);

        for (const tsnap of tresults) {
          const d1 = tsnap.val();
          const k1 = tsnap.key;
          topicDictionary[k1] = d1;
        }

        this.setSankey(userTopics, lastDeployedDomainVersion, utteranceDictionary, topicDictionary, userDictionary);
      }
    }
  }

  selectHandler () {
    if (this.chart) {
      const select = this.chart.getSelection();
      console.log(select);
    }
  }

  setSankey (userTopics, lastDeployedDomainVersion, utteranceDictionary, topicDictionary, userDictionary) {
    const graph = {
      nodes: [{ name: 'No Topic', topic: 'No Topic', utterances: [] }],
      links: []
    };

    const { domainId } = this;

    for (const user in userTopics) {
      for (const set in userTopics[user]) {
        for (const item of userTopics[user][set]) {
          const target = item.targetTopic || 'End';
          if (graph.nodes.findIndex(obj => obj.name === item.sourceTopic) < 0) {
            const obj = {
              name: item.sourceTopic,
              topic: item.topicId,
              userUtterance: {}
            };

            obj.userUtterance[target] = {};
            obj.userUtterance[target][user] = {};
            obj.userUtterance[target][user][set] = item.utterances;

            // @ts-ignore
            graph.nodes.push(obj);
          } else {
            const i = graph.nodes.findIndex(obj => obj.name === item.sourceTopic);

            graph.nodes[i].userUtterance[target] = graph.nodes[i].userUtterance[target] || {};
            graph.nodes[i].userUtterance[target][user] = graph.nodes[i].userUtterance[target][user] || {};
            graph.nodes[i].userUtterance[target][user][set] = item.utterances;
          }

          if (item.targetTopic) {
            // @ts-ignore
            if (graph.links.findIndex(obj => obj.source === item.sourceTopic && obj.target === item.targetTopic) < 0) {
              const obj = {
                // @ts-ignore
                source: item.sourceTopic,
                // @ts-ignore
                target: item.targetTopic,
                // @ts-ignore
                value: 1
              };

              // @ts-ignore
              graph.links.push(obj);
            } else {
              // @ts-ignore
              const i = graph.links.findIndex(obj => obj.source === item.sourceTopic && obj.target === item.targetTopic);
              // @ts-ignore
              graph.links[i].value++;
            }
          }
        }
      }
    }

    console.log(graph);

    // @ts-ignore
    const { d3 } = window;
    var units = 'Utterances';
    var margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = this.getBoundingClientRect().width - margin.left - margin.right;
    // const height = 740 - margin.top - margin.bottom;
    const height = this.getBoundingClientRect().height * 0.6 - margin.top - margin.bottom;
    var formatNumber = d3.format(',.0f');
    const format = function (d) { return formatNumber(d) + ' ' + units; };
    const color = d3.scale.category20();

    // append the svg canvas to the page
    d3.select(this.shadowRoot).select('.sankey').html('');
    var svg = d3.select(this.shadowRoot).select('.sankey').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set the sankey diagram properties
    var sankey = d3.sankey()
      .nodeWidth(36)
      .nodePadding(10)
      .size([width, height]);

    var path = sankey.link();

    // load the data

    var nodeMap = {};
    // @ts-ignore
    graph.nodes.forEach(function (x) { nodeMap[x.name] = x; });
    // @ts-ignore
    graph.links = graph.links.map(function (x) {
      return {
        // @ts-ignore
        source: nodeMap[x.source],
        // @ts-ignore
        target: nodeMap[x.target],
        // @ts-ignore
        value: x.value
      };
    });

    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

    // console.log(graph)

    const tooltip = this.shadowRoot.querySelector('.tooltip');

    // add in the links
    var link = svg.append('g').selectAll('.link')
      .data(graph.links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', path)
      .style('stroke-width', function (d) { return Math.max(1, d.dy); })
      .sort(function (a, b) { return b.dy - a.dy; })
      .attr('toggle', 'False')
      .on('mousedown', function (d) {
        d.startDown = new Date();
      })
      .on('mouseup', function (d) {
        const up = new Date();
        if (up.getTime() - d.startDown.getTime() >= 500) {
          return;
        }

        const item = d.source.userUtterance[d.target.name];

        // console.log(this)
        if (this.getAttribute('toggle') === 'False' && item) {
          this.setAttribute('toggle', 'True');
          tooltip.style.display = null;
        } else {
          this.setAttribute('toggle', 'False');
          tooltip.style.display = 'none';
        }

        const { x, y } = this.getBoundingClientRect();

        tooltip.style.position = 'absolute';
        tooltip.style.top = y + 'px';
        tooltip.style.left = x + 'px';
        tooltip.style.background = 'white';
        tooltip.style.padding = '12px';

        if (item) {
          const userArray = [];
          for (const user in item) {
            for (const set in item[user]) {
              userArray.push({
                user,
                set,
                utterances: item[user][set]
              });
            }
          }

          console.log(userArray);

          render(html`
            <p style="font-weight: bold">${topicDictionary[d.source.topic].name} → ${topicDictionary[d.target.topic].name}</p>

            <ul>
              ${userArray.map(i => html`
                <li style="padding-bottom: 12px;">
                  <a href="/?page=micro&domain=${domainId}&crowdId=${i.user}&set=${i.set}&deployedVersion=${lastDeployedDomainVersion}">
                    ${userDictionary[i.user].name} - Set ${i.set}: <ol>
                      ${i.utterances.map(j => html`
                        <li>
                          ${utteranceDictionary[j].text}
                        </li>
                      `)}
                    </ol>
                  </a>
                </li>
              `)}
            </ul>
          `, tooltip);
        }
      });

    // add the link titles
    link.append('title')
      .text(function (d) { return d.source.name + ' → ' + d.target.name + '\n' + format(d.value); });

    // add in the nodes
    var node = svg.append('g').selectAll('.node')
      .data(graph.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
      // .on('mousedown', function (d) {
      //   d.startDown = new Date();
      //   //
      //   // console.log(this);
      // })
      // .on('mouseup', function (d) {
      //   const up = new Date();
      //   if (up.getTime() - d.startDown.getTime() >= 500) {
      //     return;
      //   }

    //   // console.log(this)
    //   if (this.getAttribute('toggle') === 'False') {
    //     this.setAttribute('toggle', 'True');
    //     tooltip.style.display = null;
    //   } else {
    //     this.setAttribute('toggle', 'False');
    //     tooltip.style.display = 'none';
    //   }

    //   const { x, y } = this.getBoundingClientRect();

      //   tooltip.style.position = 'absolute';
      //   tooltip.style.top = y + 'px';
      //   tooltip.style.left = x + 'px';
      //   tooltip.style.background = 'white';
      //   tooltip.style.padding = '12px';
      //   // tooltip.innerHTML = 'Hi';
      // })
      .attr('toggle', 'False')
      .call(d3.behavior.drag()
        .origin(function (d) { return d; })
        .on('dragstart', function () { this.parentNode.appendChild(this); })
        .on('drag', dragmove));

    // add the rectangles for the nodes
    node.append('rect')
      .attr('height', function (d) { return d.dy; })
      .attr('width', sankey.nodeWidth())
      .style('fill', function (d) {
        return d.topic ? color(d.topic.replace(/ .*/, '')) : 'red';
      })
      .style('stroke', function (d) { return d3.rgb(d.color).darker(2); })
      .append('title')
      .text(function (d) { return d.name + '\n' + format(d.value); });

    // add in the title for the nodes
    node.append('text')
      .attr('x', -6)
      .attr('y', function (d) { return d.dy / 2; })
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('transform', null)
      .text(function (d) { return `${topicDictionary[d.topic].name}`; })
      .filter(function (d) { return d.x < width / 2; })
      .attr('x', 6 + sankey.nodeWidth())
      .attr('text-anchor', 'start')
      .attr('name', function (d) { return d.name; });

    // // function dragobj
    // text.append('tspan')
    //   .attr('x', -6)
    //   .attr('y', function (d) { return d.dy / 2; })
    //   .attr('dy', '1.55em')
    //   .attr('text-anchor', 'start')
    //   .attr('x', 6 + sankey.nodeWidth())
    //   .text(function (d) { return `${d.utterances.length} utterances`; });

    // the function for moving the nodes
    function dragmove (d) {
      d3.select(this).attr('transform',
        'translate(' + (
          d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
        ) + ',' + (
          d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
        ) + ')');
      sankey.relayout();
      link.attr('d', path);
    }
  }

  render () {
    return template(this);
  }

  closeTooltip ({ target }) {
    target.style.display = 'none';
  }
}

export { ProtobotMacro };
