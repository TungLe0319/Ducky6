<template>
  <div class="event-details container-fluid animate__fadeIn animate__animated">
    <div
      class="row bg-secondary my-2 flex-wrap detailsBg box-shadow2 justify-content-around"
    >
      <div v-if="event.creator.id == account.id" class="text-end">
        <i
          @click.prevent="removeEvent()"
          aria-label="remove Event"
          title="remove Event"
          class="mdi mdi-cancel fs-1 cancelBtn"
        ></i>
      </div>
      <div class="col-md-3">
        <img
          :src="event.coverImg"
          :alt="event.name"
          class="forcedImg img-shadow rounded"
        />
      </div>

      <div
        class="col-md-7 flex-wrap description p-3 mb-3 elevation-5 d-flex flex-column justify-content-around"
      >
        <div class="d-flex justify-content-between text-shadow">
          <p>{{ event.name }}</p>
          <p>{{ new Date(event.startDate).toDateString() }}</p>
        </div>
        <div class="d-flex justify-content-between text-shadow">
          <p class="text-primary">{{ event.location }}</p>
          <p class="text-warning lighten-10">
            {{
              new Date(event.startDate).toLocaleDateString('en-US', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                weekday: 'long',
                minute: '2-digit',
              })
            }}
          </p>
        </div>
        <div class="text-start">
          <p>
            {{ event.description }}
          </p>
        </div>
        <!-- -------------------------------------------------- CONDITIONAL RENDER -->
        <div
          class="d-flex justify-content-between"
          v-if="event.capacity > 0 && !event.isCanceled == true"
        >
          <p class="animate__animated animate__bounceIn">
            <b class="text-warning lighten-10 fs-3"> {{ event.capacity }} </b>
            spots left
          </p>
          <button
            class="btn text-light joinBtn animate__animated animate__bounceIn"
            v-if="!ticketOwner"
            @click="createTicket()"
          >
            Attend
            <img
              src="https://cdn-icons-png.flaticon.com/512/2257/2257282.png"
              width="75"
              height="75"
              alt="Attend"
              title="Attend Event"
              aria-label="Attend Event"
            />
          </button>
          <div v-else>
            <button
              class="btn p-0 px-1 removeTicket animate__animated animate__bounceIn"
              @click="removeTicket()"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2942/2942934.png"
                class="ticketImg"
                alt=""
                width="75"
                height="75"
                aria-label="removeTicket"
                title="Remove Ticket"
              />
            </button>
          </div>
        </div>
        <div class="d-flex justify-content-between" v-else>
          <button
            v-if="ticketOwner"
            class="btn p-0 px-1 removeTicket"
            @click="removeTicket()"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2942/2942934.png"
              class="ticketImg"
              alt=""
              width="75"
              height="75"
              aria-label="removeTicket"
              title="Remove Ticket"
            />
          </button>
          <img
            src="https://sassypecan.com/wp-content/uploads/2018/12/sold-out.jpg"
            alt=""
            width="150"
            height="100"
            class="rounded box-shadow2"
          />
        </div>
      </div>
      <div class="p-2 d-flex">
        <img
          :src="event.creator.picture"
          alt=""
          class="img-shadow picture rounded-circle animate__animated animate__bounceIn"
          :title="event.creator.name"
        />
        <span class="d-flex justify-content-end align-items-end ms-3">
          <small class="text-shadow">Event Creator</small>
        </span>
      </div>
    </div>
    <div class="row my-2">
      <span class="text-shadow"><h6>See Who's Attending</h6></span>
      <div class="col-md-1 bg-primary"></div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';

import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';
import { AuthService } from '../services/AuthService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    event: { type: Object, required: true },
  },
  setup(props) {
    const route = useRoute();
    const editable = ref({});
    const router = useRouter();
    return {
      route,
      editable,
      comments: computed(() => AppState.comments),
      creator: computed(() => AppState.account),
      account: computed(() => AppState.user),
      tickets: computed(() => AppState.tickets),
      // hasTicket: computed(() =>
      //   AppState.tickets.find((t) => (t.accountId == AppState.account.id))
      // ),

      ticketOwner: computed(() =>
        AppState.tickets.find((t) => t.profile.id == AppState.account.id)
      ),

      async createTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect();
          }
          if (this.ticketOwner) {
            Pop.error('You Already Have One');
            return;
          }
          await ticketsService.createTicket({
            eventId: AppState.activeEvent.id || route.params.id,
          });
          Pop.success('Thank you for Joining!');
        } catch (error) {
          Pop.error('You Can Only Have One Ticket To An Event.');
        }
      },

      async removeTicket() {
        try {
          // console.log(this.ticketOwner.id);
          const yes = await Pop.confirm(
            'Are You Sure You Want To Give Up This Ticket?',
            'Theres a chance someone will take this ticket and sell out the event.'
          );
          if (!yes) {
            return;
          }
          await ticketsService.removeTicket(this.ticketOwner.id);
          Pop.success('Ticket Removed');
        } catch (error) {
          Pop.error(error, '[remove Ticket]');
        }
      },

      async removeEvent() {
        try {
          const yes = await Pop.confirm();
          if (!yes) {
            return;
          }
          await eventsService.removeEvent(AppState.activeEvent.id);
          router.push('/');
          Pop.success('Event Cancelled....');
        } catch (error) {
          Pop.error(error, '[removeEvent]');
        }
      },
    };
  },
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
  height: 250px;
  width: 250px;
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

.picture {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border: 5px solid rgba(255, 255, 255, 0.086);
  backdrop-filter: blur(5px);
}

.cancelBtn {
  cursor: pointer;
  transition: all 0.75s ease;
}

.cancelBtn:hover {
  transform: scale(1.14);
  color: red;
  transition: all 0.75s ease;
}

.removeTicket {
  transition: 0.75s ease;
}
.removeTicket:hover {
  transform: scale(1.14);
  transition: all 0.75s ease;
  filter: saturate(120%);
  filter: brightness(120%);
}

.joinBtn {
  transition: all 0.5s ease;
}

.joinBtn:hover {
  transform: scale(1.14);
  filter: brightness(110%);
  transition: all 0.5s ease;
}
</style>
