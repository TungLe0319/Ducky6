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
        <div class="modal-body FORM">
          <!-- -------------------SECTION FORM----------------------------------- -->
          <form @submit.prevent="handleSubmit" class="">
            <div class="row">
              <div class="col-md-6">
                <div class="inputBox mt-2">
                  <input
                    type="text"
                  
                
                    class=""
                  />
                  <span>ProfileName</span>
                </div>
                <div class="inputBox my-4">
                  <input
                    type="text"
           
                 
                    class=""
                  />
                  <span>email</span>
                </div>

                <div class="inputBox mt-2">
                  <input
                    type="url"
               
                    placeholder="url..."
                    class=""
                  />
                  <span>profile picture</span>
                </div>
              </div>

              <div class="col-md-6 justify-content-center d-flex">
                <img
                  src="account.picture"
                  alt=""
                  class="img-fluid w-50 forcedImg Img1"
                />
              </div>

              <div class="col-md-6">
                <div class="form-group d-flex align-items-center">
                  <label class="form-check-label mt-2 me-3" for="graduated">
                    <vs-tooltip
                      text="Graduated"
                      position="bottom"
                      color="primary"
                    >
                      <i class="mdi mdi-school fs-2"></i>
                    </vs-tooltip>
                  </label>

                  <div class="checkBoxInput">
                    <input
                      class="form-check-input checkbox"
                      type="checkbox"
                      name="graduated"
               
                    />
                  </div>
                </div>
                <div class="inputBox mt-2">
                  <input
                    type="text"
                 
                   
                    class=""
                    min="0"
                  />
                  <span>Class</span>
                </div>
            
              </div>
              <div class="col-md-6">
                <div>
                  <img
                    src="account.coverImg"
                    alt=""
                    class="forcedImg smallerImg mt-2 Img1"
                  />
                </div>
                <div class="mt-3 inputBox">
                  <input type="url"  class=" " />
                  <span>CoverImg</span>
                </div>
              </div>
            </div>

            <div class="inputBox2 mt-2">
              <textarea
            
              
                class="mt-2"
                rows="5"
              ></textarea>
              <span>Bio</span>
            </div>

            <div class="my-3">
              <button class="btn btn-success selectable" type="submit">
                Edit Account 
              </button>
            </div>
          </form>
        </div>

        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      // MUTABLE DATA BAD!!!!! IMMUTABLE DATA GOOD
      //                 v BREAKS THE REFERENCE TO THE ORIGINAL OBJECT
      editable.value = { ...AppState.account };
    });
    return {
      editable,

      account: computed(() => AppState.account),

      async handleSubmit() {
        try {
       
          Pop.success('Account Edit Approved');
        } catch (error) {
          Pop.error(error, '[]');
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
  color: #f1ecf180;
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
.inputBox ::placeholder{
  color: #ffffff;
  font-weight: bold;
}
.inputBox span {
  position: absolute;
  left: 0;
  bottom: 3em;
  padding: 10px;
  pointer-events: none;
  font-size: 1em;
  text-transform: uppercase;
  color: #f1ecf180;
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
  background-image: url(https://images.freecreatives.com/wp-content/uploads/2016/03/Amazing-Background-For-Free.jpg);
  background-size: cover;
  background-position: center;
  box-shadow: 1px 1px 10px rgba(243, 236, 236, 0.308);
}
</style>
