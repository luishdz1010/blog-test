<template>
  <article class="blog-post">
    <h1 class="title is-3">
      <router-link v-if="linkTitle" :to="'/' + post.slug">{{post.title}}</router-link>
      <span v-else>{{post.title}}</span>
    </h1>
    <p class="subtitle is-6">
      by {{ post.author }} on {{ dateFormat.format(post.date) }}
    </p>
    <div class="content" v-html="post.body"/>
  </article>
</template>
<script>
export default {
  name: 'BlogPost',
  props: {
    post: { type: Object, required: true },
    linkTitle: { type: Boolean, default: false}
  },
  created() {
    this.dateFormat = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false,
    })
  },
}
</script>
