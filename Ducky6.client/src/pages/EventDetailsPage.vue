<template>
  <div class="Event-Details container-fluid" v-if="event">
    <div class="row">
      <div class="col-md-12"  >
        <EventDetails :event="event" :account="account" />
      </div>
      <div class="col-md-12">


      </div>

      <div class="col-md-12">
        <CommentForm />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import EventDetails from '../components/EventDetails.vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

import { commentsService } from '../services/CommentsService.js';

import { ticketsService } from '../services/TicketsService.js';
import CommentForm from '../components/CommentForm.vue';

export default {
  setup() {
    const route = useRoute();

    async function getEventDetailsById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      } catch (error) {
        Pop.error(error, '[getEventDetailsById]');
      }
    }

    async function getCommentsByEventId() {
      try {
        await eventsService.getCommentsByEventId(route.params.eventId);
        console.log(route.params.eventId);
      } catch (error) {
        Pop.error(error, '[getCommentsByEventId]');
      }
    }

    async function getComments() {
      try {
        await commentsService.getComments();
      } catch (error) {
        Pop.error(error, '[getComments]');
      }
    }

    onMounted(() => {
      getEventDetailsById();
      getCommentsByEventId();
      getComments();
    });

    return {
      route,
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),

      async createTicket() {
        try {
          await ticketsService.createTicket();
        } catch (error) {
          Pop.error(error, '[createTicket]');
        }
      },
    };
  },
  components: { EventDetails, CommentForm },
};
</script>

<style lang="scss" scoped>
.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px salmon;
  font-weight: bold;
  letter-spacing: 0.08rem;
  /* Second Color  in text-shadow is the blur */
}
.forcedImg {
  height: 300px;
  width: 300px;
  object-fit: cover;
}
</style>
