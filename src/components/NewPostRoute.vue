<template>
  <div class="section">
    <h1 class="title">{{ title || 'New Post' }}</h1>

    <form class="columns" @submit.prevent="addBlogPost()">
      <div class="column">
        <b-field>
          <b-input name="title" placeholder="Post title" v-model="title"
                   autofocus required
                   size="is-medium"/>
        </b-field>

        <b-field>
          <vue-editor v-model="body" placeholder="What's on your mind?" :editorToolbar="toolbar"/>
        </b-field>
      </div>

      <aside class="column is-one-quarter">
        <b-field label="Author">
          <b-input name="author" v-model="author" required/>
        </b-field>

        <b-field label="Publish Date">
          <b-datepicker
            name="date"
            v-model="date"
            placeholder="Click to select..."
            icon="calendar-today" required>
          </b-datepicker>
        </b-field>

        <button type="submit" class="button is-primary is-medium">Publish</button>
      </aside>
    </form>
  </div>
</template>

<script>
import makeSlug from 'slugify'
import { blogDb } from '@/services/db'

export default {
  name: 'NewPostRoute',
  components: {
    VueEditor: () => import('vue2-editor').then(({ VueEditor }) => VueEditor),
  },
  data: () => ({
    title: '',
    body: '',
    author: 'Admin',
    date: new Date(),
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image', 'code-block'],
    ],
  }),
  methods: {
    addBlogPost() {
      const slug = makeSlug(this.title).toLocaleLowerCase()

      blogDb()
        .doc()
        .set({
          title: this.title,
          slug,
          body: this.body,
          author: this.author,
          date: this.date,
        })
        .then(() => {
          this.$toast.open({
            message: `Post <em>${this.title}</em> successfully created`,
            type: 'is-success',
          })
          this.$router.push(`/${slug}`)
        })
        .catch(e => {
          this.$toast.open({
            message: `Something bad happened! Please try again later. Error: <em>${e.message}</em>`,
            type: 'is-danger',
          })
        })
    },
  },
}
</script>
