<template>
  <div id="auth-view" class="container flex-container">
    <div id="auth-header">
      <router-link to="/auth">matcha |</router-link>
        <span> the dating service.</span>
    </div>
    <vue-page-transition name="fade-in-left">
      <router-view />
    </vue-page-transition>
    <div id="auth-view-footer">Created by Gscolera & Gstiedem as a 42school (Moscow campus) project in 2019.</div>
   </div>
</template>
<script>
  export default {

  }
</script>
<style lang="stylus" scoped>
#auth-view
  background: center / cover no-repeat url('../assets/img/clouds-2597270_1280.jpg');
  justify-content: space-between;
  overflow-y: auto;

#auth-header
  align-self: flex-start;
  border-radius: 5px;
  color: accent1;
  padding: .8rem;
  text-transform: uppercase;
  & a
    font-weight: bold;
  & span
    font-family: accent-font;

#auth-view-footer
  align-self: flex-end;
  color: light;
  font-family: accent-font;
  padding: .2rem 1rem;
  text-align: center;

</style>
