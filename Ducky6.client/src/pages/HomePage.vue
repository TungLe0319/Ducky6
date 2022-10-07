<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-12 ">
        <HomePageBanner />
      </div>
      <div class="col-md-12">
      
        <div class="d-flex justify-content-around my-3 bg-secondary p-2 rounded box-shadow2">
   
          <button @click="getEventsByType('') " class="btn btn-outline-warning  filter" aria-label="getEventsByType">
            All
          </button>
          <button
            @click="getEventsByType('concert') "
            class="btn btn-outline-warning filter"
            id="filterBtn"
            aria-label="getEventsByType"
          >
            Concert
          </button>
          <button
            @click="getEventsByType('convention')"
            class="btn btn-outline-warning filter"
                  id="filterBtn"
                     aria-label="getEventsByType"
          >
            Convention
          </button>
          <button
            @click="getEventsByType('sport')"
            class="btn btn-outline-warning"
                  id="filterBtn"
                     aria-label="getEventsByType"
          >
            Sport
          </button>
          <button
            @click="getEventsByType('digital')"
            class="btn btn-outline-warning"
                  id="filterBtn"
                     aria-label="getEventsByType"
          >
            Digital
          </button>
        </div>
      </div>
    </div>

    <div class="row scrollMe" >
      <div class="col-md-3 animate__flipInY animate__animated" v-for="e in events" :key="e.id">
        <EventCard :event="e" class="" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import EventCard from '../components/EventCard.vue';
import HomePageBanner from '../components/HomePageBanner.vue';

export default {
  setup() {
    const editable = ref('');

    async function getEvents() {
      try {
        await eventsService.getEvents();
      } catch (error) {
        Pop.error(error, '[Get Events]');
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      editable,
      // events: computed(() => AppState.events.filter(a => a.name.toUpperCase().includes(editable.value.toUpperCase()))),
events : computed(() => AppState.events),
      async getEventsByType(type) {
        try {
         
          // document.getElementById(event.target.id).classList.toggle('active')
          await eventsService.getEvents(type);
       
        } catch (error) {
          Pop.error(error, '[GetEventsByType]');
        }
      },
    };
  },
  components: { EventCard, HomePageBanner },
};
</script>



<style scoped lang="scss">
button:active{
  background-color: red;
}


.filter:focus{

  background-color: red;
}

</style>
