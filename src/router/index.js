import Vue from 'vue'
import Router from 'vue-router'
import NewPostRoute from '../components/NewPostRoute'
import PostRoute from '../components/PostRoute'
import BlogRoute from '../components/BlogRoute'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  routes: [
    {
      path: '/admin/post/new',
      name: 'NewPostRoute',
      component: NewPostRoute,
    },
    {
      path: '/:slug',
      name: 'PostRoute',
      component: PostRoute,
    },
    {
      path: '/',
      name: 'BlogRoute',
      component: BlogRoute,
    },
  ],
})
