<template>
    <div class="account-settings">
        <FormTitle title="Account Settings" />
        <form @submit.prevent="handleSettingChange">
            <div class="form-group">
                <label for="email">Username:</label>
                <FormField type="text" placeholder="Username" v-model:value="formData.username"
                    @clearError="clearUserNameError" :error="userNameError" />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <FormField type="email" placeholder="Email Address" v-model:value="formData.email"
                    @clearError="clearLoginEmailError" :error="loginEmailError" />
            </div>

            <div class="form-group">
                <label for="email">Password:</label>
                <PasswordField placeholder="Password" v-model:value="formData.password"
                    @clearError="clearLoginPasswordError" :error="loginPasswordError" />

            </div>
            <FormButton label="Save Changes" />
            <div class="signup-link">
                Back to <a href="" @click.prevent="backToDashboard">dashboard</a>
            </div>
        </form>
    </div>
</template>

<script>
import FormButton from '@/components/FormButton.vue';
import FormField from '@/components/FormField.vue';
import FormTitle from '@/components/FormTitle.vue';
import PasswordField from '@/components/PasswordField.vue';
import { API_URL } from '@/utils/constants';
import axios from 'axios'
export default {
    components: {
        FormField,
        PasswordField, FormButton, FormTitle
    },
    data() {
        return {
            formData: {
                username: '',
                email: '',
                password: '',
            },
            loginEmailError: '',
            loginPasswordError: '',
            showPassword: false,
            userNameError: '',
            auth_token: ''
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.auth_token = localStorage.getItem('authToken');
                const response = await fetch(`${API_URL}auth/user`, {
                    headers: {
                        Authorization: `${this.auth_token}`
                    }
                });
                const data = await response.json()
                const { email, username } = data.user;
                this.formData.email = email;
                this.formData.username = username;
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        },
        toggleLoginPassword() {
            this.showPassword = !this.showPassword;
        },
        async handleSettingChange() {
            if (!this.formData.email) {
                this.loginEmailError = "Email field is required"
            }
            if (!this.formData.username) {
                this.userNameError = "Username field is required"
            }
            if (!this.loginEmailError && !this.userNameError) {
                try {
                    axios.put(
                        `${API_URL}auth/users`, {
                        ...(this.formData.password.length > 0
                            ? this.formData
                            : { email: this.formData.email, username: this.formData.username }
                        )
                    }, {
                        headers: {
                            Authorization: `${this.auth_token}`
                        }
                    }
                    ).then((data)=>{
                        this.$router.push('/');
                    }).catch(error=>{
                        console.error(error);
                        this.loginPasswordError = "Something went wrong";
                    })
                } catch (error) {
                    console.error("Change request failed:", error.response.data)
                }
            }
        },
        backToDashboard(){
            this.$router.back();
        }

    }
}
</script>



<style scoped>
.account-settings {
    width: 450px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: -15px;
    font-weight: bold;
}
</style>