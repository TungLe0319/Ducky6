<template>
  <div class="text-center accountPage text-light container-fluid">
  <div class="row">
<div class="col-md-2 "  >


</div>

  </div>
    <div class="col-md-12" v-for="t in myTickets" :key="t.id">

<TicketCard  :ticket="t" />
    </div>
    
  </div>

</template>

<script>

import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import EventCard from "../components/EventCard.vue";
import TicketCard from "../components/TicketCard.vue";

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
getMyTickets()
})

    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { EventCard, TicketCard },
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
