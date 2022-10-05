<template>
  <div class="text-center accountPage text-light container-fluid">
  <div class="row">
<div class="col-md-12">
My Events!

</div>

  </div>
    <button data-bs-toggle="modal" data-bs-target="#formModal" class="btn btn-primary button-50">EDIT ACCOUNT</button>
    
  </div>
  <AccountForm />
</template>

<script>
import AccountForm from '../components/AccountForm.vue';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";

export default {
  setup() {

async function getMyTickets(){
  try {
      await accountService.getMyTickets()
    } catch (error) {
      Pop.error(error,'[getMyEVents]')
    }
}

onMounted(()=>{

})

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

.accountPage{


}


</style>
