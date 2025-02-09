<template>
  <router-link :to="{ name: 'dashboard' }">
    <img
      src="@/assets/images/logo/logo-acacia.png"
      alt=""
      v-if="!this.$store.themeSettingsStore.isDark"
    />

    <img
      src="@/assets/images/logo/logo-acacia.png"
      alt=""
      v-if="this.$store.themeSettingsStore.isDark"
    />
  </router-link>
</template>
<script></script>
