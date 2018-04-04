<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="avatar">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong>{{comment.name}}</strong>
        <div v-html="comment.comment"/>
        <br>
        <small>{{ dateFormat.format(comment.date) }}</small>
      </div>
    </div>
  </article>
</template>

<script>

export default {
  name: 'AppComment',
  props: {
    comment: { type: Object, required: true },
  },
  computed: {
    avatar() {
      return `https://api.adorable.io/avatars/128/${this.comment.name}`
    },
  },
  created() {
    this.dateFormat = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  },
}
</script>
