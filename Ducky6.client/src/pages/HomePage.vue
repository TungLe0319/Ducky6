<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-12">
<HomePageBanner />

      </div>
      <div class="col-md-12">TYPE FILTER BAR HERE</div>
    </div>

<div class="row scrollMe">
<div class="col-md-3" v-for="e in events" :key="e">
<EventCard  :event="e"  />
</div>

</div>

  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import EventCard from "../components/EventCard.vue";
import HomePageBanner from "../components/HomePageBanner.vue";

export default {
    setup() {
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error, "[Get Events]");
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
            events: computed(() => AppState.events),
        };
    },
    components: { EventCard, HomePageBanner }
};
</script>

<style scoped lang="scss">




</style>
