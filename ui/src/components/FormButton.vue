<template>
  <div class="my-2 field btn">
    <div class="btn-layer"></div>
    <input type="submit" :value="label" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style scoped>
.btn {
  height: 50px;
  width: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
}
.btn .btn-layer {
  height: 100%;
  width: 100%;
  position: absolute;
  /* left: -100%; */
  background: #3e8b80;
  border-radius: 15px;
  transition: all 0.4s ease;
}
.btn:hover .btn-layer {
  left: 0;
}
.btn input[type="submit"] {
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  background: none;
  border: none;
  color: #fff;
  padding-left: 0;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
</style>
