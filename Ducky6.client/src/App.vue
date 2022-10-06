<template>
  <header>
    <Navbar />
  </header>
  <main>
    <SideBar  />
    <div :style="{'margin-left' : sidebarWidth}" class="p-1" >

      <router-view />
    </div>
  </main>
 
</template>





<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import SideBar from "./components/sidebar/SideBar.vue"
import { sidebarWidth } from "./components/sidebar/state.js"


export default {
  setup() {
    return {
      appState: computed(() => AppState),
      sidebarWidth,
    }
  },
  components: { Navbar, SideBar, }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
