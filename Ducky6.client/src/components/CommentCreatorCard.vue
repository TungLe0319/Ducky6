<template>
  <div class="ticket-holders d-flex  p-2  ">
    
<div>

  <img  :src="comment.creator.picture" alt="" width="75" height="75" class="rounded-circle p-1">
</div>
  <div class=" ms-3 commentBodyBg text-dark card p-2 flex-column d-flex justify-content-center w-100 box-shadow2">
    <p>  <b class="ps-3">{{comment.creator.name}} {{}}   </b></p>
    <p class="ps-3">{{comment.body}} </p>
  </div>  


<div v-if="creator"><button @click="removeComment()" class="btn"> <i class="mdi mdi-trash-can fs-3 text-light"></i></button></div>

  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { Comment } from "../models/Comment.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {

comment:{type:Comment,required:true}

  },



  setup(props) {



    return {
// Attending : computed()
creator:computed(()=> props.comment.creator.id == AppState.account.id),
async removeComment(){
  try {
      await commentsService.removeComment(props.comment.id)
    } catch (error) {
      Pop.error(error,'[deleteComment]')
    }
}
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

.commentBodyBg{
  background-color: #e2f9ff;
}

</style>
