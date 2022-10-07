<template>
  <div class="text-center accountPage text-light container-fluid">
    <div class="container">
         <div class="col-md-5 text-start my-4">
        <h4 class="text-success lighten-20">Events I'm Hosting</h4>
      </div>
      <div class="row horizontal-scrollable">
        
        <div
          class="col-md-3 animate__flipInY animate__animated p-4"
          v-for="e in events"
        >
          <EventCard :event="e" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-5 text-start my-4">
        <h4 class="text-success lighten-20">Upcoming Events</h4>
      </div>
      <div
        class="col-md-8 my-3 animate__animated animate__lightSpeedInRight"
        v-for="t in myTickets"
      >
        <TicketCard :ticket="t" />
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
      events: computed(() =>
        AppState.myEvents.filter((e) => e.creator.id == AppState.account.id)
      ),
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

  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
}
.animate__animated.animate__lightSpeedInRight {
  --animate-duration: 1s;
}
*::-webkit-scrollbar {
  width: 13px;
  width: 13px;
}
*::-webkit-scrollbar-track {
  border-radius: 7px;
  background-color: #111927;
  cursor: pointer;
}

*::-webkit-scrollbar-track:hover {
  cursor: pointer;
}

*::-webkit-scrollbar-track:active {
}

*::-webkit-scrollbar-thumb {
  width: 100px;
  border-radius: 10px;
  background-color: #9dffe5;
}
</style>
