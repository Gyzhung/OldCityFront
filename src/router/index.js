import Vue from 'vue'
import Router from 'vue-router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import register from '@/components/register'
import login from '@/components/login'
import Home from '@/components/home'
import Index from '@/components/index'
import createCourse from '@/components/createCourse'
import searchCourse from '@/components/search'
import user from '@/components/user'
import news from '@/components/news'
import addAnnounce from '@/components/addAnnounce'
import searchAnnounce from '@/components/searchAnnounce'
import Announce from '@/components/announce'
import editAnnounce from '@/components/editAnnounce'
// use
Vue.use(Router)
Vue.use(mavonEditor)


export default new Router({
    mode: 'history',

  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect:Index,
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
      path: '/searchCourse',
      name: 'searchCourse',
      component: searchCourse,
    }, {
      path: '/news',
      name: 'news',
      component: news,
    },{
      path: '/announce',
      name: 'Announce',
      component: Announce,
    },  {
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
      path: '/announce/:announce_id',
      name: 'Announce',
      component: Announce
  }, ]
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
            
  //             {
  //                 path: '/editannounce/:announce_id',
  //                 name: 'editAnnounce',
  //                 component: editAnnounce
  //             }
  //         ]

    //         ]

    //     },

    // ]
})