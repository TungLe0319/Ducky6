<template>
  <div class="ticket-holders">
<img :src="account.picture" alt="" width="50" height="50">


  </div>
</template>

<script>
import { Account } from "../models/Account.js";

export default {
  props: {
account:{type: Account,required:true}
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
