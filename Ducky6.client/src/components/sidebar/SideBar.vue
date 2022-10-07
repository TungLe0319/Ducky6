<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1 class="text-shadow titleText pointer">
      <span v-if="collapsed" class="titleText">
       
      </span>
      <span class="titleText" v-else></span>
      <span :class="collapsed ? 'visually-hidden' : ''">
        <Login />
      </span>
    </h1>
    <div
      class="links"
      :class="
        collapsed
          ? 'flex-column justify-content-center d-flex align-items-center  '
          : ''
      "
    >
      <SideBarLink to="/" icon="mdi mdi-home fs-2" class="text-shadow" aria-label="Home" title="Home Button"
        >Home</SideBarLink
      >

      <SideBarLink to="/account" icon="mdi mdi-account fs-2" class="text-shadow" aria-label="Account" title="Account"
        >Account</SideBarLink
      >
    </div>

    <div class="text-center">
      <button
      v-if="user.isAuthenticated"
        class="btn p-0 "
        data-bs-toggle="modal"
        data-bs-target="#formModal"
        aria-label="Create An Event"
        
      >
        <i class="mdi mdi-ticket  text-shadow "  :class="collapsed? 'fs-4 flex-column justify-content-center d-flex align-items-center ':'fs-1 '" ></i>
      </button>
      <button
      class="btn selectable text-success p-0 lighten-30 text-uppercase "
      @click="login"
      v-if="!user.isAuthenticated"
    >
      <i class="mdi mdi-ticket  text-shadow "  :class="collapsed? 'fs-4 flex-column justify-content-center d-flex align-items-center ':'fs-1 '" ></i>
    </button>
      <p v-if="!collapsed" class="text-shadow">New Event</p>
    </div>
    <span
      class="collapse-icon"
      @click="toggleSidebar()"
      :class="{ 'rotate-180': collapsed }"
    >
      <i class="mdi mdi-arrow-left-box fs-2 arrowIcon"></i>
    </span>
  </div>
  <div>
<EventForm />


  </div>
</template>

<script>
import { collapsed, sidebarWidth, toggleSidebar } from './state.js';
import SideBarLink from './SideBarLink.vue';
import Login from '../Login.vue';
import Pop from '../../utils/Pop.js';
import { eventsService } from '../../services/EventsService.js';
import EventForm from "../EventForm.vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../../AppState.js";
import { AuthService } from "../../services/AuthService.js";

export default {
  setup() {
    return {
        user: computed(() => AppState.user),
      collapsed,
      toggleSidebar,
      sidebarWidth,

      async createEvent() {
        try {
          await eventsService.createEvent(editable.value);
        } catch (error) {
          Pop.error(error, '[createEvent]');
        }
      },


   async login() {
        AuthService.loginWithRedirect()
      },

    };
  },
  components: { SideBarLink, Login, EventForm },
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
  background-position: center;
  background-size: cover;
  background-image: url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapermaiden.com%2Fimage%2F2018%2F09%2F13%2Flow-poly-triangles-purple-gradient-24356.png&f=1&nofb=1&ipt=84c87811c5cc5448f2977dea2b9b70d93cd91647bb5a58c69fe52cb3cd72fafa&ipo=images);
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
.arrowIcon:hover {
  background-color: var(--sidebar-item-hover);
  border-radius: 4px;
  transition: 0.5s linear;
  cursor: pointer;
}
.arrowIcon {
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

.pointer {
  cursor: pointer;
}
@media screen and (max-width: 960px) {
  .collapse-icon {
    position: relative;
  }

  .sidebar {

    display: none;
  }
  .links {
    transition: 0.75s ease;
  }
}
</style>
