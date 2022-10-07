<template>
  <div class="Event-Details container-fluid" v-if="event">
    <div class="row justify-content-center">
      
      <div class="col-md-11 animate__lightSpeedInRight animate__animated d-flex ">
        <EventDetails :event="event" :account="account" />
      </div>
      <div class="col-md-10 bg-secondary d-flex flex-wrap box-shadow2" v-if="tickets">
        <TickerHolders v-for="t in tickets" :ticket="t" :key="t.id" />
      </div>

      <div class="col-md-10 my-3">
   
        <CommentForm />
      </div>
      <div class="col-md-8 my-sm-4 bg-secondary box-shadow2 ">
        <CommentCreatorCard :comment="c" v-for="c in comments" class="animate__animated animate__fadeInBottomLeft commentBox"/>
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
import CommentForm from '../components/CommentForm.vue';
import CommentCreatorCard from '../components/CommentCreatorCard.vue';
import TickerHolders from '../components/TickerHolders.vue';

export default {
  setup() {
    const route = useRoute();

    async function getEventDetailsById() {
      try {
        await eventsService.getEventById(route.params.id);
      } catch (error) {
        Pop.error(error, '[getEventDetailsById]');
      }
    }

    async function getCommentsByEventId() {
      try {
        await eventsService.getCommentsByEventId(route.params.id);
        console.log(route.params.eventId);
      } catch (error) {
        Pop.error(error, '[getCommentsByEventId]');
      }
    }

    async function getTicketHoldersByEventId() {
      try {
        await eventsService.getTicketsByEventId(route.params.id);
      } catch (error) {
        Pop.error(error, '[getTicketHoldersByEventId]');
      }
    }

    onMounted(() => {
      getEventDetailsById();
      getCommentsByEventId();
      getTicketHoldersByEventId();
     
    });

    return {
      route,
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),

      tickets: computed(() => AppState.tickets),

  
    };
  },
  components: { EventDetails, CommentForm, CommentCreatorCard, TickerHolders },
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

.commentBox{
  transition: all 1s ease;
}
.animate__animated.animate__lightSpeedInRight{
  --animate-duration:1s
 }
</style>
