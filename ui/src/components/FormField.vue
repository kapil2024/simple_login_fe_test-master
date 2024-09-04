<template>
  <div class="field">
    <input :type="type" :placeholder="placeholder" :value="value" @input="clearError" />

  </div>
  <span class="error-message" v-if="error">{{ error }}</span>
</template>

<script>
export default {
  props: {
    value: String,
    error: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },

  },
  methods: {
    clearError() {
      this.$emit('update:value', event.target.value)
      this.$emit("clearError");
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  bottom: -20px;
  left: 0;
}


.field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
}

.field input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  border-radius: 15px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  font-size: 17px;
  transition: all 0.3s ease;
}

.field input:focus {
  border-color: #3e8b80;
}

.field input::placeholder {
  color: #999;
  transition: all 0.3s ease;
}

.field input:focus::placeholder {
  color: #3e8b80;
}
</style>
