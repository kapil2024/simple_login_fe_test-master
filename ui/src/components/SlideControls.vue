<template>
    <div class="slide-controls">
        <input type="radio" value="login" name="slide" id="login" :checked="activeForm === 'login'" @change="switchForm('login')" />
        <label for="login"  class="slide login">Login</label>
        <input type="radio" value="signup" name="slide" id="signup" :checked="activeForm === 'signup'" @change="switchForm('signup')" />
        <label for="signup" class="slide signup">Signup</label>
        <div class="slider-tab" :style="sliderStyle"></div>
    </div>
</template>

<script>
export default {
    props: {
        activeForm: String,
    },
    computed: {
        sliderStyle() {
            return {
                left: this.activeForm === 'login' ? "0%" : "50%",
            };
        },
    },
    methods: {
        switchForm(form) {
            this.$emit('update:activeForm', form)
        },
    },
};
</script>

<style scoped>
input[type="radio"] {
    display: none;
}

.slide-controls {
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
</style>