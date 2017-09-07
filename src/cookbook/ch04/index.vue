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

        <p class="clear">
            <h2>使用时间尺度</h2>
            <div class="demo">
                <div id="title"><span>Linear Time Progression <br/></span><span>Mapping [01/01/2013, 12/31/2013] to [0, 1200]</span></div>
                <div id="time" class="clear"></div>
            </div>
        </p>

        <p class="clear">
            <h2>使用有序尺度</h2>
            <div class="demo03">
                <div class="title clear"><span>Ordinal Scale with alphabet</span><span>Mapping [0..9] to ['a'..'j']</span></div>
                <div id="alphabet"></div>

                <div class="title clear"><span>Ordinal Color Scale Category 10</span><span>Mapping [0..9] to category 10 colors</span></div>
                <div id="category10" class="clear"></div>

                <div class="title clear"><span>Ordinal Color Scale Category 20</span><span>Mapping [0..9] to category 20 colors</span></div>
                <div id="category20" class="clear"></div>

                <div class="title clear"><span>Ordinal Color Scale Category 20b</span><span>Mapping [0..9] to category 20b colors</span></div>
                <div id="category20b" class="clear"></div>

                <div class="title clear"><span>Ordinal Color Scale Category 20c</span><span>Mapping [0..9] to category 20c colors</span></div>
                <div id="category20c" class="clear"></div>
            </div>
        </p>

        <p class="clear">
            <h2>字符串插值</h2>
            <div class="demo">
                <div class="clear"><span>Font Interpolation</span></div>
                <div id="font"></div>
            </div>
        </p>

        <p class="clear">
            <h2>颜色插值</h2>
            <div class="demo">
                <div class="clear"><span>Color Interpolation</span></div>
                <div id="color"></div>
            </div>

            <div class="demo">
                <div class="clear"><span>Color Interpolation</span></div>
                <div id="color-diverge"></div>
            </div>
        </p>

        <p class="clear">
            <h2>复合对象插值</h2>
            <div class="demo">
                <div class="clear">Compound Interpolation</div>
                <div id="object"></div>
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
            this.demo02();
            this.demo03();
            this.demo04();
            this.demo05();
            this.demo06();
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
            },

            demo02() {
                const start = new Date(2013, 0, 1);
                const end = new Date(2013, 12, 31);
                const scale = d3.scaleTime().domain([start, end]).rangeRound([0, 1200]);

                function render(data, scale, selector) {
                    d3.select(selector)
                      .selectAll('div.fixed-cell')
                      .data(data)
                      .enter()
                      .append('div')
                      .classed('fixed-cell', true);

                    d3.select(selector)
                      .selectAll('divi.fixed-cell')
                      .data(data)
                      .exit()
                      .remove();

                    d3.select(selector)
                      .selectAll('div.fixed-cell')
                      .data(data)
                      .html(d => {
                          const format = d3.timeFormat("%x");
                          return format(d) + '<br/>' + scale(d) + 'px';
                      });
                }

                const data = (() => {
                    let result = [];
                    for(let i=0; i<12; i++){
                        const date = new Date(start.getTime());
                        date.setMonth(start.getMonth() + i);
                        result.push(date);
                    }
                    return result;
                })();

                render(data, scale, '#time');
            },

            demo03() {
                function render(data, scale, selector) {
                    d3.select(selector)
                      .selectAll('div.cell')
                      .data(data)
                      .enter()
                      .append('div')
                      .classed('cell', true);

                    d3.select(selector)
                      .selectAll('div.cell')
                      .data(data)
                      .exit()
                      .remove();

                    d3.select(selector)
                      .selectAll('div.cell')
                      .data(data)
                      .style('display', 'inline-block')
                      .style('background-color', d => scale(d).indexOf('#') >= 0 ? scale(d) : 'white')
                      .text(d => scale(d));
                }

                const data = d3.range(0, 10);
                const alphabet = d3.scaleOrdinal().domain(data).range(["a", "b", "c","d", "e", "f", "g", "h", "i", "j"]);

                render(data, alphabet, "#alphabet");
                render(data, d3.scaleOrdinal(d3.schemeCategory10), "#category10");
                render(data, d3.scaleOrdinal(d3.schemeCategory20), "#category20");
                render(data, d3.scaleOrdinal(d3.schemeCategory20b), '#category20b');
                render(data, d3.scaleOrdinal(d3.schemeCategory20c), '#category20c');
            },

            demo04() {
                function render(data, scale, selector) {
                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .enter()
                      .append('div')
                      .classed('cell', true)
                      .append('span');

                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .exit()
                      .remove();

                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .style('display', 'inline-block')
                      .select('span')
                      .style('font', d => scale(d))
                      .text((d, i) => i);
                }

                const data = d3.range(0, 10);
                const scale = d3.scaleLinear().domain([0, 10]).range([
                    "italic bold 12px/30px Georgia, serif",
                    "italic bold 120px/180px Georgia, serif"
                ]);
                render(data, scale, '#font');
            },

            demo05() {
                function render(data, scale, selector) {
                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .enter()
                      .append('div')
                      .classed('cell', true)
                      .append('span');

                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .exit()
                      .remove();

                    d3.select(selector).selectAll('div.cell')
                      .data(data)
                      .style('display', 'inline-block')
                      .style('background-color', d => scale(d))
                      .select('span')
                      .text((d, i) => i);
                }

                const data = d3.range(0, 20);
                const colorScale = d3.scaleLinear().domain([0, 20]).range(['white', '#4169e1']);
                const divergingScale = (pivot) => {
                    return d3.scaleLinear().domain([0, pivot, 20]).range(['white', '#4169e1', 'white']);
                };

                const scale = d3.scaleLinear().domain([0, 10]).range([
                    "italic bold 12px/30px Georgia, serif",
                    "italic bold 120px/180px Georgia, serif"
                ]);

                render(data, colorScale, '#color');
                render(data, divergingScale(5), '#color-diverge');
            },

            demo06() {
                function render(data, scale, selector) {
                    d3.select(selector).selectAll('div.v-bar')
                      .data(data)
                      .enter()
                      .append('div')
                      .classed('v-bar', true)
                      .append('span');

                    d3.select(selector).selectAll('div.v-bar')
                      .data(data)
                      .exit()
                      .remove();

                    d3.select(selector).selectAll('div.v-bar')
                      .data(data)
                      .classed('v-bar',true)
                      .style('height', d => scale(d).height)
                      .style('background-color', d => scale(d).color)
                      .select('span')
                      .text((d, i) => i);
                }

                const data = d3.range(0, 20);
                const scale = d3.scalePow().exponent(2)
                    .domain([0, 20])
                    .range([
                        {color: '#add8e6', height: '15px'},
                        {color: '#4169e1', height: '150px'}
                    ]);

                render(data, scale, '#object');
            }
        }
    };
</script>

<style>
    .cell{
        margin: 5px;
        padding: 6px;
        /* width: 24px; */
        /* height: 16px; */
        float: left;
        border: 1px solid #ccc;
    }

    .demo03 .cell{
        width: 48px;
        font-size: 10px;
        color: #000;
    }

    .fixed-cell{
        width: 100px;
        border: 1px solid #ccc;
        float: left;
    }

    .clear > span{
        display: inline-block;
        padding: 8px;
    }

    .clear{
        clear: both;
    }

    .v-bar{
        width: 20px;
        float: left;
        font-size: 10px;
        color: #fff;
        margin-left: 4px;
    }
</style>