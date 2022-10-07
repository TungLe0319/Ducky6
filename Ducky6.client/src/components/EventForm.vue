<template>
  <!-- Modal -->
  <div
    class="modal"
    id="formModal"
    tabindex="-1"
    aria-labelledby="formModalLa"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark">
        <div class="modal-body FORM animate__flipInY animate__animated">
          <!-- -------------------SECTION FORM----------------------------------- -->
          <form @submit.prevent="createEvent()" class="">
            <div class="row">
              <div class="col-md-6">
                <div class="inputBox mt-2">
                  <input type="text" class="" v-model="editable.name" required aria-required="true"/>
                  <span>Name of Event</span>
                </div>
                <div class="inputBox my-4">
                  <input type="number" class="" v-model="editable.capacity"  required aria-required="true" />
                  
                  <span>Capacity</span>
                </div>

                <div class="inputBox mt-2">
                  <input
                    type="text"
                    placeholder="location"
                    class=""
                    v-model="editable.location"
                    required
                    aria-required="true"
                  />
                  <span>Location</span>
                </div>
                <!-- <div class="inputBox mt-2">
                  <input
                    type="text"
                    placeholder="type"
                    class=""
                    v-model="editable.type"
                  />
                  <span>Type of Event</span>
                </div> -->
                <div class="input-group inputBox mb-3">
  <label class="input-group-text" for="inputGroupSelect01">Type Of Event</label>
  <select class="form-select " id="inputGroupSelect01" required aria-required="true" v-model="editable.type">
    
    <option selected="convention">convention</option>
    <option  value="concert">concert</option>
    <option value="digital">digital</option>
    <option value="sport">sport</option>
  </select>
</div>

              </div>

              <div class="col-md-6">
                <div class="inputBox mt-2">
                  <input
                    type="text"
                    class=""
                    min="9999"
                    v-model="editable.coverImg"
                  />
                  <span>coverImg</span>
                </div>
                <div class="mt-4">
                       <img :src="editable.coverImg" alt="" class="smallerImg">
                </div>
              </div>
              <div class="col-md-6">
              
                <div class="mt-3 inputBox">
                  <input type="datetime-local" required aria-required="true" v-model="editable.startDate" />
                  <span>StartDate</span>
                </div>
              </div>
              
            </div>

            <div class="inputBox2 mt-2">
              <textarea
                class="mt-2"
                rows="5"
                v-model="editable.description"
                aria-label="description"
              ></textarea>
              <span>Description</span>
            </div>

            <div class="my-3">
              <button class="btn selectable text-light img-shadow " type="submit" aria-label="submit" data-bs-dismiss="modal">
                <img src="https://cdn-icons-png.flaticon.com/512/8632/8632120.png" alt="" width="75" height="75">
               Create Event
              </button>
            
            </div>
          </form>
        </div>

        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button > -->
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from "vue-router";
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from "../services/TicketsService.js";
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const editable = ref({});
   const router = useRouter()
    return {
      editable,

      account: computed(() => AppState.account),

      async createEvent() {
        try {
          await eventsService.createEvent(editable.value);
       
          Pop.success('Event Approved');
        } catch (error) {
          Pop.error('[creatorEvent]');
        }
      },
    };
  },
};
</script>

<style scoped>
.forcedImg {
  border-radius: 4px;
  border: dashed 4px rgb(146, 197, 245);
}
.checkbox {
  width: 30px;
  height: 30px;
}

.smallerImg {
  height: 200px;
  width: 375px;
  object-fit: cover;
    border: dashed 4px rgb(146, 197, 245);
      border-radius: 4px;
}

.form-Banner {
  background-image: url(https://i.pinimg.com/564x/ca/db/46/cadb46a6ac190342d8152d4240952333.jpg);
  background-position: center;
  background-size: cover;
}

.Img1 {
  transition: all 0.5s ease;
}
.Img1:hover {
  transform: scale(1.01);
  transition: all 0.4s ease;
  filter: brightness(110%);
}

.checkBoxInput input {
  color: #27132a;
  background-color: #27132a;
  padding: 0 10px;
  font-size: 0.65em;

  border: 1px solid #92c5f5;

  letter-spacing: 0.2em;
  transition: all 1s ease;
}
.inputBox {
  position: relative;
  width: 250px;
}
/* ------------------------------------------------------------------------------------ */
.inputBox2 {
  position: relative;
  width: auto;
}

.inputBox2 textarea {
  width: 100%;

  padding: 10px;
  border: 1px solid #92c5f5;
  border-bottom: 3px solid #c4def7;
  border-radius: 5px;
  outline: none;
  color: #fff;
  font-size: 1em;
  background-color: rgba(0, 0, 0, 0.278);
  transition: all 1.5s ease;
  box-shadow: 0.25px 0.25px 10px rgba(243, 236, 236, 0.308);
}
.inputBox2 span {
  position: absolute;
  left: 0;
  bottom: 4.2em;
  padding: 10px;
  pointer-events: none;
  font-size: 1em;
  text-transform: uppercase;
  color: #f1ecf1eb;
  transition: all 1s ease;
}
.inputBox2 textarea:valid ~ span,
.inputBox2 textarea:focus ~ span {
  color: #27132a;
  transform: translateX(10px) translateY(-70px);
  padding: 0 10px;
  font-size: 1em;
  border-radius: 4px;
  font-weight: bold;
  background: #92c5f5;
  border-left: 1px solid #92c5f5;
  border-right: 1px solid #92c5f5;
  letter-spacing: 0.2em;
  transition: all 1s ease;
}

/* ---------------------------------------------------------------------------- */
.inputBox input {
  width: 100%;
  padding: 10px;
  border: 1px solid #92c5f5;
  border-bottom: 3px solid #c4def7;
  border-radius: 5px;
  outline: none;
  color: #fff;
  font-size: 1em;
  background-color: rgba(0, 0, 0, 0.278);
  transition: all 1.5s ease;
  box-shadow: 0.25px 0.25px 10px rgba(243, 236, 236, 0.308);
}
.inputBox ::placeholder {
  color: #ffffff;
  font-weight: bold;
}
.inputBox span {
  position: absolute;
  left: 0;
  bottom: 2.25em;
  padding: 10px;
  pointer-events: none;
  font-size: 1em;
  text-transform: uppercase;
  color: #f1ecf1dd;
  transition: all 1s ease;
}
.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
  color: #27132a;
  transform: translateX(10px) translateY(-7px);
  padding: 0 10px;
  font-size: 0.65em;
  border-radius: 4px;
  font-weight: bold;
  background: #92c5f5;
  border-left: 1px solid #92c5f5;
  border-right: 1px solid #92c5f5;
  letter-spacing: 0.2em;
  transition: all 1s ease;
}

/* .inputBox:nth-child(2) input:valid ~ span,
.inputBox:nth-child(2) input:focus ~ span {
  background: #92c5f5;
  color: #27132a;
  border-radius: 2px;
} */
.modal-body {
  background-image: url(https://wallpapercave.com/wp/wp7196471.jpg);
  background-size: cover;
  background-position: center;
  box-shadow: 1px 1px 10px rgba(243, 236, 236, 0.308);
}
</style>
