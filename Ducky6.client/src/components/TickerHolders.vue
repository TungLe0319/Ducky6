<template>
  <div class="ticket-holders ">


   <img :src="ticket.profile.picture" alt="" class="forcedImg img-shadow rounded-circle" :title="ticket.profile.name">

  </div>
</template>

<script>
import { Ticket } from '../models/Ticket.js';

export default {
  props: {
    ticket: { type:Ticket, required: true },
  },

  setup(props) {
    return {};
  },
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
  height:75px;
  width:75px;
  object-fit: cover;
  
}
</style>
