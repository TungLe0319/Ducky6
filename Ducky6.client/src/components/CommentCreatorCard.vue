<template>
  <div class="ticket-holders d-flex  p-md-2 my-2 " v-if="comment">
    
<div class="flex-column d-flex justify-content-center">

  <img  :src="comment.creator.picture" :alt="comment.creator.name" width="75" height="75" class="rounded-circle p-1 box-shadow2 pictureHover">
</div>
  <div class=" ms-3 commentBodyBg text-dark card p-2 flex-column d-flex justify-content-center w-100 box-shadow2">
    <p>  <b class="ps-md-3">{{comment.creator.name}} {{}}   </b></p>
    <p class="ps-md-3">{{comment.body}} </p>
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

comment:{required:true}

  },



  setup(props) {



    return {
// Attending : computed()
creator:computed(()=> props.comment.creator.id == AppState.account.id),
async removeComment(){
  try {
    const yes = await Pop.confirm('Delete Your Comment?')
          if (!yes) {
            return
          }
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

.pictureHover{
  transition: all 0.75s ease;
}
.pictureHover:hover{
transform: scale(1.1);
transition: all 0.5s ease-in-out;

}
</style>
