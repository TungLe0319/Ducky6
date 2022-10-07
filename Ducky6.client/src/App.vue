<template>
  <header>
    <Navbar />
  </header>
  <main class=" ">
    
    <SideBar class="sideBar" />
    <div :style="{'margin-left' : sidebarWidth}"  class="" >

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
  background-color: #111927;
 cursor: pointer;
}

*::-webkit-scrollbar-track:hover {
 
  cursor: pointer;
}

*::-webkit-scrollbar-track:active {

}

*::-webkit-scrollbar-thumb {
  
  width: 100px;
  border-radius: 10px;
  background-color: #fc8506;
}


@media screen and (max-width:760px){
  .sidebar{
margin-left: -251px;
  }
}
</style>
