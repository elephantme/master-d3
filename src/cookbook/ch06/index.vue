<template>
    <div>
        <div class="demo">
            <h2>单元素动画</h2>
            <div id="simple"></div>
        </div>

        <div class="demo">
            <h2>多元素动画</h2>
            <div id="multiple"></div>
        </div>

        <div class="demo">
            <h2>使用缓动函数</h2>
            <div id="animation"></div>
        </div>
    </div>
</template>    

<script>
    import * as d3 from 'd3';
    export default {
        name: 'ch06',

        mounted() {
            this.demo01();
            this.demo02();
            this.demo03();
        },

        methods: {
            demo01() {
                d3.select('#simple')
                  .append('div')
                  .classed('boxed', true)
                  .style('background-color', '#e9967a')
                  .transition()
                  .duration(500)
                  .style('background-color', '#add8e6')
                  .style('margin-left', '600px')
                  .style('width', '100px')
                  .style('height', '100px');
            },

            demo02() {
                const chartHeight = 100;
                const data = (function(){
                    let result = [];
                    for(let i=0; i<20; i++){
                        result.push({
                            id: i,
                            value: Math.round(Math.random() * chartHeight)
                        });
                    }
                    return result;
                })();

                function barLeft(i) {
                    return i * (30 + 2);
                }

                function barHeight(d) {
                    return d.value;
                }

                function render(data, selector) {
                    d3.select(selector)
                        .selectAll('div.v-bar')
                        .data(data, d => d.id)
                        .enter()
                        .append('div')
                        .attr('class', 'v-bar')
                        .style('position', 'absolute')
                        .style('top', chartHeight + 'px')
                        .style('left', (d, i) => {
                            return barLeft(i) + 'px';
                        })
                        .style('height', '0px')
                        .append('span');
                    
                    d3.select(selector)
                        .selectAll('div.v-bar')
                        .data(data, d => d.id)
                        .transition().duration(500)
                        .style('top', d => chartHeight - barHeight(d) + 'px')
                        .style('left', (d, i) => barLeft(i) + 'px')
                        .style('height', d => barHeight(d) + 'px')
                        .select('span')
                        .text(d => d.value);
                    
                    d3.select(selector)
                        .selectAll('div.v-bar')
                        .data(data, d => d.id)
                        .exit()
                        .remove();
                }

                render(data, '#multiple');
            },

            demo03() {
                var data = [
                    'easeLinear', 
                    'easeCubic', 
                    'easeCubicInOut', 
                    'easeSin',
                    'easeSinOut', 
                    'easeExp', 
                    'easeCircle', 
                    'easeBack',
                    'easeBounce'
                ];

                var colors = d3.scaleOrdinal(d3.schemeCategory10);

                function render(data, selector){
                    d3.select(selector).selectAll('div')
                      .data(data)
                      .enter()
                      .append('div')
                      .attr('class', 'fixed-cell')
                      .style('top', (d, i) => {
                          return i * 40 + 'px';
                      })
                      .style('background-color', (d, i) => {
                          return colors(i);
                      })
                      .style('color', 'white')
                      .style('left', '500px')
                      .text(d => {
                          
                          return d;
                      });

                    d3.select(selector).selectAll('div')
                      .each(function(d) {
                        d3.select(this)
                            .transition().ease(d3[d])
                            .duration(1500)
                            .style('left', '10px');
                      });
                }

                render(data, '#animation');
            }
        }
    };
</script>

<style>
    .boxed{
        width: 150px;
        height: 150px;
    }

    #multiple{
        height: 150px;
        position: relative;
    }

    .v-bar{
        width: 20px;
        background-color: #9f9f9f;
        color: #fff;
        font-size: 10px;
    }

    #animation{
        position: relative;
    }

    .fixed-cell{
        position: absolute;
        width: 80px;
        height: 30px;
        margin-bottom: 5px;
        font-size: 12px;
    }
</style>