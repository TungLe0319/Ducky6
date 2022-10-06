<template>
  <div class="event-details container-fluid animate__fadeIn animate__animated">
    <div
      class="row bg-secondary my-2 flex-wrap detailsBg box-shadow2 justify-content-around"
    >
      <div v-if="event.creator.id == account.id" class="text-end">
        <i
          @click.prevent="removeEvent()"
          class="mdi mdi-cancel fs-1 img-shadow  cancelBtn"
        ></i>
      </div>
      <div class="col-md-3 p-4">
        <img
          :src="event.coverImg"
          alt=""
          class="forcedImg img-shadow rounded"
        />
      </div>

      <div
        class="col-md-8 flex-wrap description mb-3 elevation-5 d-flex flex-column justify-content-around"
      >
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
<!-- -------------------------------------------------- CONDITIONAL RENDER -->
  <div class="d-flex justify-content-between" v-if="event.capacity > 0" >
          <p>{{ event.capacity }} spots left</p>
          <button class="btn btn-warning" @click="createTicket()">
            Attend <i class="mdi mdi-account fs-3"></i>
          </button>
            <button
         
            class="btn btn-danger removeTicket"
            @click="removeTicket()"
          >
            removeTicket
          </button>
        </div>
        <div v-else>
<img src="https://sassypecan.com/wp-content/uploads/2018/12/sold-out.jpg" alt="" width="300" height="300" class="rounded img-shadow">
  <button
         v-if="event.capacity >0"
            class="btn btn-danger removeTicket"
            @click="removeTicket()"
          >
            removeTicket
          </button>
        </div>
       
      
      </div>
      <div class="p-2 d-flex">
        <img
          :src="event.creator.picture"
          alt=""
          class="img-shadow picture rounded-circle"
          :title="event.creator.name"
        />
        <span class="d-flex justify-content-end align-items-end ms-3">  <small>Event Creator</small> </span>
      </div>
    </div>
    <div class="row">
      <span class="text-shadow"><h6>See Whos Attending:</h6></span>
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
      tickets:computed(() => AppState.tickets),
      // hasTicket: computed(() =>
      //   AppState.tickets.find((t) => (t.accountId == AppState.account.id))
      // ),

ticketOwner:computed(()=> AppState.tickets.find(t=> t.profile.id == AppState.account.id)),





      async createTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect();
          }
          if (this.hasTicket) {
            Pop.error('You Already Have One');
            return;
          }
          await ticketsService.createTicket({
            eventId: AppState.activeEvent.id || route.params.id,
          });
          Pop.success('Thank you for Purchasing a Ticket!');
        } catch (error) {
          Pop.error('You Can Only Have One Ticket To An Event.');
        }
      },

async removeTicket(){
try {
  // console.log(this.ticketOwner.id);
const yes = await Pop.confirm()
      if (!yes) {
        return
      }
    await  ticketsService.removeTicket(this.ticketOwner.id)
    Pop.success()
  } catch (error) {
    Pop.error(error,'[remove Ticket]')
  }
},

// async removeTicket(){
//   try {
//     const yes = await Pop.confirm('Are You Sure You Want To Give Up this Ticket?')
//           if (!yes) {
//             return
//           }
  

//     await accountService.removeMyTicket(props.ticket.id)
//       Pop.success('Returned Ticket For The Event')
//     } catch (error) {
//       Pop.error(error,'[removeTicket]')
//     }
// }


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
  components: {},
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

.picture {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border: 10px solid rgba(255, 255, 255, 0.086);
  backdrop-filter: blur(5px);
}

.cancelBtn{
  cursor: pointer;

}

.cancelBtn:hover{
transform: scale(1.14);
color: red;
transition:  0.75s ease;
}

.removeTicket{
  transition: 0.72 ease;
}
</style>
