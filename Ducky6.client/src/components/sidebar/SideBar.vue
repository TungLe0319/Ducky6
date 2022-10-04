<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1 class="text-shadow">
      <span v-if="collapsed">
        <div>V</div>
        <div>S</div>
      </span>
      <span v-else>Vue Sidebar</span>
    </h1>

    <span
      class="collapse-icon"
      @click="toggleSidebar()"
      :class="{ 'rotate-180': collapsed }"
    >
      <i class="mdi mdi-arrow-left fs-2"></i>
    </span>
  </div>
</template>

<script>
import { collapsed, sidebarWidth, toggleSidebar } from './state.js';

export default {
  setup() {
    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
    };
  },
};
</script>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a168;
  --sidebar-item-active: #276749;
}
</style>

<style lang="scss" scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
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
}

.collapse-icon {
  position: absolute;
  bottom: 0;
left: -5px;
  padding: 0.75em;
  color: rgb(236, 224, 224);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}


.text-shadow{
  color: rgb(230, 231, 233);
  text-shadow: 1px 1px black, 0px 0px 5px salmon;
  font-weight: bold;
  letter-spacing: 0.08rem
  
  /* Second Color  in text-shadow is the blur */
}
</style>
