<style scoped>
.header {
  background-image: url(../assets/headerBg.png);
  background-color: #FFFFFF;
  height: 273px;
  width: 100%;
  background-size: 100vw auto;
  background-repeat: no-repeat;
}
.route_link a:hover, a:visited, a:link, a:active{
  text-decoration: none;
  color: #000000;
}
</style>
<template>
  <div>
    <div class="col-lg-12 col-xs-12">
      <div class="header">
        <div class="dropdown" align="right">
          <button class="btn btn-warning dropdown-toggle btn-lg" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span v-if="islogin">{{user.name}} 您好!</span>
            <span v-else>未登入</span>
          </button>
          <div class="dropdown-menu" v-if="islogin" aria-labelledby="dropdownMenu2">
            <router-link to="/searchCourse" class="dropdown-item route_link">搜尋</router-link>
            <router-link to="/addAnnounce" class="dropdown-item route_link">新增公告</router-link>
            <router-link to="/searchAnnounce" class="dropdown-item route_link">搜尋公告</router-link>
            <router-link to="/Announce" class="dropdown-item route_link">公告</router-link>
            <router-link to="/createCourse" class="dropdown-item route_link">建立</router-link>
            <router-link to="/addAnnounce" class="dropdown-item route_link">修改個人資訊</router-link>
            <router-link to="/addAnnounce" class="dropdown-item route_link">會員專區</router-link>
            <div @click="logout"  class="dropdown-item route_link" style="cursor: pointer;">登出</div>
          </div>
          <div class="dropdown-menu" v-else aria-labelledby="dropdownMenu2">
            <router-link to="/login" class="dropdown-item route_link">登入</router-link>
            <router-link to="/register" class="dropdown-item route_link">註冊</router-link>
          </div>
        </div>
      </div>
    </div>
    
      <!-- <router-link to="/">
        <img id="logo" src="../image/LOGO.png" width="156px" height="116px">
      </router-link> -->

      <!-- <table class="routelink">
        <tr>
          <router-link to="/news" tag="button" class="btn" id="btnnews">
            <img src="../image/最新消息.png" height="83px">
          </router-link>

          <button class="btn" id="btnparty">
            <img src="../image/景點簡介.png" height="83px">
          </button>
          <button class="btn" id="btnview">
            <img src="../image/活動簡介.png" height="83px">
          </button>
          <button class="btn" id="btnleader">
            <img src="../image/嚮導簡介.png" height="83px">
          </button>
          <button class="btn" id="btntrain">
            <img src="../image/嚮導課程訓練.png" height="83px">
          </button>
          <button class="btn" id="btntmach">
            <img src="../image/導覽媒合.png" height="83px">
          </button>
        </tr>
      </table> -->
  </div>
</template>
<script>
import axios from "axios";
import global_ from "@/components/Global/global";
import router from "@/router";
export default {
  props: ["user"], //從home傳進來
  data() {
    return {
      //isShow: true,
    };
    // show:global_.isShow
  },
  watch: {},
  mounted: function() {
    // this.isLogin();
  },
  methods: {
    // isLogin() {
    //   if (global_.isLogin == true) {
    //     this.isShow = false;
    //     console.log(this.isShow);
    //   }
    // },
    logout() {
      const self = this;
      axios
        .post(
          `http://163.17.145.142/api/logout`,
          '',
          {
            headers: { authorization: `Bearer ${global_.login_token}` }
          }
        )
        .then(function(response) {
          if ((status = 200)) {
            self.$emit('logout');
            alert("已登出");
            self.$router.push('/index');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    islogin:function() {
      return this.user != '';
    }
  },
};
</script>