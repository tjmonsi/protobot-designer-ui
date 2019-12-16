// Import the LitElement base class and html helper function
import { LitElement, customElement, property } from 'lit-element';
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
        const utteranceDictionary = {};
        const rowItems = [];
        const upromises = [];
        // const
        for (const user in d1) {
          // console.log(`users/lists/domain-utterances/${user}/${domainId}/`);
          promises.push(database.ref(`users/lists/domain-utterances/${user}/${domainId}/`).once('value'));
        }
        // console.log(promises);
        const results = await Promise.all(promises);

        for (const snap of results) {
          const d2 = snap.val();
          const userId = snap.ref.parent.key;
          // console.log('snap', parent)
          // console.log(d2)
          if (d2) {
            for (const z in d2) {
              const x = d2[z];
              if (x) {
                const arr = [];
                for (const y in x) {
                  arr[parseInt(x[y])] = y;
                  uniqueUtterances[y] = true;
                }
                // console.log(arr)

                for (const index in arr) {
                  // console.log(arr[index], index, index + 1, arr.length);
                  // @ts-ignore
                  if (parseInt(index) + 1 < arr.length) {
                    let flag = true;
                    for (const i in rowItems) {
                      if (rowItems[i].sourceUtterance === arr[index] && rowItems[i].targetUtterance === arr[index + 1]) {
                        rowItems[i].users.push({
                          userId,
                          set: z
                        });
                        flag = false;
                      }
                    }

                    if (flag) {
                      const obj = {
                        sourceUtterance: arr[index],
                        targetUtterance: arr[parseInt(index) + 1],
                        users: [{
                          userId,
                          set: z
                        }]
                      };
                      rowItems.push(obj);
                    }
                  }
                }
                // console.log(x);
              }
            }
          }
        }

        for (const utteranceId in uniqueUtterances) {
          upromises.push(database.ref(`utterances/data/${utteranceId}/`).once('value'));
        }

        const uresults = await Promise.all(upromises);

        for (const usnap of uresults) {
          const d1 = usnap.val();
          const k1 = usnap.key;
          utteranceDictionary[usnap.key] = d1;
          let topic = null;
          for (const t1 in d1.topics) {
            topic = t1;
            break;
          }
          for (const index in rowItems) {
            if (rowItems[index].sourceUtterance === k1) {
              rowItems[index].source = topic;
            }
            if (rowItems[index].targetUtterance === k1) {
              rowItems[index].target = topic;
            }
          }
          // console.log(topic, k1);
        }

        console.log(rowItems);

        this.setSankey(rowItems, utteranceDictionary);
      }
    }

    // console.log(domainId);
    // const snap = await database.ref('tree-structure/data/').orderByChild('domain').equalTo(domainId)
    //   // .limitToFirst(10)
    //   .once('value');
    // this.tree = snap.val() || null;
    // this.treeChanged(this.tree);
  }

  // treeChanged (tree) {
  //   if (tree) {
  //     console.log(this.tree);
  //     // this.setSankey(this.tree);
  //     // Load the charts library with a callback
  //     // GoogleCharts.load(this.drawChart.bind(this, tree), {
  //     //   packages: ['sankey']
  //     // });
  //     const newTree = {};

  //     for (const i in this.tree) {
  //       console.log(this.lastDeployedDomainVersion, this.tree[i].version)
  //       if (this.lastDeployedDomainVersion === this.tree[i].version) {

  //         newTree[i] = this.tree[i];
  //       }
  //     }
  //     console.log('fjdkjkdsf', newTree)
  //     this.drawChart(newTree);
  //   }
  // }

  // async drawChart (tree) {
  //   // const data = new GoogleCharts.api.visualization.DataTable();
  //   // data.addColumn('string', 'From');
  //   // data.addColumn('string', 'To');
  //   // data.addColumn('number', 'Weight');
  //   const rows = [];

  //   const promises = [];
  //   const topicMap = {};
  //   const tpromises = [];
  //   const utteranceTree = {};
  //   const utteranceTopicMap = {};
  //   const utteranceName = {};

  //   if (tree) {
  //     for (const i in tree) {
  //       // console.log(tree[i])
  //       const { utterances, parent } = tree[i];

  //       for (const utteranceId in utterances) {
  //         promises.push(database.ref(`utterances/data/${utteranceId}`).once('value'));
  //       }

  //       if (parent && tree[parent]) {
  //         const { utterances: utteranceParent } = tree[parent];

  //         for (const utteranceId in utteranceParent) {
  //           if (!utteranceTree[utteranceId]) utteranceTree[utteranceId] = [];
  //           for (const utteranceId2 in utterances) {
  //             utteranceTree[utteranceId].push(utteranceId2);
  //           }
  //         }
  //       }
  //     }

  //     const results = await Promise.all(promises);

  //     for (const i in results) {
  //       const utterance = { ...results[i].val(), utteranceId: results[i].key };
  //       const { topics, utteranceId, text, userId, version } = utterance;

  //       utteranceName[utteranceId] = { text, userId, version };

  //       for (const topic in topics) {
  //         utteranceTopicMap[utteranceId] = topic;
  //         topicMap[topic] = true;
  //         break;
  //       }
  //     }

  //     for (const t in topicMap) {
  //       tpromises.push(database.ref(`labels/data/${t}`).once('value'));
  //     }

  //     const tresults = await Promise.all(tpromises);

  //     for (const tr in tresults) {
  //       // console.log(tresults[tr].val(), tr);
  //       const { name } = tresults[tr].val() || {};
  //       topicMap[tresults[tr].key] = name;
  //     }

  //     const topicGraph = {};

  //     for (const utteranceId in utteranceTree) {
  //       const topic = utteranceTopicMap[utteranceId] || 'No Topic';

  //       for (const u of utteranceTree[utteranceId]) {
  //         const t = utteranceTopicMap[u] || 'No Topic';

  //         if (topic !== t) {
  //           topicGraph[topic] = topicGraph[topic] || {};
  //           topicGraph[topic][t] = topicGraph[topic][t] || [];
  //           topicGraph[topic][t].push(u);
  //         }
  //       }
  //     }

  //     for (const topic in topicGraph) {
  //       for (const t in topicGraph[topic]) {

  //         const row = [topicMap[topic] || 'No Topic', topicMap[t] || 'No Topic', topicGraph[topic][t]];
  //         rows.push(row);
  //       }
  //     }

  //     this.setSankey(rows, utteranceName);

  //     // data.addRows(rows);
  //     // const options = {
  //     //   width: '100vw',
  //     //   height: 500,
  //     //   sankey: {
  //     //     node: {
  //     //       nodePadding: 30,
  //     //       interactivity: true
  //     //     }
  //     //   }
  //     // };

  //     // if (this.chart) this.chart.clearChart();

  //     // this.chart = new GoogleCharts.api.visualization.Sankey(this.shadowRoot.querySelector('.sankey'));
  //     // this.chart.draw(data, options);

  //     // GoogleCharts.api.visualization.events.addListener(this.chart, 'select', this.selectHandler.bind(this));
  //   }
  // }

  selectHandler () {
    if (this.chart) {
      const select = this.chart.getSelection();
      console.log(select);
    }
  }

  setSankey (rows, utteranceName) {
    const graph = {
      nodes: [{ name: 'No Topic', utterances: [] }],
      links: []
    };

    // const { domainId } = this;

    for (const row of rows) {
      let flag = true;

      for (const i in graph.links) {
        // @ts-ignore
        if (graph.links[i].source === row.source && graph.links[i].target === row.target) {
          flag = false;
          // @ts-ignore
          graph.links[i].value++;
        }
      }

      if (flag) {
        if (row.source !== row.target) {
          graph.links.push({
            // @ts-ignore
            source: row.source || 'No Topic',
            // @ts-ignore
            target: row.target || 'No Topic',
            // @ts-ignore
            value: 1
          });
        } else {

        }
      }

      const index = graph.nodes.findIndex(item => item.name === row.source);
      const index2 = graph.nodes.findIndex(item => item.name === row.target);

      if (index < 0 || index2 < 0) {
        if (index < 0) {
          graph.nodes.push({
            name: row.source,
            utterances: []
          });
        } else if (index2 < 0) {
          graph.nodes.push({
            name: row.target,
            utterances: []
          });
        }
      }
    }

    // for (const row of rows) {
    //   console.log(row)
    //   // @ts-ignore
    //   graph.links.push({ source: row[0] || 'No Topic', target: row[1] || 'No Topic', value: row[2].length });
    //   // @ts-ignore
    //   const index = graph.nodes.findIndex(item => item.name === row[0]);
    //   const index2 = graph.nodes.findIndex(item => item.name === row[1]);
    //   const array = [];
    //   for (const u of row[2]) {
    //     array.push(utteranceName[u]);
    //   }

    //   console.log(row[0], array, row[2]);
    //   if (index < 0) {
    //     const obj = { name: row[0], utterances: array };
    //     // @ts-ignore
    //     graph.nodes.push(obj);
    //   } else {
    //     // @ts-ignore
    //     graph.nodes[index].utterances = [...graph.nodes[index].utterances, ...array];
    //   }

    //   if (index2 < 0) {
    //     const obj = { name: row[1], utterances: [] };
    //     // @ts-ignore
    //     graph.nodes.push(obj);
    //   } else {
    //     // @ts-ignore
    //     // graph.nodes[index2].utterances = [...graph.nodes[index2].utterances, ...array];
    //     console.log('hey');
    //   }
    // }

    console.log(graph)

    // @ts-ignore
    const { d3 } = window;
    var units = 'Utterances';
    var margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = this.getBoundingClientRect().width - margin.left - margin.right;
    const height = 740 - margin.top - margin.bottom;
    var formatNumber = d3.format(',.0f');
    const format = function (d) { return formatNumber(d) + ' ' + units; };
    const color = d3.scale.category20();

    // append the svg canvas to the page
    d3.select(this.shadowRoot).select('.sankey').html('')
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

    console.log(graph)

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
      .sort(function (a, b) { return b.dy - a.dy; });

    // add the link titles
    link.append('title')
      .text(function (d) { return d.source.name + ' → ' + d.target.name + '\n' + format(d.value); });

    // add in the nodes
    var node = svg.append('g').selectAll('.node')
      .data(graph.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
      .on('mousedown', function (d) {
        // console.log(this)
        if (this.getAttribute('toggle') === 'False') {
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
        tooltip.innerHTML = d.utterances.map(item => `<a href="/?domain=${domainId}&page=${item.userId ? `micro&set=1&crowdId=${item.userId}` : 'authoring'}">${!item.userId ? 'Part of Authoring -' : ''}${item.text}</a>`).join('<br>');
        //
        // console.log(this);
      })
      .attr('toggle', 'False')
      .call(d3.behavior.drag()
        .origin(function (d) { return d; })
        .on('dragstart', function () { this.parentNode.appendChild(this); })
        .on('drag', dragmove));

    // add the rectangles for the nodes
    node.append('rect')
      .attr('height', function (d) { return d.dy; })
      .attr('width', sankey.nodeWidth())
      .style('fill', function (d) { return color(d.name.replace(/ .*/, '')); })
      .style('stroke', function (d) { return d3.rgb(d.color).darker(2); })
      .append('title')
      .text(function (d) { return d.name + '\n' + format(d.value); })

    // add in the title for the nodes
    const text = node.append('text')
      .attr('x', -6)
      .attr('y', function (d) { return d.dy / 2; })
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('transform', null)
      .text(function (d) { return `${d.name}`; })
      .filter(function (d) { return d.x < width / 2; })
      .attr('x', 6 + sankey.nodeWidth())
      .attr('text-anchor', 'start')
      .attr('name', function (d) { return d.name; });

    // function dragobj
    text.append('tspan')
      .attr('x', -6)
      .attr('y', function (d) { return d.dy / 2; })
      .attr('dy', '1.55em')
      .attr('text-anchor', 'start')
      .attr('x', 6 + sankey.nodeWidth())
      .text(function (d) { return `${d.utterances.length} utterances`; })

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

  // async setSankey (tree) {
  //   const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  //   const width = this.getBoundingClientRect().width - margin.left - margin.right;
  //   const height = 480 - margin.top - margin.bottom;

  //   const x = this.shadowRoot.querySelector('.sankey');

  //   if (x) {
  //     x.innerHTML = '';
  //   }

  //   const svg = d3.select(this.shadowRoot).select('.sankey').append('svg')
  //     .attr('width', '100vw')
  //     .attr('height', '100vh')
  //     .append('g')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //   const color = d3.scaleOrdinal([
  //     '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d',
  //     '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476',
  //     '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc',
  //     '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9']);

  //   const sankey = d3sankey()
  //     .nodeWidth(36)
  //     // @ts-ignore
  //     .nodePadding(290)
  //     .size([this.getBoundingClientRect().width, this.getBoundingClientRect().height]);

  //   const graph = await d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json');

  //   // console.log(d3.json)

  //   // console.log(graph);
  //   const g = { nodes: [], links: [] };

  //   let count = 0;
  //   for (const i in tree) {
  //     const node = {
  //       node: count,
  //       name: i
  //     };
  //     count++;
  //     // @ts-ignore
  //     g.nodes.push(node);
  //   }

  //   for (const i in tree) {
  //     for (const j in tree[i].children) {
  //       // @ts-ignore
  //       const index = g.nodes.findIndex(item => item.name === i);
  //       // @ts-ignore
  //       const c = index > -1 ? g.nodes[index].node : null;
  //       // @ts-ignore
  //       const targetIndex = g.nodes.findIndex(item => item.name === j);
  //       // @ts-ignore
  //       const targetC = targetIndex > -1 ? g.nodes[targetIndex].node : null;

  //       if (c && targetC) {
  //         const link = {
  //           source: c,
  //           target: targetC,
  //           value: Object.keys(tree[i].utterances).length
  //         };
  //         // @ts-ignore
  //         g.links.push(link);
  //       }
  //     }
  //   }

  //   console.log(g)

  //   // Constructs a new Sankey generator with the default settings.
  //   sankey
  //     .nodes(g.nodes)
  //     .links(g.links)
  //     .layout(1);

  //   // add in the links
  //   const link = svg.append('g')
  //     .selectAll('.link')
  //     .data(g.links)
  //     .enter()
  //     .append('path')
  //     .attr('class', 'link')
  //     .attr('d', sankey.link())
  //     .style('stroke-width', function (d) { return Math.max(1, d.dy); })
  //     .sort(function (a, b) { return b.dy - a.dy; });

  //   // console.log(link);

  //   // add in the nodes
  //   const node = svg.append('g')
  //     .selectAll('.node')
  //     .data(g.nodes)
  //     .enter().append('g')
  //     .attr('class', 'node')
  //     .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
  //     .call(d3.drag()
  //       .subject(function (d) { return d; })
  //       .on('start', function () { this.parentNode.appendChild(this); })
  //       .on('drag', dragmove));

  //   console.log(color);
  //   // add the rectangles for the nodes
  //   node
  //     .append('rect')
  //     .attr('height', function (d) { return d.dy; })
  //     .attr('width', sankey.nodeWidth())
  //     .style('fill', function (d) {
  //       return color(d.name.replace(/ .*/, ''));
  //     })
  //     .style('stroke', function (d) { return d3.rgb(d.color).darker(2); })
  //     // Add hover text
  //     .append('title')
  //     .text(function (d) { return d.name + '\n' + 'There is ' + d.value + ' stuff in this node'; });

  //   // add in the title for the nodes
  //   node
  //     .append('text')
  //     .attr('x', -6)
  //     .attr('y', function (d) { return d.dy / 2; })
  //     .attr('dy', '.35em')
  //     .attr('text-anchor', 'end')
  //     .attr('transform', null)
  //     .text(function (d) { return d.name; })
  //     .filter(function (d) { return d.x < width / 2; })
  //     .attr('x', 6 + sankey.nodeWidth())
  //     .attr('text-anchor', 'start');

  //   // the function for moving the nodes
  //   function dragmove (d) {
  //     d3.select(this)
  //       .attr('transform',
  //         'translate(' +
  //           d.x + ',' +
  //           (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ')');
  //     sankey.relayout();
  //     link.attr('d', sankey.link());
  //   }
  // }

  render () {
    return template(this);
  }

  closeTooltip ({ target }) {
    target.style.display = 'none';
  }
}

export { ProtobotMacro };
