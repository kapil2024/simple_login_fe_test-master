<template>
    <form class="login" @submit.prevent="handleLogin">
        <FormField type="email" placeholder="Email Address" v-model:value="signInForm.email"
            @clearError="clearLoginEmailError" :error="loginEmailError" />

        <PasswordField placeholder="Password" v-model:value="signInForm.password" @clearError="clearLoginPasswordError"
            :error="loginPasswordError" />
        <FormButton label="Login" />
        <div class="signup-link">
            Not a member? <a href="" @click.prevent="switchToSignup">Signup now</a>
        </div>
    </form>

</template>

<script>
import { API_URL } from '@/utils/constants';
import FormButton from './FormButton.vue';
import FormField from './FormField.vue';
import PasswordField from './PasswordField.vue';
import axios from "axios";

export default {
    data() {
        return {
            signInForm: {
                email: "",
                password: ""
            },
            showLoginPassword: false,
            loginEmailError: '',
            loginPasswordError: '',
        };
    },
    components: {
        FormButton, FormField, PasswordField
    },
    methods: {
        switchToSignup(){
            this.$emit("switch-signup");
        },
        clearLoginEmailError() {
            this.loginEmailError = '';
        },
        clearLoginPasswordError() {
            this.loginPasswordError = '';
        },
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        resetErrors() {
            this.loginEmailError = '';
            this.loginPasswordError = '';
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
                        `${API_URL}auth/sign-in`,
                        {
                            ...this.signInForm
                        }
                    );
                    localStorage.setItem('authToken', response.data.token);
                    this.$router.push('/dashboard')
                } catch (error) {
                    this.loginPasswordError = 'Email or password is invalid';
                    console.error("Login failed:", error.response.data);
                }
            }
        },
    }


}

</script>