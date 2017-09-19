import Ch03 from './cookbook/ch03/index.vue';
import Ch04 from './cookbook/ch04/index.vue';
import Ch05 from './cookbook/ch05/index.vue';
import Ch06 from './cookbook/ch06/index.vue';
import Line from './cookbook/ch08/line.vue';

const routes = [
    {
        path: '/ch03',
        component: Ch03
    },
    {
        path: '/ch04',
        component: Ch04
    },
    {
        path: '/ch05',
        component: Ch05
    },
    {
        path: '/ch06',
        component: Ch06
    },
    {
        path: '/ch08/line',
        component: Line
    }
];

export default routes;