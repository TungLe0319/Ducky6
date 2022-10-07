<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 d-md-none">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center ms-5">
        <img alt="logo" src="../assets/img/Logo.svg" height="35" />
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable text-uppercase">
            Account
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.navbar{
    background-position: center;
  background-size: cover;
 background-image: url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapermaiden.com%2Fimage%2F2018%2F09%2F13%2Flow-poly-triangles-purple-gradient-24356.png&f=1&nofb=1&ipt=84c87811c5cc5448f2977dea2b9b70d93cd91647bb5a58c69fe52cb3cd72fafa&ipo=images);
transition: all 1.5s ease;

}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  
}
</style>
