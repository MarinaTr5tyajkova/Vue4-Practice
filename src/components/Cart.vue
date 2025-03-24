<template>
    <div class="cart">
      <h2>Корзина</h2>
  
      <!-- Список товаров в корзине -->
      <ul v-if="cartItems.length > 0" class="cart-items">
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="product-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Цена: {{ item.price }} руб.</p>
            <p>Количество: {{ item.quantity }}</p>
          </div>
  
          <!-- Кнопки управления количеством -->
          <div class="controls">
            <button @click="decreaseQuantity(item.id)" class="btn">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)" class="btn">+</button>
          </div>
  
          <!-- Кнопка удаления товара -->
          <button @click="removeFromCart(item.id)" class="btn remove">Удалить</button>
        </li>
      </ul>
  
      <!-- Сообщение о пустой корзине -->
      <p v-else class="empty-cart">Ваша корзина пуста.</p>
  
      <!-- Кнопка оформления заказа -->
      <button v-if="cartItems.length > 0" @click="placeOrder" class="checkout-btn">
        Оформить заказ
      </button>
  
      <!-- Кнопка "Назад" -->
      <button @click="goBack" class="back-btn">Назад</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [], // Список товаров в корзине
      };
    },
    methods: {
      async fetchCart() {
        try {
          const response = await this.$store.dispatch('fetchCart');
          this.cartItems = response.data.map(item => ({
            ...item,
            quantity: 1, // Инициализация количества
          }));
        } catch (error) {
          console.error('Ошибка загрузки корзины:', error);
        }
      },
      increaseQuantity(productId) {
        const item = this.cartItems.find(item => item.id === productId);
        if (item) item.quantity++;
      },
      decreaseQuantity(productId) {
        const item = this.cartItems.find(item => item.id === productId);
        if (item && item.quantity > 1) item.quantity--;
      },
      removeFromCart(cartItemId) {
        this.$store.dispatch('removeFromCart', cartItemId);
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      },
      placeOrder() {
        this.$store.dispatch('placeOrder').then(() => {
          this.$router.push('/orders');
        });
      },
      goBack() {
        this.$router.push('/');
      },
    },
    created() {
      this.fetchCart();
    },
  };
  </script>
  
  <style scoped>
  .cart {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .cart-items {
    list-style: none;
    padding: 0;
  }
  
  .cart-item {
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
  
  .controls {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  
  .controls button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .controls span {
    font-size: 16px;
    margin: 0 10px;
  }
  
  .remove {
    background-color: #f44336;
    color: white;
  }
  
  .checkout-btn {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .back-btn {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .empty-cart {
    text-align: center;
    color: #666;
  }
  </style>