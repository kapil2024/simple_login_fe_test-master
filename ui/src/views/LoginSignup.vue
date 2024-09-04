<template>
  <div class="wrapper">
    <!-- Form title -->
    <FormTitle :title="isLogin ? 'Login Form' : 'Signup Form'" />
    <div class="form-container">
      <!-- Slide controls -->

      <SlideControls v-model:activeForm="activeForm" @switch-form="switchForm" />
      <div class="form-inner">
        <LoginForm v-show="isLogin" @switch-signup="switchToSignup" />
        <SignupForm v-show="isSignup" />
      </div>
    </div>
  </div>
</template>




<script>
import FormTitle from "@/components/FormTitle.vue";
import LoginForm from "@/components/LoginForm.vue";
import SignupForm from "@/components/SignupForm.vue";
import SlideControls from "@/components/SlideControls.vue";
import axios from "axios";
export default {
  components: {
    FormTitle, SlideControls, LoginForm, SignupForm
  },
  data() {
    return {
      activeForm: "login"
    }
  },
  computed: {
    isLogin() {
      return this.activeForm === "login";
    },
    isSignup() {
      return this.activeForm === "signup";
    }
  },
  methods: {
    switchForm(form) {
      this.activeForm = form;
    },
    switchToSignup() {
      this.activeForm = "signup";
    },
  },
};
</script>

<style scoped>


html,
body {
  display: flex;
  height: 100%;
  width: 100%;
  place-items: center;
  background: -webkit-linear-gradient(left, #003366, #004080, #0059b3, #0073e6);
}

::selection {
  background: #1a75ff;
  color: #fff;
}

.field {
  position: relative;
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #3e8b80;
  font-size: 14px;
  user-select: none;
}


.wrapper {
  overflow: hidden;
  width: 450px;
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
}

.wrapper .title-text {
  display: flex;
  width: 200%;
}

.wrapper .title {
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .form-container {
  width: 100%;
  overflow: hidden;
}

.form-container .form-inner {
  display: flex;
  width: 200%;
}

.form-container .form-inner form {
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-inner form .field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
}

.form-inner form .field input {
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

.form-inner form .field input:focus {
  border-color: #3e8b80;
}

.form-inner form .field input::placeholder {
  color: #999;
  transition: all 0.3s ease;
}

form .field input:focus::placeholder {
  color: #3e8b80;
}

.form-inner form .pass-link {
  margin-top: 5px;
}

.form-inner form .signup-link {
  text-align: center;
  margin-top: 30px;
}

.form-inner form .pass-link a,
.form-inner form .signup-link a {
  color: #3e8b80;
  text-decoration: none;
}

.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover {
  text-decoration: underline;
}

form .btn {
  height: 50px;
  width: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

form .btn .btn-layer {
  height: 100%;
  width: 100%;
  position: absolute;
  /* left: -100%; */
  background: #3e8b80;
  border-radius: 15px;
  transition: all 0.4s ease;
}

form .btn:hover .btn-layer {
  left: 0;
}

form .btn input[type="submit"] {
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