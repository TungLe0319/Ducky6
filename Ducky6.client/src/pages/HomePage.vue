<template>
  <div class="px-5 pb-2 my-2 ">
    <div class="row justify-content-center">
      <div class="col-md-2">

        <img src="../assets/img/Logo.svg" alt="" width="200" height="100">
      </div>
      <div class="col-md-12 ">
        <HomePageBanner />
      </div>
      <div class="col-md-4">
      
        <div class="d-md-flex   justify-content-around my-3  rounded box-shadow2">
   
          <button @click="getEventsByType('') " class="btn btn-outline-warning m-1 m-md-0  filter" aria-label="getEventsByType">
            All
          </button>
          <button
            @click="getEventsByType('concert') "
            class="btn btn-outline-warning m-1 m-md-0 filter"
         
            aria-label="getEventsByType"
          
          >
            Concert
          </button>
          <button
            @click="getEventsByType('convention')"
            class="btn btn-outline-warning m-1 m-md-0 filter"
               
                     aria-label="getEventsByType"
          >
            Convention
          </button>
          <button
            @click="getEventsByType('sport')"
            class="btn btn-outline-warning m-1 m-md-0 filter"
                
                     aria-label="getEventsByType"
          >
            Sport
          </button>
          <button
            @click="getEventsByType('digital')"
            class="btn btn-outline-warning m-1 m-md-0 filter"
                  id="filterBtn"
                     aria-label="getEventsByType"
          >
            Digital
          </button>
        </div>
      </div>
    </div>

    <div class="row scrollMe mt-2" >
      <div class="col-md-3 animate__flipInY animate__animated " v-for="e in events" :key="e.id">
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

button:focus{
  color: rgb(31, 28, 28);
  border: 1px solid  #56C7FB;
  background-color: #56C7FB;
border-bottom: 5px solid #56C7FB;
box-shadow: #56c7fbac 0px 5px, rgba(46, 240, 237, 0.3) 0px 10px, rgba(46, 179, 240, 0.2) 0px 15px, rgba(46, 98, 240, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
}
.filter:focus{


}
.scrollMe{
  overflow: auto;
  max-height: 90vh;
}

::-webkit-scrollbar{
  display: none;
}
</style>
