<template>
    <div id="target"></div>
</template>

<script>
    import * as d3 from 'd3';
    export default {
        mounted() {
            this.demo01();
        },

        methods: {
            demo01() {
                lineChart().render();

                function lineChart() {
                    var _chart = {};

                    var _width = 600, _height = 300,
                        _margins = {top: 30, left: 30, right: 30, bottom: 30},
                        x = d3.scaleLinear()
                            .domain([0, 10])
                            .range([0, chartWidth()]), 
                        y = d3.scaleLinear()
                            .domain([0, 10])
                            .range([chartHeight(), 0]),
                        _data = getData(),
                        _colors = d3.scaleOrdinal(d3.schemeCategory10),
                        _svg,
                        _bodyG,
                        _line;
                    
                    _chart.render = function() {
                        if (!_svg) {
                            _svg = d3.select('#target').append('svg')
                                .attr('width', _width)
                                .attr('height', _height);
                            
                            renderAxis(_svg);

                            defineBodyClip(_svg);
                        }

                        renderBody(_svg);
                    };

                    function getData() {
                        var numberOfSeries = 2,
                            numberOfDataPoint = 11,
                            data = [];
                        for (var i = 0; i < numberOfSeries; ++i)
                            data.push(d3.range(numberOfDataPoint).map(function (i) {
                                return {x: i, y: Math.round(Math.random() * 9)};
                            }));
                        
                        return data;
                    }

                    function renderAxis(svg) {
                        var axisG = svg.append('g')
                            .attr('class', 'axis');
                        
                        renderXAxis(axisG);

                        renderYAxis(axisG);
                    }

                    function renderXAxis(axisG) {
                        var axis = d3.axisBottom()
                            .scale(x);
                        
                        axisG.append('g')
                            .attr('class', 'x axis')
                            .attr('transform', () => 'translate(' + xStart() + ', ' + yStart() + ')')
                            .call(axis);
                        
                        d3.selectAll('g.x g.tick')
                            .append('line')
                            .classed('grid-line', true)
                            .attr('x1', 0)
                            .attr('y1', 0)
                            .attr('x2', 0)
                            .attr('y2', -chartHeight());
                    }

                    function renderYAxis(axisG) {
                        var axis = d3.axisLeft().scale(y);

                        axisG.append('g')
                            .attr('class', 'y axis')
                            .attr('transform', () => 'translate(' + xStart() +', ' + yEnd() + ')')
                            .call(axis);
                        
                        d3.selectAll('g.y g.tick')
                            .append('line')
                            .classed('grid-line', true)
                            .attr('x1', 0)
                            .attr('y1', 0)
                            .attr('x2', chartWidth())
                            .attr('y2', 0);
                    }

                    function defineBodyClip(svg) {

                    }

                    function renderBody(svg) {
                        if (!_bodyG) {
                            _bodyG = svg.append('g')
                                .attr('class', 'body')
                                .attr('transform', () => 'translate(' + xStart() + ', ' + yEnd() + ')');
                        }

                        renderLines();

                        renderDots();
                    }

                    function renderLines() {
                        _line = d3.line()
                            .x((d) => x(d.x))
                            .y((d) => y(d.y));
                        
                        _bodyG.selectAll('path.line')
                            .data(_data)
                            .enter()
                            .append('path')
                            .style('stroke', (d, i) => _colors(i))
                            .attr('class', 'line');
                        
                        _bodyG.selectAll('path.line')
                            .data(_data)
                            .transition()
                            .attr('d', (d) => _line(d));
                    }

                    function renderDots() {
                        _data.forEach((list, i) => {
                            _bodyG.selectAll('circle._' + i)
                                .data(list)
                                .enter()
                                .append('circle')
                                .attr('class', 'dot')
                                .style('stroke', () => _colors(i))
                                .attr('cx', (d) => x(d.x))
                                .attr('cy', (d) => y(d.y))
                                .attr('r', 4.5);
                        });
                    }

                    function chartWidth() {
                        return _width - _margins.left - _margins.right;
                    }

                    function chartHeight() {
                        return _height - _margins.top - _margins.bottom;
                    }

                    function xStart() {
                        return _margins.left;
                    }

                    function xEnd() {
                        return _width - _margins.right;
                    }

                    function yStart() {
                        return _height - _margins.bottom;
                    }

                    function yEnd() {
                        return _margins.top;
                    }

                    return _chart;
                }
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
</style>