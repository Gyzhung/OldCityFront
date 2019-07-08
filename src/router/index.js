import Vue from 'vue'
import Router from 'vue-router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import register from '@/components/register'
import login from '@/components/login'
import Home from '@/components/home'
import Index from '@/components/index'
import user from '@/components/user'
import news from '@/components/news'

//課程場次
import createCourse from '@/components/course/create'
import Course from '@/components/course/index'
import Session from '@/components/session/index'
import createSession from '@/components/session/create'

import Branch from '@/components/Branch/Branch'
import Branch_content from '@/components/Branch/content'
import checkSignUp from '@/components/checkSignUp'
import completed from '@/components/admin/completed'



//公告
import addAnnounce from '@/components/addAnnounce'
import searchAnnounce from '@/components/searchAnnounce'
import Announce from '@/components/announce'
import getCourse from '@/components/getCourse'
import editAnnounce from '@/components/editAnnounce'
import getSessionListByc_id from '@/components/getSessionListByc_id'


import getUncheckSignUpListBys_id from '@/components/getUncheckSignUpListBys_id'
import getCheckSignUpListBys_id from '@/components/getCheckSignUpListBys_id'


// use
Vue.use(Router)
Vue.use(mavonEditor)


export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            redirect: Index,
            children: [{
                    path: '/index',
                    name: 'Index',
                    component: Index,
                }, {
                    path: '/register',
                    name: 'register',
                    component: register,
                }, {
                    path: '/login',
                    name: 'login',
                    component: login,
                }, {
                    path: '/Course',
                    name: 'Course',
                    component: Course,
                }, {
                    path: '/createCourse',
                    name: 'createCourse',
                    component: createCourse,
                },
                {
                    path: '/getSessionListByc_id/:c_id',
                    name: 'getSessionListByc_id',
                    component: getSessionListByc_id
                },
                {
                    path: '/getCheckSignUpListBys_id/:s_id',
                    name: 'getCheckSignUpListBys_id',
                    component: getCheckSignUpListBys_id
                },

                {
                    path: '/getUncheckSignUpListBys_id/:s_id',
                    name: 'getUncheckSignUp',
                    component: getUncheckSignUpListBys_id
                }, {
                    path: '/getCourse/:c_id',
                    name: 'getCourse',
                    component: getCourse,
                }, {
                    path: '/news',
                    name: 'news',
                    component: news,
                }, {
                    path: '/addAnnounce',
                    name: 'addAnnounce',
                    component: addAnnounce
                },
                {
                    path: '/searchAnnounce',
                    name: 'searchAnnounce',
                    component: searchAnnounce
                },
                {
                    path: '/editannounce/:announce_id',
                    name: 'editAnnounce',
                    component: editAnnounce
                },
                {
                    path: '/announce/:announce_id',
                    name: 'Announce',
                    component: Announce
                }, {
                    path: '/Session/:c_id',
                    name: 'Session',
                    component: Session,

                }, {
                    path: '/createSession',
                    name: 'createSession',
                    component: createSession,

                },
                {
                    path: '/Branch/:s_id',
                    name: 'Branch',
                    component: Branch
                }, {
                    path: '/Branch_content/:b_id',
                    name: 'Branch_content',
                    component: Branch_content
                }, {
                    path: '/checkSignUp/:b_id',
                    name: 'checkSignUp',
                    component: checkSignUp
                }, {
                    path: '/completed/:b_id',
                    name: 'completed',
                    component: completed
                }


            ]
        }]
        // mode: 'history',
        // routes: [{
        //         path: '/',
        //         name: 'index',
        //         component: index,
        //         children: [{
        //                 path: '/index',
        //                 name: 'index',
        //                 component: index
        //             },
        //             {
        //                 path: '/register',
        //                 name: 'register',
        //                 component: register
        //             },
        //             {
        //                 path: '/login',
        //                 name: 'login',
        //                 component: login
        //             },
        //             {
        //                 path: '/createCourse',
        //                 name: 'createCourse',
        //                 component: createCourse
        //             },
        //             {
        //                 path: '/searchCourse',
        //                 name: 'searchCourse',
        //                 component: searchCourse
        //             },
        //             {
        //                 path: '/user',
        //                 name: 'user',
        //                 component: user
        //             },
        //             {
        //                 path: '/news',
        //                 name: 'news',
        //                 component: news
        //             },

    //         ]

    //         ]

    //     },

    // ]
})