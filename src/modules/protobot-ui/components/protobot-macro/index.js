// Import the LitElement base class and html helper function
import { LitElement, customElement } from 'lit-element';
import { template } from './template.js';
import { GetTreeStructureMixin } from '../../mixins/get-tree-structure';
import { GoogleCharts } from 'google-charts';
// import * as d3 from 'd3';
// import { d3sankey } from './sankey';
// import { sankey as d3sankey } from 'd3-sankey';
// import 'd3-sankey';
// import { database } from '../../../firebase';

// Extend the LitElement base class
// @ts-ignore
@customElement('protobot-macro')
class ProtobotMacro extends GetTreeStructureMixin(LitElement) {
  treeChanged (tree) {
    if (tree) {
      console.log(this.tree);
      // this.setSankey(this.tree);
      // Load the charts library with a callback
      GoogleCharts.load(this.drawChart.bind(this, tree), {
        packages: ['sankey']
      });
    }
  }

  drawChart (tree) {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    const rows = [];

    // const { tree } = this;
    console.log(tree);

    if (tree) {
      for (const i in tree) {
        const row = [i];

        for (const j in tree[i].children) {
          row.push(j);
          // @ts-ignore
          row.push(Object.keys(tree[i].utterances).length);
        }

        if (row.length === 3) {
          rows.push(row);
        }
      }

      data.addRows(rows);
      const options = {
        width: 600,
        sankey: {
          node: {
            interactivity: true
          }
        }
      };

      const chart = new GoogleCharts.api.visualization.Sankey(this.shadowRoot.querySelector('.sankey'));
      chart.draw(data, options);

      GoogleCharts.api.visualization.events.addListener(chart, 'select', this.selectHandler.bind(this));
    }
    console.log(this.tree);
  }

  selectHandler (e) {
    console.log(e);
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
}

export { ProtobotMacro };
