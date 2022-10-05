<template>
  <div class="ticket-card row">

<div class="col-md-3">
  <img :src="ticket.event.coverImg" alt="" class="forcedImg">
</div>
<div class="col-md-8 d-flex flex-column align-items-start  bg-secondary">
<span class="my-3"><h6> Event: {{ticket.event.name}}</h6></span>
<span class="text-primary"><h6> Location: {{ticket.event.location}}</h6></span>
<span class="text-warning"><h6>Start-Date: {{new Date(ticket.event.startDate).toLocaleTimeString()}}}</h6></span>
<div>

  <button @click.prevent="removeTicket()" class="btn btn-danger p-2">Not Going</button>
</div>
</div>
  </div>
</template>

<script>
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";

export default {

  props:{
ticket:{type: Object, required:true}
  },
  setup(props) {



    return {

async removeTicket(){
  try {
    const yes = await Pop.confirm()
          if (!yes) {
            return
          }
          debugger
      await ticketsService.removeTicket(props.ticket.id)
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
  height: 300px;
  width: auto;
  object-fit: cover;
}


</style>
