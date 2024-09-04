<template>
    <form class="signup" @submit.prevent="handleSignup">

        <FormField type="text" placeholder="Username" v-model:value="signUpForm.username"
            @clearError="clearUserNameError" :error="userNameError" />

        <FormField type="email" placeholder="Email Address" v-model:value="signUpForm.email"
            @clearError="clearSignupEmailError" :error="signupEmailError" />

        <PasswordField placeholder="Password" v-model:value="signUpForm.password" @clearError="clearSignupPasswordError"
            :error="signupPasswordError" />
        <FormButton label="Signup" />
    </form>

</template>

<script>
import { API_URL } from '@/utils/constants';
import FormButton from './FormButton.vue';
import FormField from './FormField.vue';
import PasswordField from './PasswordField.vue';
import axios from "axios";

export default {
    components: {
        FormField, PasswordField, FormButton
    },
    data() {
        return {
            signUpForm: {
                username: "",
                email: "",
                password: ""
            },
            showSignupPassword: false,
            signupEmailError: '',
            signupPasswordError: '',
            userNameError: '',
        };
    },
    methods: {
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
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

            if (!this.userNameError && !this.signupEmailError && !this.signupPasswordError) {
                try {
                    const response = await axios.post(
                        `${API_URL}auth/sign-up`,
                        {
                            ...this.signUpForm
                        }
                    );
                    localStorage.setItem('authToken', response.data.token);
                    this.$router.push('/dashboard')
                } catch (error) {
                    console.error("Signup failed:", error.response.data);
                    this.signupPasswordError = error.response.data.error;
                }
            }
        },
        resetErrors() {
            this.signupEmailError = '';
            this.signupPasswordError = '';
            this.userNameError = '';
        },
    }

}


</script>