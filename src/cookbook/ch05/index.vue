<template>
    <div>
        <div class="demo">
            <h2>坐标轴</h2>
            <div id="top"></div>
            <div id="bottom"></div>
            <div id="left"></div>
            <div id="right"></div>
        </div>

        <div class="demo">
            <h2>绘制网格线</h2>
            <div id="axis"></div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';
export default {
    name: 'ch05',

    mounted() {
        this.demo01();
        this.demo02();
    },

    methods: {
        demo01(orient) {
            var height = 500,
                width = 500,
                margin = 25,
                offset = 50,
                axisWidth = width - 2 * margin,
                svg;

            function createSvg(selector) {
                svg = d3.select(selector).append('svg')
                    .attr('class', 'axis')
                    .attr('width', width)
                    .attr('height', height);
            }

            function renderAxis(scale, i, orient) {
                var method = {
                    bottom: 'axisBottom',
                    top: 'axisTop',
                    left: 'axisLeft',
                    right: 'axisRight'
                };
                var axis = d3[method[orient]]()
                    .scale(scale)
                    .ticks(5);

                svg.append('g')
                    .attr('transform', () => {
                        if (['top', 'bottom'].indexOf(orient) != -1)
                            return 'translate(' + margin + ', ' + i * offset + ')';
                        else
                            return 'translate(' + i * offset + ', ' + margin + ')';
                    })
                    .call(axis);
            }

            function renderAll(selector, orient) {
                // if(svg) svg.remove();

                createSvg(selector);

                renderAxis(d3.scaleLinear().domain([0, 1000]).range([0, axisWidth]), 1, orient);

                renderAxis(d3.scalePow().exponent(2).domain([0, 1000]).range([0, axisWidth]), 2, orient);

                renderAxis(d3.scaleTime().domain([new Date(2012, 0, 1), new Date()]).range([0, axisWidth]), 3, orient);
            }

            ['bottom', 'top', 'left', 'right'].forEach(orient => {
                renderAll('#' + orient, orient);
            });
        },

        demo02() {
            var height = 500,
                width = 500,
                margin = 25;

            var svg = d3.select('#axis')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            function renderXAxis() {
                var axisLength = width - 2 * margin;
                var scale = d3.scaleLinear().domain([0, 100]).range([0, axisLength]);
                var xAxis = d3.axisBottom().scale(scale);

                svg.append('g')
                    .attr('class', 'x-axis')
                    .attr('transform', () => 'translate(' + margin + ', ' + (height - margin) + ')')
                    .call(xAxis);

                d3.select('#axis').selectAll('g.x-axis g.tick')
                    .append('line')
                    .classed('grid-line', true)
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 0)
                    .attr('y2', - (height - 2 * margin));

            }

            function renderYAxis() {
                var axisLength = height - 2 * margin;

                var scale = d3.scaleLinear().domain([100, 0]).range([0, axisLength]);
                var yAxis = d3.axisLeft().scale(scale);

                svg.append('g')
                    .attr('class', 'y-axis')
                    .attr('transform', () => 'translate(' + margin + ', ' + margin + ')')
                    .call(yAxis);

                d3.select('#axis')
                  .selectAll('g.y-axis g.tick')
                  .append('line')
                  .classed('grid-line', true)
                  .attr('x1', 0)
                  .attr('y1', 0)
                  .attr('x2', axisLength)
                  .attr('y2', 0);
            }

            renderXAxis();
            renderYAxis();
        }
    }
}
</script>

<style>
.grid-line {
    stroke: #ccc;
    stroke-opacity: .4;
}
</style>