// default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Pages
import Home from '@/pages/Home'
import NotFound from '@/pages/404'
import NoteApp from '@/pages/NoteApp'

// Routering
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/note-app',
            name: 'note-app',
            component: NoteApp
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})