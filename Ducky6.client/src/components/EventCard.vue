<template>
  <router-link :to="{ name: 'EventPage', params: { id: event.id } }">
    <div
      :class="getRandomBorder()"
      class="event-Card elevation-5 card my-3 mx-2 border-3 border d-flex flex-column justify-content-end"
      :style="{ backgroundImage: `url(${event?.coverImg})` }"
    >
      <div
        :class="event.capacity <= 0 ? 'bg-danger opacity-50' : ''"
        class="p-2 cardBody text-light text-shadow text-wrap d-flex flex-column justify-content-between"
      >
        <span class=""
          ><h5 class="text-primary lighten-30">{{ event.name }}</h5></span
        >
        <span
          ><p class="text-primary lighten-20">{{ event.location }}</p></span
        >
        <span
          ><p class="text-primary lighten-20">
            {{ new Date(event.startDate).toLocaleDateString() }}
          </p></span
        >
        <span class="">
          <p class="text-success">{{ event.capacity }} spots left</p>
        </span>
        <div class="text-end">
          <i
            class="mdi mdi-chip fs-4 text-shadow"
            v-if="event.type == 'digital'"
            title="Digital"
          >
          </i>
          <i
            class="mdi mdi-music fs-4 text-shadow"
            v-else-if="event.type == 'concert'"
            title="Concert"
          >
          </i>
          <i
            class="mdi mdi-account-group fs-4 text-shadow"
            v-else-if="event.type == 'convention'"
            title="Convention"
          >
          </i>
          <i
            class="mdi mdi-football fs-4 text-shadow"
            v-else-if="event.type == 'sport'"
            title="Sport"
          >
          </i>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';

export default {
  props: {
    event: { type: Event, required: true },
  },
  setup(props) {
    const bgs = [
      'border-success',
      'border-danger',
      'border-info',
      'border-warning',
      'border-secondary',
      'border-primary',
    ];

    const date = new Date(props.event.startDate).getDay();

    return {
      getRandomBorder() {
        return bgs[Math.floor(bgs.length * Math.random())];
      },

      date,
      creator: computed(() => AppState.account),
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px #e5e5e5;
  font-weight: 400;
  letter-spacing: 0.08rem;
  /* Second Color  in text-shadow is the blur */
}

.event-Card {
  background-size: cover;
  background-position: center;
  height: 300px;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;

  .eventImg {
    height: 300px;
    width: auto;
    object-fit: cover;
  }
  .cardBody {
    background-color: rgba(0, 0, 0, 0.329);
    backdrop-filter: blur(5px);
    box-shadow: 10px 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.19);
  }
}

.event-Card:hover {
  transition: all 0.5s ease;

  box-shadow: rgba(97, 239, 220, 0.613) 5px 5px,
    rgba(46, 182, 240, 0.515) 10px 10px, rgba(46, 182, 240, 0.2) 15px 15px,
    rgba(46, 156, 240, 0.1) 20px 20px, rgba(46, 82, 240, 0.05) 25px 25px;
}

.soldOut {
  background-color: rgba(237, 61, 61, 0.687);
  backdrop-filter: blur(5px);
  box-shadow: 10px 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
