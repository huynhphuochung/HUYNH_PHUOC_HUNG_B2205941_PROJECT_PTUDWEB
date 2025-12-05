<template>
  <div id="app">
    <!-- Header khác nhau dựa vào route -->
    <AppHeader v-if="$route.meta.role === 'admin'" />
    <DocGiaHeader v-else-if="$route.meta.role === 'docgia'" />

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import DocGiaHeader from "@/components/DocgiaHeader.vue";

export default {
  components: { AppHeader, DocGiaHeader },
};
</script>
