<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        Simple Blog
      </router-link>

      <div class="navbar-burger" :class="menuActiveClass"
           @click="menuActiveClass = menuActiveClass? '' : 'is-active'">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="menuActiveClass">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/admin/post/new">
          New Post
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'TheHeader',
  data: () => ({
    menuActiveClass: '',
  }),
}
</script>
