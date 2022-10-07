<template>
  <div class="text-center accountPage text-light container-fluid">
    <div class="row my-2">
      <div class="col-md-12 text-start">
        <img
          src="../assets/img/Logo.svg"
          alt=""
          class="box-shadow rounded"
          width="400"
          height="50"
        />
      </div>
    </div>
    <div class="container">
      <div class="row horizontal-scrollable ">
       
        <div
          class="col-md-3 animate__flipInY animate__animated"
          v-for="e in events"
        >
          <EventCard :event="e" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
       <div class="col-md-5 text-start my-4">
          <h4 class="text-success  lighten-20"> Upcoming Events</h4>
        </div>
      <div class="col-md-8 my-3  animate__animated animate__lightSpeedInRight " v-for="t in myTickets">
        <TicketCard class="" :ticket="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import EventCard from '../components/EventCard.vue';
import TicketCard from '../components/TicketCard.vue';
import { eventsService } from '../services/EventsService.js';

export default {
  setup() {
    async function getMyTickets() {
      try {
        await accountService.getMyTickets();
      } catch (error) {
        Pop.error(error, '[getMyTickets]');
      }
    }

    async function getMyEvents() {
      try {
        await eventsService.getEventsForAccount();
      } catch (error) {
        Pop.error(error, '[getMyEvents]');
      }
    }

    onMounted(() => {
      getMyTickets();
      getMyEvents();
    });

    return {
      events: computed(() => AppState.myEvents),
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
    };
  },
  components: { EventCard, TicketCard },
};
</script>
ß
<style scoped>
.forcedImg {
  height: 200px;
  width: 200px;
}

.horizontal-scrollable {
  border-radius: 4px;
  box-shadow: rgb(17, 18, 20) 3px 3px 6px 0px inset, rgba(8, 8, 8, 0.5) -3px -3px 6px 1px inset;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;

}
 .animate__animated.animate__lightSpeedInRight{
  --animate-duration:1s
 }
*::-webkit-scrollbar {
  width: 13px;
  width: 13px;
}
*::-webkit-scrollbar-track {
  border-radius: 7px;
  background-color: #DFE9EB;
 cursor: pointer;
}

*::-webkit-scrollbar-track:hover {
  background-color: #8ddcf0;
  cursor: pointer;
}

*::-webkit-scrollbar-track:active {
  background-color: #d1eaf0;
}

*::-webkit-scrollbar-thumb {
     box-shadow: rgba(97, 239, 220, 0.613) 5px 5px, rgba(46, 182, 240, 0.515) 10px 10px,
    rgba(46, 182, 240, 0.2) 15px 15px, rgba(46, 156, 240, 0.1) 20px 20px;


  width: 100px;
  border-radius: 10px;
  background-color: #9dffe5;
}

*::-webkit-scrollbar-thumb:hover {

}

*::-webkit-scrollbar-thumb:active {

}

</style>
