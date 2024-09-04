<template>
    <div class="welcome-page">
      <h1>Welcome!</h1>
      <div class="options">
        <button @click="clickOpenSetting">Settings</button>
        <button @click="logOut">Logout</button>
      </div>
    </div>
  </template>

<script>
export default {
  methods:{
    clickOpenSetting(){
        this.$router.push('/setting')
    },
    logOut(){
        localStorage.clear();
        this.$router.replace('/')
    }
  }
}
</script>


<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}

.options {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #3e8b80;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3e8b80;
}
</style>