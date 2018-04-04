<template>
  <form v-if="!complete" class="comment-form" @submit.prevent="verified && addComment()">
    <h2 class="subtitle is-5">Add new comment</h2>

    <b-field>
      <b-input name="name" placeholder="Your name" v-model="name" required/>
    </b-field>

    <b-field>
      <vue-editor v-model="comment" placeholder="What's on your mind?" :editorToolbar="toolbar"/>
    </b-field>

    <b-field>
    <vue-recaptcha @verify="onVerify" sitekey="6Ldu11AUAAAAAInuNQv0br9mhyrJN1tqRTIYWCW3" size="normal"/>
    </b-field>

    <button type="submit" :disabled="!verified" class="button is-primary is-medium">Submit</button>
  </form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import { blogDb } from '@/services/db'

export default {
  name: 'CommentForm',
  components: {
    VueRecaptcha,
    VueEditor: () => import('vue2-editor').then(({ VueEditor }) => VueEditor),
  },
  props: {
    postId: { type: String, required: true },
  },
  data: () => ({
    name: '',
    comment: '',
    verified: false,
    complete: false,
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block'],
    ],
  }),
  methods: {
    addComment() {
      const comment = {
        name: this.name,
        comment: this.comment,
        date: new Date(),
      }

      blogDb()
        .doc(this.postId)
        .collection('comments')
        .doc()
        .set(comment)
        .then(() => {
          this.$toast.open({
            message: `Your comment was successfully created`,
            type: 'is-success',
          })
          this.$emit('new-comment', comment)
          this.complete = true
        })
        .catch(e => {
          this.$toast.open({
            message: `Something bad happened! Please try again later. Error: <em>${e.message}</em>`,
            type: 'is-danger',
          })
        })
    },

    onVerify() {
      this.verified = true
    },
  },
}
</script>
