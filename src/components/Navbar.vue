<script>
import {Burger} from "@element-plus/icons-vue";

export default {
  components: {Burger},
  data() {
      return {
        username: '',
        is: {
          pallete: false,
          phone: false,
          message: false,
          bell: false,
          telegram: false
        },
        user: {
          photo: null
        },
        isAdmin: false,
        balance: 0,
      }
    },
    mounted() {
    this.username = JSON.parse(localStorage.getItem('user_info')).name
      this.getUserPhoto();
      this.isAdmin = true
      // if(this.isAdmin && (this.$user.bankGroupId !== null && this.$user.level == 1)){
      //   this.getBankBalance();
      // }
    },
    methods: {
      getBankBalance(){
        this.$api.get('v1/organizations/balance').then((res)=>{
          this.balance = res.data.data;
        })
      },
      toggleIcon(booleanValue) {
        switch (booleanValue) {
          case "pallete":
            this.is.pallete = !this.is.pallete;
            this.is.phone = false;
            this.is.message = false;
            this.is.bell = false;
            break;
          case "phone":
            this.is.pallete = false;
            this.is.phone = !this.is.phone;
            this.is.message = false;
            this.is.bell = false;
            this.is.telegram = false;
            break;
          case "message":
            this.is.pallete = false;
            this.is.phone = false;
            this.is.message = !this.is.message;
            this.is.bell = false;
            break;
          case "bell":
            this.is.pallete = false;
            this.is.phone = false;
            this.is.message = false;
            this.is.bell = !this.is.bell;
            break;
          case "telegram":
            this.is.pallete = false;
            this.is.phone = false;
            this.is.message = false;
            this.is.bell = false;
            this.is.telegram = !this.is.telegram;
            break;
        }
      },
      getUserPhoto() {
        this.user.photo = null
      },
      logOut(){
        localStorage.clear();
         this.$router.push('/auth/login'); // Navigate to login page
      },
    }
}
</script>

<template>
  <div class="flex flex-row justify-between items-center p-1 bg-white dark:bg-gray-900">
    <el-button class="!bg-transparent hover:scale-105 hover:text-white">
      <font-awesome-icon icon="bars" class="bars"/>
    </el-button>
    <div class="topbarRight__elements">
  <a class="icon__topbarRight"
     :class="{activeIcon: is.phone}"
     href="tel:+998787778484"
     @click="toggleIcon('phone')">
    <img class="icon__topbarRight-img"
         v-if="is.phone == false"
         src="https://www.bank-kredit.uz/media/store/images/svg/platon_phone.svg"
         alt="phone" />
    <img class="icon__topbarRight-img"
         v-if="is.phone == true"
         src="https://www.bank-kredit.uz/media/store/images/svg/platon_phone_active.svg"
         alt="phone" />
  </a>

  <a class="icon__topbarRight"
     href="https://t.me/oilakredit_help_bot"
     target="_blank"
     @click="toggleIcon('telegram')">
  	<img class="icon__topbarRight-img"
         v-if="is.telegram == false"
         src="https://www.bank-kredit.uz/media/store/images/svg/platon_telegram.svg"
         alt="telegram"/>
  	<img class="icon__topbarRight-img"
         v-if="is.telegram == true"
         src="https://www.bank-kredit.uz/media/store/images/svg/platon_telegram_active.svg"
         alt="telegram"/>
  </a>


  <!---------- ICON USER ---------->
  <div class="icon__user-parent">
  	<img class="icon__user"
         src="https://www.bank-kredit.uz/media/store/images/png/platon_user.png"
         alt="user"/>
    <!---------- OPTIONS ---------->
    <div class="topbarRight__select">
      <div class="user_name text-center">
        {{username}}
      </div>
      <button class="topbarRight__select-option" @click="logOut">

      <span class="topbarRight__select-text">Chiqish</span>
			</button>
    </div>
  </div>
</div>
  </div>
</template>

<style scoped>
@import "../styles/top_bar.css";

</style>
