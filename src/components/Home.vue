<template>
    <div class="home">
     
      <div v-if="!isAuthenticated" class="auth-links">
        <router-link to="/register">Регистрация</router-link>
        <router-link to="/login">Вход</router-link>
      </div>
  
      
      <div v-else class="auth-links">
        <button @click="logout">Выйти</button>
      </div>
  
      <h2>Каталог товаров</h2>
      
      <ul class="product-list">
        <li v-for="product in products" :key="product.id" class="product-item">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>Цена: {{ product.price }} руб.</p>
          </div>
  
          
          <button v-if="isAuthenticated" @click="addToCart(product.id)" class="add-to-cart">
            Добавить в корзину
          </button>
        </li>
      </ul>
  
      
      <div v-if="isAuthenticated" class="order-link">
        <router-link to="/orders">Посмотреть заказы</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [], 
      };
    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await this.$store.dispatch('fetchProducts');
          this.products = response.data;
        } catch (error) {
          console.error('Ошибка загрузки товаров:', error);
        }
      },
      addToCart(productId) {
        this.$store.dispatch('addToCart', productId);
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/');
      },
    },
    created() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  .home {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .auth-links {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .auth-links a,
  .auth-links button {
    padding: 10px 15px;
    background-color: #34c924;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
  }
  
  .auth-links a:hover,
  .auth-links button:hover {
    background-color: #1a910f;
  }
  
  .product-list {
    list-style: none;
    padding: 0;
  }
  
  .product-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .product-info {
    flex: 1;
  }
  
  .add-to-cart {
    padding: 10px 15px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-to-cart:hover {
    background-color: #1e88e5;
  }
  
  .order-link {
    margin-top: 20px;
    text-align: center;
  }
  
  .order-link a {
    padding: 10px 15px;
    background-color: #ff9800;
    color: white;
    border: none;
    border-radius: 4px;
    text-decoration: none;
  }
  
  .order-link a:hover {
    background-color: #fb8c00;
  }
  </style>