<template>
    <div class="SigninPage">
      <h1>Войти</h1>

      <form class="fields-list" @submit.prevent="submitForm">
        <label>
          <span>Email</span>
          <input type="email" v-model="email" required />
        </label>
        <label>
          <span>Пароль</span>
          <input type="password" v-model="password" required />
        </label>
        <div>
          <div>
            <a href="#/auth/signup">Зарегистрироваться</a>
            <a href="#/auth/forget">Забыли пароль?</a>
          </div>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SigninPage',
    data () {
      return {
        email: '',
        password: '',
      };
    },
  }
  </script>
  
<style lang="less" scoped src="./signin.less" />
