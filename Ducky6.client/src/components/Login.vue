<template>
  <span class="navbar-text">
    <button
      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="dropdown my-2 my-lg-0 d-flex " v-else>
     
        <div v-if="account.picture || user.picture" class="">
          <img
            :src="account.picture || user.picture"
            alt="account photo"
            height="75"
            class="rounded-circle img-shadow"
          />
         
         <div class="list-group-item list-group-item-action hoverable d-flex justify-content-start my-3 text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
         <small> logout</small>
        </div>
      </div>
      <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>
       
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

</style>
