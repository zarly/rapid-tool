<template>
    <div class="SignupPage">
      <h1>Регистрация</h1>

      <form class="fields-list" @submit.prevent="submitForm">
        <label>
          <span>Имя / никнейм</span>
          <input type="text" v-model="name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" v-model="email" required />
        </label>
        <label>
          <span>Пароль</span>
          <input type="password" v-model="password" required />
        </label>
        <label>
          <span>Повтор пароля</span>
          <input type="password" v-model="password2" required />
        </label>
        <div>
          <a href="#/auth/signin">Войти</a>
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupPage',
    data () {
      return {
        name: '',
        email: '',
        password: '',
        password2: '',
      };
    },
    methods: {
      async submitForm () {
        console.log('Submit');
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
          }),
        });
        const data = await res.json();
        console.log('data =', data);
      },
    },
  }
  </script>
  
<style lang="less" scoped src="./signup.less" />
  