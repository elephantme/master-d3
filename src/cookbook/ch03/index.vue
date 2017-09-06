<template>
    <div>
        <h1>Chapter03 Demo</h1>

        <h2>小试牛刀</h2>
        <div id="demo01"></div>

        <h2>对象字面量绑定为数据</h2>
        <div id="demo02"></div>

        <h2>函数绑定为数据</h2>
        <div id="demo03"></div>

        <h2 class="clear">数据的过滤</h2>
        <div id="demo04"></div>
        <button v-for="item in categories" :key="item" @click="filterItem(item)">{{item}}</button>

        <h2>数据的排序</h2>
        <div id="demo05"></div>
        <button @click="onSort('sortByExpense')">SortByExpense</button>
        <button @click="onSort('sortByCategory')">SortByCategory</button>
        <button @click="onSort('')">clear</button>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'ch03',
    mounted() {
        this.demo01();
        this.demo02();
        this.demo03();
        this.demo04();
        this.demo05();
    },

    data() {
        return {
            categories: ['Retail', 'Gas', 'Dining'],
            categoryData: [
                {expense: 10, category: 'Retail'},
                {expense: 23, category: 'Gas'},
                {expense: 58, category: 'Retail'},
                {expense: 65, category: 'Gas'},
                {expense: 23, category: 'Retail'},
                {expense: 45, category: 'Dining'},
                {expense: 34, category: 'Dining'},
                {expense: 20, category: 'Gas'},
                {expense: 15, category: 'Retail'},
                {expense: 10, category: 'Dining'}
            ]
        };
    },

    methods: {
        demo01() {
            const data = [10, 26, 56, 24];

            // 进入
            d3.select('#demo01')
                .selectAll('div.bars')
                .data(data)
                .enter()
                .append('div')
                .attr('class', 'bars')
                .append('span');

            // 更新
            d3.select('#demo01')
                .selectAll('div.bars')
                .data(data)
                .style('width', d => (d * 3) + 'px')
                .select('span')
                .text(d => d);

            // 退出
            d3.select('#demo01')
                .selectAll('div.bars')
                .data(data)
                .exit()
                .remove();
        },

        demo02() {
            const data = (function() {
                let result = [];
                for(let i=0; i<10; i++){
                    result.push({
                        width: Math.round(Math.random() * 100),
                        color: Math.round(Math.random() * 100)
                    });
                }
                return result;
            })();

            const colorScale = d3.scaleLinear().domain([0, 100]).range(['#add8e6', 'blue']);

            function render(data, el) {
                d3.select(el).selectAll('div.bars')
                  .data(data)
                  .enter()
                  .append('div')
                  .attr('class', 'bars')
                  .append('span');

                d3.select(el)
                  .selectAll('div.bars')
                  .data(data)
                  .style('width', d => d.width * 5 + 'px')
                  .style('background-color', d => colorScale(d.color))
                  .select('span')
                  .text(d => d.width);

                d3.select(el)
                  .selectAll('div.bars')
                  .exit()
                  .remove();
            }

            render(data, '#demo02');
        },

        demo03() {
            let data = [];
            for(let i=0; i<10; i++) {
                data.push(function(x){
                    return 15 + x * x;
                });
            }

            function render(data, el){
                d3.select(el)
                  .selectAll('div.vbars').data(data)
                  .enter()
                  .append('div')
                  .attr('class', 'vbars')
                  .append('span');

                d3.select(el)
                  .selectAll('div.vbars').data(data).exit().remove();

                d3.select(el).selectAll('div.vbars').data(data)
                  .style('height', (d, i) => d(i) + 'px')
                  .select('span')
                  .text((d, i) => d(i));
            }

            render(data, '#demo03');
        },

        demo04(category) {
            const data = this.categoryData;

            function render(data) {
                const el = '#demo04';
                d3.select(el)
                  .selectAll('div.bars')
                  .data(data)
                  .enter()
                  .append('div')
                  .attr('class', 'bars')
                  .append('span');

                d3.select(el)
                  .selectAll('div.bars')
                  .data(data)
                  .attr('class', 'bars')
                  .style('width', d => d.expense * 5 + 'px')
                  .select('span')
                  .text(d => d.category);

                d3.select(el).selectAll('div.bars').exit().remove();

                // 过滤
                d3.select(el)
                  .selectAll('div.bars')
                  .filter(d => d.category == category)
                  .classed('selected', true);
            }

            render(data, category);
        },

        filterItem(category) {
            this.demo04(category);
        },

        demo05(comparator) {
            const data = this.categoryData;

            function render(data) {
                const el = '#demo05';
                d3.select(el)
                  .selectAll('div.bars')
                  .data(data)
                  .enter()
                  .append('div')
                  .attr('class', 'bars')
                  .append('span');

                d3.select(el)
                  .selectAll('div.bars')
                  .data(data)
                  .attr('class', 'bars')
                  .style('width', d => d.expense * 5 + 'px')
                  .select('span')
                  .text(d => d.category);

                d3.select(el).selectAll('div.bars').exit().remove();

                // 排序
                if(comparator) {
                    d3.select(el)
                      .selectAll('div.bars')
                      .sort(comparator);
                }
            }

            render(data);
        },

        onSort(sortType) {
            var mappers = {
                sortByCategory(a, b) {return a.category < b.category ? -1 : 1;},
                sortByExpense(a, b) {return a.expense < b.expense ? -1 : 1}
            };
            this.demo05(mappers[sortType]);
        }
    }
}
</script>

<style>
div.bars {
    border: 1px solid #ccc;
    margin: 2px;
    background: #f79f79;
}

.bars.selected {
    border: 1px solid #f79f79;
    background: #fff;
}

.bars.selected span{
    color: #f79f79;
}

div.bars span {
    color: #fff;
}

.vbars {
    width: 20px;
    float: left;
    background: #f79f79;
    margin: 2px;
    color: #fff;
    font-size: 12px;
}

.clear{
    clear: both;
}
</style>