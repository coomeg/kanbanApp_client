<template>
  <ErrorBoundary id="app">
    <router-view/>
  </ErrorBoundary>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 900px;
}
</style>
