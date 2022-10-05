<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-12">
        <HomePageBanner />
      </div>
      <div class="col-md-12">
        <div class="bg-danger p-2 rounded">
          <input
            type="text"
            class="form-control"
            placeholder="Searcher..."
            v-model="editable"
          />
        </div>
        <div class="d-flex justify-content-around my-3">
          <button @click="getEventsByType('')" class="btn btn-outline-warning">
            All
          </button>
          <button
            @click="getEventsByType('concert')"
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

    <div class="row scrollMe">
      <div class="col-md-3" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
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

      async getEventsByType(type) {
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
