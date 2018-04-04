<template>
  <div v-if="post">
    <main class="section">
      <blog-post :post="post"/>
    </main>

    <aside class="section" v-if="post.comments.length > 0">
      <h1 class="title is-4">Comments</h1>

      <post-comment v-for="(comment, idx) in post.comments" :key="idx" :comment="comment"/>
    </aside>

    <aside class="columns section">
      <comment-form :post-id="post.id" @new-comment="handleNewComment" class="column is-two-thirds"/>
    </aside>
  </div>
</template>

<script>
import { blogDb } from '@/services/db'
import PostComment from '@/components/PostComment'
import CommentForm from '@/components/CommentForm'
import BlogPost from '@/components/BlogPost'

export default {
  name: 'PostRoute',
  components: { CommentForm, PostComment, BlogPost },
  data: () => ({
    post: null,
  }),
  beforeRouteEnter(to, from, next) {
    blogDb()
      .where('slug', '==', to.params.slug)
      .get()
      .then(result => {
        const post = result.docs[0]

        return blogDb()
          .doc(post.id)
          .collection('comments')
          .orderBy('date')
          .get()
          .then(commentsReS => {
            next(
              vm =>
                (vm.post = {
                  id: post.id,
                  comments: commentsReS.docs.map(res => res.data()),
                  ...post.data(),
                }),
            )
          })
      })
      .catch(next)
  },
  methods:{
    handleNewComment(comment) {
      this.post.comments.push(comment)
    }
  }
}
</script>
