<template>
  <div class="container">
    <div class="profilePic flex-container">You have not photos yet!</div>
    <div class="userdata primary-info">
      <div class="fame-rating">
        <img src="../../assets/img/star.png" alt="fame rating">
        <span>{{ user.fameRating }}</span>
      </div>
      <div>
        <div>{{ user.name }} {{ user.surname }}</div>
        <div v-if="user.location">{{ user.location.city }}, {{ user.location.country }}</div>
      </div>
    </div>
    <div class="userdata tags">
      <div class="userdata-title">tags</div>
      <div>No #tags specified!</div>
    </div>
    <div class="userdata gender">
      <div class="userdata-title">gender</div>
      <div>No gender selected!</div>
    </div>
    <div class="userdata sexual-preferences">
      <div class="userdata-title">sexual preferences</div>
      <div>{{ user.sexualPreferences }}</div>
    </div>
    <div class="userdata biography">
      <div class="userdata-title">biography</div>
      <div>Biography unknown!</div>
    </div>
    <router-link to="/edit-profile">
      <button>edit profile</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    props: {
      user: Object
    },

  }
</script>

<style lang="stylus" scoped>
.profile
  background: bg-dark;
  height: 100%;
  width: 30%;
  min-width: 200px;
  transition: .3s;
  @media screen and (max-width: xs)
    position: fixed;
    width: 100vw;
  &.not-active
    display: none;

.profilePic
  color: light;
  border-bottom: 1px solid faded;
  font-family: accent-font;
  height: 30%;
  text-align: center;

.userdata
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: light;
  font-size: .9rem;
  padding: .2rem;
  margin-bottom: 1rem;
  text-align: right;

.userdata-title
  color: faded;
  font-family: primary-font;
  font-size: .9rem;
  font-weight: bold;
  text-transform: capitalize;

.primary-info
  font-weight: bold;
  img
    height: 1.5rem;
    margin-right: .5rem;

.fame-rating
  display: flex;
  align-items: center;

.tags
  color: accent1;
  font-family: accent-font;
  font-size: 1.3rem;
  padding-right: .5rem;
</style>