<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-12 ">
        <HomePageBanner />
      </div>
      <div class="col-md-12">
        <div class="bg-secondary p-2 rounded mt-3 box-shadow2">
          <input
            type="text"
            class="form-control"
            placeholder="Search By Name..."
            v-model="editable"
          />
        </div>
        <div class="d-flex justify-content-around my-3 bg-secondary p-2 rounded box-shadow2">
          <button @click="getEventsByType('')" class="btn btn-outline-warning">
            All
          </button>
          <button
            @click="getEventsByType('concert') "
            class="btn btn-outline-warning"
          >
            Concert
          </button>
          <button
            @click="getEventsByType('convention')"
            class="btn btn-outline-warning"
          >
            Convention
          </button>
          <button
            @click="getEventsByType('sport')"
            class="btn btn-outline-warning"
          >
            Sport
          </button>
          <button
            @click="getEventsByType('digital')"
            class="btn btn-outline-warning"
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
      events: computed(() => AppState.events.filter(a => a.name.toUpperCase().includes(editable.value.toUpperCase()))),

      async getEventsByType(type,event) {
        try {
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

<style scoped lang="scss"></style>
