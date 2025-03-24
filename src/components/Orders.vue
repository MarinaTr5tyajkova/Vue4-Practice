<template>
    <div class="orders">
      <h2>Мои заказы</h2>
      <ul v-if="orders.length > 0" class="order-list">
        <li v-for="order in orders" :key="order.id" class="order-item">
          <p>Заказ №{{ order.id }}</p>
          <p>Общая стоимость: {{ order.order_price }} руб.</p>
          <p>Товары: {{ order.products.join(', ') }}</p>
        </li>
      </ul>
      <p v-else class="empty-orders">У вас пока нет оформленных заказов.</p>
      <button @click="goBack">Назад</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [], // Список заказов
      };
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await this.$store.dispatch('fetchOrders');
          this.orders = response.data;
        } catch (error) {
          console.error('Ошибка загрузки заказов:', error);
        }
      },
      goBack() {
        this.$router.push('/');
      },
    },
    created() {
      this.fetchOrders();
    },
  };
  </script>
  
  <style scoped>
  .orders {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .order-list {
    list-style: none;
    padding: 0;
  }
  
  .order-item {
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .empty-orders {
    text-align: center;
    color: #666;
  }
  
  button {
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
  </style>