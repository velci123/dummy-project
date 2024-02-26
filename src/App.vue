<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <NavBar />
    <router-view class="flex-1"></router-view>
    <Footer />
  </div>
</template>
