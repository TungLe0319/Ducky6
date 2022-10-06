<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: ticket.event.id} }">

    <div class="row justify-content-center ">
    
      <div class="col-md-4 text-end ">
        <img :src="ticket.event.coverImg" alt="" class="forcedImg img-shadow box-shadow2" >
      </div>
      <div class="col-md-6 d-flex flex-column align-items-start ps-5 bg-secondary box-shadow2 img-shadow  ticket">
      <span class="my-3"><h6> Event: {{ticket.event.name}}</h6></span>
      <span class="text-primary lighten-10"><h6> Location: {{ticket.event.location}}</h6></span>
      <span class="text-primary lighten-30"><h6>Start-Date: {{new Date(ticket.event.startDate).toLocaleTimeString()}}}</h6></span>
      <div class="">
      
        <button @click.prevent="removeTicket()" class="btn btn-outline-danger ">Not Going</button>
      </div>
    </div>
      
      <div class="ticketCircle">
      
      </div>
    </div>
  </router-link>
 
</template>

<script>
import { Ticket } from "../models/Ticket.js";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";
import {accountService} from "../services/AccountService.js"
export default {

  props:{
ticket:{type: Ticket, required:true}
  },
  setup(props) {



    return {

async removeTicket(){
  try {
    const yes = await Pop.confirm('Are You Sure You Want To Give Up this Ticket?')
          if (!yes) {
            return
          }
  

    await accountService.removeMyTicket(props.ticket.id)
      Pop.success('Returned Ticket For The Event')
    } catch (error) {
      Pop.error(error,'[removeTicket]')
    }
}

    };
  },
};
</script>

<style lang="scss" scoped>

.forcedImg{
  height: 200px;
  width: auto;
  object-fit: cover;
   clip-path: polygon(5% 0, 100% 0, 100% 15%, 95% 20%, 95% 80%, 100% 85%, 100% 100%, 5% 100%, 5% 85%, 0% 80%, 0% 20%, 5% 15% );
}

.ticketCircle{

 
}
 .circle {
    position: absolute;
  left: 1150px;
  top: 130px;
        height: 200px;
        width: 200px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        background-color: #2a2d3a

      }
.ticket{
   clip-path: polygon(5% 0, 100% 0, 100% 15%, 95% 20%, 95% 80%, 100% 85%, 100% 100%, 5% 100%, 5% 85%, 0% 80%, 0% 20%, 5% 15% );

}
.ticket:hover{
    box-shadow: 0 4px 8px 0 rgb(246, 231, 231), 0 6px 20px 0 rgba(252, 234, 234, 0.969);
}
</style>
