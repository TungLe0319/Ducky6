<template>
  <div class="comment-Box container-fluid">
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="createComment()">
          <div class="form-group d-flex mt-2">
            <textarea
              placeholder="Tell the People"
              v-model="editable.body"
              name="body"
              id="comment"
              cols="140"
              rows="4"
              class="rounded bg-dark text-light"
              required
              aria-required="true"
            ></textarea>

            <button type="submit" class="btn btn-warning">Post Comment</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { Comment } from '../models/Comment.js';
import { commentsService } from '../services/CommentsService.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup(props) {
    const editable = ref({});

    return {
      editable,

      //  async addComment() {
      //   try {
      //     await commentsService.addComment({
      //       eventId: AppState.activeEvent.id || route.params.id,
      //     });
      //     Pop.success('Posted Comment');
      //   } catch (error) {
      //     Pop.error(error, '[addComment]');
      //   }
      // },

      // commentData{
      //   eventId: AppState.activeEvent.id
      //   body: editable.body
      // }

      async createComment() {
        try {
          editable.value.eventId = AppState.activeEvent.id;
          await commentsService.createComment(editable.value);
          editable.value = {} //NOTE form reset
        } catch (error) {
          Pop.error(error, '[addComment]');
        }
      },
    };
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
  height: 300px;
  width: 300px;
  object-fit: cover;
}
</style>
