<template>
  <div class="event-details container-fluid">
    <div
      class="row bg-secondary my-2 flex-wrap detailsBg justify-content-around"
    >
      <div class="text-end"><i class="mdi mdi-more"></i></div>
      <div class="col-md-3 p-4">
        <img
          :src="event.coverImg"
          alt=""
          class="forcedImg img-shadow rounded"
        />
      </div>

      <div class="col-md-8 flex-wrap description mb-3 elevation-5">
        <div class="d-flex justify-content-between text-shadow">
          <p>{{ event.name }}</p>
          <p>{{ new Date(event.startDate).toDateString() }}</p>
        </div>
        <div class="d-flex justify-content-between text-shadow">
          <p class="text-primary">{{ event.location }}</p>
          <p class="text-warning">
            {{ new Date(event.startDate).toLocaleTimeString() }}
          </p>
        </div>
        <div class="text-start">
          <p>
            {{ event.description }}
          </p>
        </div>

        <div class="d-flex justify-content-between">
          <p>{{ event.capacity }} spots left</p>
          <button class="btn btn-warning">
            Attend <i class="mdi mdi-account fs-2"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <span class="text-shadow"><h6>See Whos Attending:</h6></span>
      <div class="col-md-1 bg-primary" >
      
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

import TicketHolders from './TicketHolders.vue';

export default {
  props: {
    event: { type: Event, required: true },
  },
  setup() {
    return {
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
    };
  },
  components: {  TicketHolders },
};
</script>

<style lang="scss" scoped>
.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgba(207, 207, 207, 0.361);
  font-weight: bold;
  letter-spacing: 0.08rem;
  /* Second Color  in text-shadow is the blur */
}
.forcedImg {
  height: 300px;
  width: 300px;
  object-fit: cover;
  border: 10px solid rgba(255, 255, 255, 0.086);
  backdrop-filter: blur(5px);
}

.description {
  background-color: rgba(0, 0, 0, 0.175);
  backdrop-filter: blur(5px);
  border-radius: 4px;
}

.detailsBg {
  background-image: url(https://wallpapercave.com/wp/wp7196474.jpg);
  background-position: center;
  background-size: cover;
}
</style>
