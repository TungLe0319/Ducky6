<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <button data-bs-toggle="modal" data-bs-target="#formModal" class="btn btn-primary">EDIT ACCOUNT</button>
  </div>
  <AccountForm />
</template>

<script>
import AccountForm from '../components/AccountForm.vue';
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
    };
  },
  components: { AccountForm },
};
</script>
ß
<style scoped>
img {
  max-width: 100px;
}
</style>
