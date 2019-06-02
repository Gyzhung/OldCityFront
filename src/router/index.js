import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import login from '@/components/login'
import Home from '@/components/home'
import createCourse from '@/components/createCourse'
import searchCourse from '@/components/search'
import index from '@/components/index'
import user from '@/components/user'
import news from '@/components/news'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            children: [{
                    path: '/index',
                    name: 'index',
                    component: index
                },
                {
                    path: '/register',
                    name: 'register',
                    component: register
                },
                {
                    path: '/login',
                    name: 'login',
                    component: login
                },
                {
                    path: '/createCourse',
                    name: 'createCourse',
                    component: createCourse
                },
                {
                    path: '/searchCourse',
                    name: 'searchCourse',
                    component: searchCourse
                },
                {
                    path: '/user',
                    name: 'user',
                    component: user
                },
                {
                    path: '/news',
                    name: news,
                    component: news
                }
            ]

        },

    ]
})