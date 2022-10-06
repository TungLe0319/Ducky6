<template>
  <div class="ticket-holders d-flex bg-secondary p-2">
    

      <img  :src="comment.creator.picture" alt="" width="50" height="50" class="rounded p-1">
    


<p>{{comment.body}}</p>


  </div>
</template>

<script>
import { Account } from "../models/Account.js";

export default {
  props: {

comment:{type:Object,required:true}
  },

  setup(props) {

    return {

    };
  },
};
</script>

<style lang="scss" scoped>

.text-shadow{
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px salmon;
  font-weight: bold;
  letter-spacing: 0.08rem
  /* Second Color  in text-shadow is the blur */
}
.forcedImg{
  height: 300px;
  width: 300px;
  object-fit: cover;
}


</style>
