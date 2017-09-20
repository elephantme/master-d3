<template>
    <div id="target"></div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        name: 'symbol',

        mounted() {
            this.render();
        },

        data() {
            return {
                width: 600,
                height: 600,
                margins: {
                    left: 30,
                    right: 30,
                    top: 30,
                    bottom: 30
                },
                svg: null,
                axisG: null,
                bodyG: null,
                data: this.getRandomData(),
                colors: d3.scaleOrdinal(d3.schemeCategory10),
                symbolTypes: d3.scaleOrdinal() 
                    .range(["symbolCircle",
                        "symbolCross",
                        "symbolSquare",
                        "symbolStar",
                        "symbolTriangle"
                    ])
            };
        },

        computed: {
            xStart() {
                return this.margins.left;
            },

            xEnd() {    
                return this.width - this.margins.right;
            },

            yStart() {
                return this.height - this.margins.bottom;
            },

            yEnd() {
                return this.margins.top;
            },

            clientWidth() {
                return this.width - this.margins.left - this.margins.right;
            },

            clientHeight() {
                return this.height - this.margins.top - this.margins.bottom;
            },

            xScale() {
                return d3.scaleLinear().domain([0, 10]).range([0, this.clientWidth]);
            },

            yScale() {
                return d3.scaleLinear().domain([0, 10]).range([this.clientHeight, 0]);
            }
        },

        methods: {
            getRandomData() {
                var numberOfSeries = 5,
                    numberOfDataPoint = 11,
                    data = [];
                for (var i = 0; i < numberOfSeries; ++i)
                    data.push(d3.range(numberOfDataPoint).map(function (i) {
                        return {x: i, y: Math.round(Math.random() * 9)};
                    }));
                
                return data;
            },

            render() {
                this.svg = d3.select('#target')
                    .append('svg')
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
                    .attr('transform', 'translate(' + this.xStart + ', ' + this.yStart + ')')
                    .call(axis);
                
                this.axisG.selectAll('g.x g.tick')
                    .append('line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 0)
                    .attr('y2', -this.clientHeight)
            },

            renderYAxis() {
                var axis = d3.axisLeft().scale(this.yScale);

                this.axisG.append('g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + this.xStart + ', ' + this.yEnd + ')')
                    .call(axis);
                
                this.axisG.selectAll('g.y g.tick')
                    .append('line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', this.clientWidth)
                    .attr('y2', 0)
            },

            renderBody() {
                this.bodyG = this.svg.append('g')
                    .attr('class', 'body')
                    .attr('transform', 'translate(' + this.xStart + ', ' + this.yEnd + ')');

                this.renderSymbols();
            },

            renderSymbols() {
                this.data.forEach((data, i) => {
                    this.bodyG.selectAll('path._' + i)
                        .data(data)
                        .enter()
                        .append('path')
                        .attr('class', 'symbol _'+i)
                        .attr('fill', () => this.colors(i))
                        .attr('transform', (d) => 'translate(' + this.xScale(d.x) + ', ' + this.yScale(d.y) + ')')
                        .attr('d', d3.symbol().type(d3[this.symbolTypes(i)]))
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