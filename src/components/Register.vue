<template>
    <div class="register">
      <h2>Регистрация</h2>
      <form @submit.prevent="handleRegister">
        
        <div :class="['field', { error: errors.fio }]">
          <label>ФИО:</label>
          <input
            v-model="formData.fio"
            type="text"
            placeholder="Введите ФИО"
            required
          />
          <p v-if="errors.fio">{{ errors.fio }}</p>
        </div>
  
        
        <div :class="['field', { error: errors.email }]">
          <label>Email:</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Введите email"
            required
          />
          <p v-if="errors.email">{{ errors.email }}</p>
        </div>
  
       
        <div :class="['field', { error: errors.password }]">
          <label>Пароль:</label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Введите пароль"
            required
          />
          <p v-if="errors.password">{{ errors.password }}</p>
        </div>
  
        
        <div class="buttons">
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
          <button type="button" @click="goBack">Назад</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          fio: '',
          email: '',
          password: '',
        },
        errors: {},
        isLoading: false,
      };
    },
    methods: {
      async handleRegister() {
        this.errors = {};
        this.isLoading = true;
  
        try {
          await this.$store.dispatch('register', this.formData);
          this.$router.push('/login');
        } catch (error) {
          if (error.response && error.response.data.error) {
            const { errors } = error.response.data.error;
            this.errors = errors || {};
          }
        } finally {
          this.isLoading = false;
        }
      },
      goBack() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .register {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .field {
    margin-bottom: 15px;
  }
  
  .field label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .field input {
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .field.error input {
    border-color: red;
  }
  
  .field p {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button[type="submit"] {
    background-color: #34c924;
    color: white;
  }
  
  button[type="submit"]:disabled {
    background-color: #ccc;
  }
  
  button[type="button"] {
    background-color: #3280f6;
    color: white;
  }
  </style>