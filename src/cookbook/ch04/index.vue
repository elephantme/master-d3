<template>
    <div>
        <p>
            <h2>使用数值尺度</h2>
            <div class="demo">
                <div id="linear" class="clear"><span>n</span></div>
                <div id="linear-capped" class="clear"><span>1 &lt; a*n + b &lt;= 20</span></div>
                <div id="pow" class="clear"><span>n^2</span></div>
                <div id="pow-capped" class="clear"><span>1 &lt; a*n^2 + b &lt;= 20</span></div>
                <div id="log" class="clear"><span>log(n)</span></div>
                <div id="log-capped" class="clear"><span>1 &lt; a*log(n) + b &lt;= 20</span></div>
            </div>
        </p>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    export default {
        name: 'ch04',

        mounted() {
            this.demo01();
        },

        methods: {
            demo01() {
                const linear = d3.scaleLinear().domain([1, 10]).range([1, 10]);
                const linearCapped = d3.scaleLinear().domain([1, 10]).range([1, 20]);

                const pow = d3.scalePow().exponent(2);
                const powCapped = d3.scalePow().exponent(2).domain([1, 10]).rangeRound([1, 10]);

                const log = d3.scaleLog();
                const logCapped = d3.scaleLog().domain([1, 10]).rangeRound([1, 10]);

                function render(data, scale, selector) {
                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .enter()
                      .append('div').classed('cell', true);
                    
                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .exit()
                      .remove();
                    
                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .style('display', 'inline-block')
                      .text(d => d3.format(".2")(scale(d)));
                }

                const data = (function(){
                    let result = [];
                    for(let i=1; i<=10; i++){
                        result.push(i);
                    }
                    return result;
                })();

                render(data, linear, '#linear');
                render(data, linearCapped, '#linear-capped');
                render(data, pow, '#pow');
                render(data, powCapped, '#pow-capped');
                render(data, log, '#log');
                render(data, logCapped, '#log-capped');
            }
        }
    };
</script>

<style>
    .cell{
        margin: 5px;
        padding: 6px;
        width: 24px;
        height: 16px;
        float: left;
        border: 1px solid #ccc;
    }

    .clear > span{
        display: inline-block;
        padding: 8px;
    }

    .clear{
        clear: both;
    }
</style>