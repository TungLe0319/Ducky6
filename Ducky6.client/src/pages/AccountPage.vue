<template>
  <div class="text-center accountPage text-light container-fluid">
  <div class="row">
<div class="col-md-2 " v-for="c in myEvents" :key="c.id" >
<EventCard   :event="c.event"  />

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

export default {
  setup() {

async function getMyEvents(){
  try {
      await accountService.getMyEvents()
    } catch (error) {
      Pop.error(error,'[getMyEVents]')
    }
}

onMounted(()=>{
getMyEvents()
})

    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myEvents)
    };
  },
  components: {  EventCard },
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
