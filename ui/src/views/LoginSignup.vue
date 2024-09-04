<template>
  <div class="wrapper">
    <!-- Form title -->
    <div class="title-text">
      <div class="title" :class="{ active: isSignup }" v-if="isLogin">Login Form</div>
      <div class="title" :class="{ active: isSignup }" v-if="isSignup">Signup Form</div>
    </div>

    <div class="form-container">
      <!-- Slide controls -->
      <div class="slide-controls">
        <input type="radio" name="slide" id="login" v-model="activeForm" value="login" />
        <input type="radio" name="slide" id="signup" v-model="activeForm" value="signup" />
        <label for="login" class="slide login form_text" :class="{ selected: isLogin }">Login</label>
        <label for="signup" class="slide signup form_text" :class="{ selected: isSignup }">Signup</label>
        <div class="slider-tab" :style="sliderStyle"></div>
      </div>

      <div class="form-inner">
        <!-- Login Form -->
        <form v-show="isLogin" class="login" @submit.prevent="handleLogin">
          <div class="field">
            <input
              type="email"
              placeholder="Email Address"
              
              v-model="signInForm.email"
              @input="clearLoginEmailError"
            />
          </div>
          <span class="error-message" v-if="loginEmailError">{{ loginEmailError }}</span>
          <div class="field password-field">
            <input
              :type="showLoginPassword ? 'text' : 'password'"
              placeholder="Password"
              
              v-model="signInForm.password"
              @input="clearLoginPasswordError"
            />
            <span class="toggle-password" @click="toggleLoginPassword">
               <svg height="1rem"
              v-if="!showLoginPassword"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
             
              <path 
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
              />
            </svg>
            <svg height="1rem"
              v-if="showLoginPassword"
             
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              
              <path 
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>
            </span>
          </div>
           <span class="error-message" v-if="loginPasswordError">{{ loginPasswordError }}</span>

          <div class="my-2 field btn">
            <div class="btn-layer"></div>
            <input type="submit" value="Login" />
          </div>
          <div class="signup-link">
            Not a member? <a href="" @click.prevent="switchToSignup">Signup now</a>
          </div>
        </form>

        <!-- Signup Form -->
        <form v-show="isSignup" class="signup" @submit.prevent="handleSignup">
          <div class="field">
            <input
              type="text"
              placeholder="Username"
              v-model="signUpForm.username"
              @input="clearUserNameError"
            />
          </div>
          <span class="error-message" v-if="userNameError">{{ userNameError }}</span>
          <div class="field">
            <input
              type="email"
              placeholder="Email Address"
              v-model="signUpForm.email"
              @input="clearSignupEmailError"
            />
          
          </div>
            <span class="error-message" v-if="signupEmailError">{{ signupEmailError }}</span>
          <div class="field password-field">
            <input
              :type="showSignupPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="signUpForm.password"
              @input="clearSignupPasswordError"
            />
           
            <span class="toggle-password" @click="toggleSignupPassword">
                <svg height="1rem"
              v-if="!showSignupPassword"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
             
              <path 
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
              />
            </svg>
            <svg height="1rem"
              v-if="showSignupPassword"
             
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              
              <path 
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>
            </span>
          </div>
           <span class="error-message" v-if="signupPasswordError">{{ signupPasswordError }}</span>

          <div class="my-2 field btn">
            <div class="btn-layer"></div>
            <input type="submit" value="Signup" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>




<script>
import axios from "axios";
export default {
  data() {
    return {
      signUpForm:{
        username:"",
        email:"",
        password:""
      },
      signInForm:{
        email:"",
        password:""
      },
      activeForm: "login",
      showLoginPassword: false,
      showSignupPassword: false,
        loginEmailError: '',
      loginPasswordError: '',
      signupEmailError: '',
      signupPasswordError: '',
       userNameError: '',
       api_url:"https://d675-49-43-6-96.ngrok-free.app/api/v1/"
    };
  },
  computed: {
    isLogin() {
      return this.activeForm === "login";
    },
    isSignup() {
      return this.activeForm === "signup";
    },
    sliderStyle() {
      return {
        left: this.isLogin ? "0%" : "50%",
      };
    },
  },
  methods: {
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    toggleLoginPassword() {
      this.showLoginPassword = !this.showLoginPassword;
    },
    toggleSignupPassword() {
      this.showSignupPassword = !this.showSignupPassword;
    },
     clearLoginEmailError() {
      this.loginEmailError = '';
    },
     clearUserNameError() {
      this.userNameError = '';
    },
    clearLoginPasswordError() {
      this.loginPasswordError = '';
    },
    clearSignupEmailError() {
      this.signupEmailError = '';
    },
    clearSignupPasswordError() {
      this.signupPasswordError = '';
    },
    switchToSignup() {
      this.activeForm = "signup";
    },
    async handleLogin() {
        this.resetErrors();
      
      if (!this.signInForm.email) {
        this.loginEmailError = 'Email is required';
      } else if (!this.isValidEmail(this.signInForm.email)) {
        this.loginEmailError = 'Invalid email address';
      }

      if (!this.signInForm.password) {
        this.loginPasswordError = 'Password is required';
      } else if (this.signInForm.password.length < 6) {
        this.loginPasswordError = 'Password must be at least 6 characters long';
      }

      if (!this.loginEmailError && !this.loginPasswordError) {
      try {
        const response = await axios.post(
            `${this.api_url}auth/sign-in`,
          {
            ...this.signInForm
          }
        );
        localStorage.setItem('authToken',response.data.token);
        this.$router.push('/dashboard')
      } catch (error) {
          this.loginPasswordError = 'Email or password is invalid';
        console.error("Login failed:", error.response.data);
      }
      }
    },
    async handleSignup() {
      this.resetErrors();
       if (!this.signUpForm.username) {
        this.userNameError = 'Username is required';
      }
      if (!this.signUpForm.email) {
        this.signupEmailError = 'Email is required';
      } else if (!this.isValidEmail(this.signUpForm.email)) {
        this.signupEmailError = 'Invalid email address';
      }

      if (!this.signUpForm.password) {
        this.signupPasswordError = 'Password is required';
      } else if (this.signUpForm.password.length < 6) {
        this.signupPasswordError = 'Password must be at least 6 characters long';
      }

      if (!this.userNameError &&!this.signupEmailError && !this.signupPasswordError) {
      try {
        const response = await axios.post(
            `${this.api_url}auth/sign-up`,
          {
            ...this.signUpForm
          }
        );
        localStorage.setItem('authToken',response.data.token);
        this.$router.push('/dashboard')
      } catch (error) {
        console.error("Signup failed:", error.response.data);
      }
      }
    },
     resetErrors() {
      this.loginEmailError = '';
      this.loginPasswordError = '';
      this.signupEmailError = '';
      this.signupPasswordError = '';
       this.userNameError = '';
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
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

.error-message {
  color: red;
  font-size: 12px;
  /* position: absolute; */
  bottom: -20px;
  left: 0;
}
.wrapper {
  overflow: hidden;
  /* max-width: 390px; */
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
.wrapper .slide-controls {
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 15px;
}
.slide-controls .slide {
  height: 100%;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.6s ease;
}

.slide-controls .login.selected {
  color: #fff;
}

.slide-controls .signup.selected {
  color: #fff;
}

.slide-controls .login {
  color: #2c3e50;
}

.slide-controls .signup {
  color: #2c3e50;
}
.slide-controls .slider-tab {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  z-index: 0;
  border-radius: 15px;
  /* background: -webkit-linear-gradient(left,#003366,#004080,#0059b3, #0073e6); */
  background: -webkit-linear-gradient(left, #5fbcaf, #3e8b80, #306b62, #375954);
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
input[type="radio"] {
  display: none;
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