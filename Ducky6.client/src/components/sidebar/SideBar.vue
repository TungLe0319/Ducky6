<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1 class="text-shadow titleText pointer">
      <span v-if="collapsed" class="titleText">
        <div><img src="https://cdn-icons-png.flaticon.com/800/7207/7207387.png" alt="" width="30" height="30" class="rounded"></div>
      
      </span>
      <span class="titleText" v-else>Vue Sidebar</span>
    </h1>
    <div
      class="links"
      :class="
        collapsed
          ? 'flex-column justify-content-center d-flex align-items-center  '
          : ''
      "
    >
      <SideBarLink to="/" icon="mdi mdi-home fs-2" class="text-shadow">Home</SideBarLink>
      
      <SideBarLink to="/account" icon="mdi mdi-account fs-2" class="text-shadow"
        >Account</SideBarLink
      >
    </div>
    <span
      class="collapse-icon"
      @click="toggleSidebar()"
      :class="{ 'rotate-180': collapsed }"
    >
      <i class="mdi mdi-arrow-left-box fs-2 arrowIcon"></i>
    </span>
  </div>
</template>

<script>
import { collapsed, sidebarWidth, toggleSidebar } from './state.js';
import SideBarLink from './SideBarLink.vue';

export default {
  setup() {
    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
    };
  },
  components: { SideBarLink },
};
</script>

<style>
:root {
  --sidebar-bg-color: #5b2f85;
  --sidebar-item-hover: #8738a1;
  --sidebar-item-active: #b682d99d;


 
}

</style>

<style lang="scss" scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
transition: all 1.5s ease;

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  bottom: 0;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  transition: 0.75s ease;
  box-shadow: 0.25px 5px 10px rgb(0, 0, 0);
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  left: -5px;
  padding: 0.75em;
  color: rgb(236, 224, 224);
  transition: 0.5s linear;
}
.arrowIcon:hover{
  background-color: var(--sidebar-item-hover);
  border-radius: 4px;
  transition: 0.5s linear;
  cursor: pointer;
  
}
.arrowIcon{

  transition: 0.5s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.5s linear;
}

.text-shadow {
  color: rgb(230, 231, 233);
  text-shadow: 1px 1px black, 0px 0px 5px rgb(114, 227, 250);
  font-weight: bold;
  letter-spacing: 0.08rem;

  /* Second Color  in text-shadow is the blur */
}

.titleText {
  transition: 2s ease;
}

.pointer{
  cursor:pointer;
}
@media screen and (max-width: 860px) {
  .collapse-icon {
    position: relative;
  }

  .links {
    transition: 3.4s ease;
  }
}
</style>
