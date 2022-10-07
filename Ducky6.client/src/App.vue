<template>
  <header>
    <Navbar />
  </header>
  <main class=" ">
    
    <SideBar  />
    <div :style="{'margin-left' : sidebarWidth}" class="" >

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
*::-webkit-scrollbar {
  width: 13px;
  width: 13px;
}
*::-webkit-scrollbar-track {
  border-radius: 7px;
  background-color: #DFE9EB;
 cursor: pointer;
}

*::-webkit-scrollbar-track:hover {
  background-color: #8ddcf0;
  cursor: pointer;
}

*::-webkit-scrollbar-track:active {
  background-color: #d1eaf0;
}

*::-webkit-scrollbar-thumb {
     box-shadow: rgba(97, 239, 220, 0.613) 5px 5px, rgba(46, 182, 240, 0.515) 10px 10px,
    rgba(46, 182, 240, 0.2) 15px 15px, rgba(46, 156, 240, 0.1) 20px 20px;


  width: 100px;
  border-radius: 10px;
  background-color: #fc8506;
}

</style>
