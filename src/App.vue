<template>
  <div id="app">
    <TheHeader/>
    <div class="container">
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'

export default {
  name: 'App',
  components: { TheHeader },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
