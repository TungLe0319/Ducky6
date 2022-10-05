<template>
  <div class="comments-box">
<div>
  <CommentForm  :comment="comments" />
</div>
    



  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import CommentForm from "./CommentForm.vue";
export default {
    props: {
 
    },
    setup(props) {
        return {
          comments : computed(() => AppState.comments)
        };
    },
    components: { CommentForm }
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
