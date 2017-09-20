<template>
    <div id="target"></div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        name: 'area',

        mounted() {
            this.render();
        },

        data() {
            return {
                margins: {
                    left: 30,
                    right: 30,
                    top: 30,
                    bottom: 30
                },
                width: 600,
                height: 300,
                colors: d3.scaleOrdinal(d3.schemeCategory10),
                data: this.getRandomData(),
                svg: null,
                axisG: null,
                bodyG: null
            };
        },

        computed: {
            startX() {
                return this.margins.left;
            },

            endX() {
                return this.width - this.margins.right;
            },

            startY() {
                return this.height - this.margins.bottom;
            },

            endY() {
                return this.margins.top;
            },

            chartWidth() {
                return this.width - this.margins.left - this.margins.right;
            },

            chartHeight() {
                return this.height - this.margins.top - this.margins.bottom;
            },

            xScale() {
                return d3.scaleLinear().domain([0, 10]).range([0, this.chartWidth]);
            },

            yScale() {
                return d3.scaleLinear().domain([0, 10]).range([this.chartHeight, 0])
            }
        },

        methods: {
            getRandomData() {
                var numberOfSeries = 2,
                    numberOfDataPoint = 11,
                    data = [];
                for (var i = 0; i < numberOfSeries; ++i)
                    data.push(d3.range(numberOfDataPoint).map(function (i) {
                        return {x: i, y: Math.round(Math.random() * 9)};
                    }));
                
                return data;
            },

            render() {
                this.svg = d3.select('#target').append('svg')
                    .attr('width', this.width)
                    .attr('height', this.height);

                this.renderAxis();
                this.renderBody();
            },

            renderAxis() {
                this.axisG = this.svg.append('g')
                    .attr('class', 'axis');

                this.renderXAxis();
                this.renderYAxis();
            },

            renderXAxis() {
                var axis = d3.axisBottom().scale(this.xScale);

                this.axisG.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', () => 'translate(' + this.startX + ',' + this.startY + ')')
                    .call(axis);
                
                d3.selectAll('g.x g.tick')
                    .append('line')
                    .classed('grid-line', true)
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 0)
                    .attr('y2', -this.chartHeight)
            },

            renderYAxis() {
                var axis = d3.axisLeft().scale(this.yScale);

                this.axisG.append('g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + this.startX + ', ' + this.endY + ')')
                    .call(axis);
                
                d3.selectAll('g.y g.tick')
                    .append('line')
                    .classed('grid-line', true)
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', this.chartWidth)
                    .attr('y2', 0);
            },

            renderBody() {
                this.bodyG = this.svg.append('g')
                    .attr('class', 'body')
                    .attr('transform', 'translate(' + this.startX + ', ' + this.endY + ')');

                this.renderLine();
                this.renderArea();
                this.renderDot();
            },

            renderLine() {
                var line = d3.line()
                    .x((d) => this.xScale(d.x))
                    .y((d) => this.yScale(d.y));

                this.bodyG.selectAll('path.line')
                    .data(this.data)
                    .enter()
                    .append('path')
                    .style('stroke', (d, i) => this.colors(i))
                    .attr('class', 'line')
                    .attr('d', (d) => line(d));
            },

            renderArea() {
                var area = d3.area()
                    .x((d) => this.xScale(d.x))
                    .y0((d) => 240)
                    .y1((d) => this.yScale(d.y));
                
                this.bodyG.selectAll('path.area')
                    .data(this.data)
                    .enter()
                    .append('path')
                    .style('fill', (d, i) => this.colors(i))
                    .attr('class', 'area')
                    .attr('d', (d) => area(d));
            },

            renderDot() {
                this.data.forEach((data, i) => {
                    this.bodyG.selectAll('circle._' + i)
                        .data(data)
                        .enter()
                        .append('circle')
                        .classed('dot', true)
                        .attr('stroke', () => this.colors(i))
                        .attr('cx', (d) => this.xScale(d.x))
                        .attr('cy', (d) => this.yScale(d.y))
                        .attr('r', 4.5)
                });
            }
        }
    };
</script>

<style>
    .grid-line{
        stroke: #ccc;
        stroke-opacity: .4;
    }

    .axis path, .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .line{
        fill: none;    
        stroke: steelblue;
        stroke-width: 2;
    }

    .dot {
        fill: #fff;
        /* stroke: steelblue; */
    }

    .area{
        fill-opacity: .2;
    }
</style>