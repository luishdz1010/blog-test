<template>
  <main class="section">
    <div class="box" v-for="post in posts" :key="post.id">
      <blog-post :post="post" :link-title="true"/>
      <router-link slot="after-content" :to="'/' + post.slug" class="read-more">
        Read more
      </router-link>
    </div>

    <template v-if="finished && posts.length === 0">
      <b-notification type="is-info" has-icon>
        Create a
        <router-link to="/admin/post/new">new blog post</router-link>
        to start.
      </b-notification>
    </template>
  </main>
</template>
<script>
import { blogDb } from '@/services/db'
import BlogPost from '@/components/BlogPost'

export default {
  name: 'BlogRoute',
  components: { BlogPost },
  data: () => ({ posts: [], finished: false }),
  beforeRouteEnter(to, from, next) {
    blogDb()
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        const posts = querySnapshot.docs.map(doc => doc.data())
        next(vm => {
          vm.posts = posts
          vm.finished = true
        })
      })
      .catch(next)
  },
}
</script>

<style lang="scss" scoped>
.blog-post {
  position: relative;
  max-height: 90vh;
  overflow: hidden;

  &::after {
    content: '';
    width: 100%;
    height: 20%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(transparent, white);
  }

  @media (min-width: 1024px) {
    max-height: 33.33vh;
  }
}

.read-more {
  display: block;
  padding-top: 1em;
}
</style>
