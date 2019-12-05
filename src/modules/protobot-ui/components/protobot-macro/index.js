// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetTreeStructureMixin } from '../../mixins/get-tree-structure';
// import { GoogleCharts } from 'google-charts';
// import * as d3 from 'd3';
// import { d3sankey } from './sankey';
// import { sankey as d3sankey } from 'd3-sankey';
// import 'd3-sankey';
import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-macro')
class ProtobotMacro extends GetTreeStructureMixin(LitElement) {
  treeChanged (tree) {
    if (tree) {
      console.log(this.tree);
      // this.setSankey(this.tree);
      // Load the charts library with a callback
      // GoogleCharts.load(this.drawChart.bind(this, tree), {
      //   packages: ['sankey']
      // });
      this.drawChart(this.tree);
    }
  }

  async drawChart (tree) {
    // const data = new GoogleCharts.api.visualization.DataTable();
    // data.addColumn('string', 'From');
    // data.addColumn('string', 'To');
    // data.addColumn('number', 'Weight');
    const rows = [];

    const promises = [];
    const topicMap = {};
    const tpromises = [];
    const utteranceTree = {};
    const utteranceTopicMap = {};
    const utteranceName = {};

    if (tree) {
      for (const i in tree) {
        // console.log(tree[i])
        const { utterances, parent } = tree[i];

        for (const utteranceId in utterances) {
          promises.push(database.ref(`utterances/data/${utteranceId}`).once('value'));
        }

        if (parent && tree[parent]) {
          const { utterances: utteranceParent } = tree[parent];

          for (const utteranceId in utteranceParent) {
            if (!utteranceTree[utteranceId]) utteranceTree[utteranceId] = [];
            for (const utteranceId2 in utterances) {
              utteranceTree[utteranceId].push(utteranceId2);
            }
          }
        }
      }

      const results = await Promise.all(promises);

      for (const i in results) {
        const utterance = { ...results[i].val(), utteranceId: results[i].key };
        const { topics, utteranceId, text, userId, version } = utterance;

        utteranceName[utteranceId] = { text, userId, version };

        for (const topic in topics) {
          utteranceTopicMap[utteranceId] = topic;
          topicMap[topic] = true;
          break;
        }
      }

      for (const t in topicMap) {
        tpromises.push(database.ref(`labels/data/${t}`).once('value'));
      }

      const tresults = await Promise.all(tpromises);

      for (const tr in tresults) {
        const { name } = tresults[tr].val();
        topicMap[tresults[tr].key] = name;
      }

      const topicGraph = {};

      for (const utteranceId in utteranceTree) {
        const topic = utteranceTopicMap[utteranceId] || 'No Topic';

        for (const u of utteranceTree[utteranceId]) {
          const t = utteranceTopicMap[u] || 'No Topic';

          if (topic !== t) {
            topicGraph[topic] = topicGraph[topic] || {};
            topicGraph[topic][t] = topicGraph[topic][t] || [];
            topicGraph[topic][t].push(u);
          }
        }
      }

      for (const topic in topicGraph) {
        for (const t in topicGraph[topic]) {
          const row = [topicMap[topic] || 'No Topic', topicMap[t] || 'No Topic', topicGraph[topic][t]];
          rows.push(row);
        }
      }

      this.setSankey(rows, utteranceName);

      // data.addRows(rows);
      // const options = {
      //   width: '100vw',
      //   height: 500,
      //   sankey: {
      //     node: {
      //       nodePadding: 30,
      //       interactivity: true
      //     }
      //   }
      // };

      // if (this.chart) this.chart.clearChart();

      // this.chart = new GoogleCharts.api.visualization.Sankey(this.shadowRoot.querySelector('.sankey'));
      // this.chart.draw(data, options);

      // GoogleCharts.api.visualization.events.addListener(this.chart, 'select', this.selectHandler.bind(this));
    }
  }

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

    const { domainId } = this;

    for (const row of rows) {
      // @ts-ignore
      graph.links.push({ source: row[0] || 'No Topic', target: row[1] || 'No Topic', value: row[2].length });
      // @ts-ignore
      const index = graph.nodes.findIndex(item => item.name === row[0]);
      const array = [];
      for (const u of row[2]) {
        array.push(utteranceName[u]);
      }

      if (index < 0) {
        const obj = { name: row[0], utterances: array };
        // @ts-ignore
        graph.nodes.push(obj);
      } else {
        // @ts-ignore
        graph.nodes[index].utterances = [...graph.nodes[index].utterances, ...array];
      }
    }

    // console.log(graph)

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
        tooltip.innerHTML = d.utterances.map(item => `<a href="/?domain=${domainId}&page=micro&set=1&crowdId=${item.userId}">${item.text}</a>`).join('<br>');
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
