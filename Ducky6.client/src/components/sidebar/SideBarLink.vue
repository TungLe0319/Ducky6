<template>
  <router-link :to="to" class="link  " :class="collapsed? 'py-4 ': 'p-4', { active: isActive} ">
    <i class="icon " :class="icon"></i>
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { collapsed } from './state.js';

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.to);
    return {
      isActive,
      collapsed,
    };
  },
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;
  color: white;
  text-decoration: none;
  transition: all 0.5s linear;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
  transition: all 0.5s ease;
}

.link.active {
  background-color: var(--sidebar-item-active);
  box-shadow: inset 1px 1px 4px rgb(21, 4, 44);
}
</style>
