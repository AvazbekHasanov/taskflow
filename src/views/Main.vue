<template>
  <div class="dark:bg-gray-800 dark:text-white min-h-screen flex flex-col">
    <Navbar />
    <div class="overflow-y-scroll">
      <main class="flex-grow overflow-y-auto">
        <Body />
        <Projects />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavbarMain.vue';
import Body from '@/components/Body.vue';
import Projects from '@/components/ProjectsMain.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: { Navbar, Body, Projects, Footer },
};
</script>

<style>
/* Add to your global styles or App.vue */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  overflow-y: auto;
}

</style>
