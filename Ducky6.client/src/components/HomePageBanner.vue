<template>
  <div class="homePage-Banner card border border-2 border-primary box-shadow " >
<div class="p-5 text-light"><h5 class="text-light">Get your tickets before the others.</h5>
<h5 class="text-light"> Reserve your seat now with real events for fake people. </h5>
<h5>Nobody cares who any of us are until we put on the mask.</h5></div>


  </div>
</template>

<script>
export default {
  props: {

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
  height: 200px;
  width: auto;
  object-fit: cover;
}

.homePage-Banner{
background-image: url(https://wallpapercave.com/wp/wp7196471.jpg);
height: 200px;
background-position: center;
background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(103, 143, 146, 0.412);
overflow-y: auto;
}


</style>
