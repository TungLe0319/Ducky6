<template>
  <div class="text-center accountPage text-light container-fluid">
    <div class="row my-2">
      <div class="col-md-12 text-start">
        <img src="../assets/img/Logo.svg" alt="" class="img-shadow p-2 rounded " width="400" height="50">
      </div>
    </div>
  <div class="row">
<div class="col-md-2  "  >


</div>

  </div>
    <div class="row justify-content-center" >

<div class="col-md-8 my-3 "  v-for="t in myTickets">
  <TicketCard class="" :ticket="t" />

</div>


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
import { eventsService } from "../services/EventsService.js";

export default {
  setup() {

async function getMyTickets(){
  try {
      await accountService.getMyTickets()
    } catch (error) {
      Pop.error(error,'[getMyTickets]')
    }
}


async function getMyEvents(){
  try {
      await eventsService.getEventsForAccount()
    } catch (error) {
      Pop.error(error,'[getMyEvents]')
    }
}

onMounted(()=>{
getMyTickets()
getMyEvents()
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
.forcedImg{
  height: 200px;
  width: 200px;

}




</style>
