<style scoped>
.header {
  width: 100%;
  height: 22vh;
}
.head {
  width: 100%;
  height: 10vh;
  background-image: url("../assets/header_bg.png");
  background-repeat: no-repeat;
  background-size: 100vw 100%;
}
.profile {
  width: 100%;
  height: 10vh;
}
.profile-right {
  float: right;
  width: 200px;
  height: 10vh;
}
.right{
  float: right;
}
.profile-name {
  vertical-align: middle;
  color: #fff;
  font-weight: 700;
  padding-left: 0.5rem;
  letter-spacing: 10px;
  text-shadow: 0.1em 0.1em 0.2em black;
}
.list {
  float: right;
  margin: 0;
  padding-left: 1.5rem;
  padding-top: 3vh;
}
.list li {
  display: inline;
  color: #fff;
  font-weight: 700;
  padding-left: 0.5rem;
  letter-spacing: 10px;
  text-shadow: 0.1em 0.1em 0.2em black;
}
.b-right {
  border-right: 1.5px solid #fff;
}
.mid{
  padding: .5rem;
}
.btn:focus {
  box-shadow: 0 0 0 0rem rgba(0, 0, 0, 0);
}
.menu {
  width: 100%;
  height: 12vh;
  background-color: #e7e6e1;
}
.logo {
  z-index: 2;
  position: absolute;
  top: 1%;
}
.menu-nav {
  background-color: #fff;
  width: 70vw;
  height: 12vh;
  float: right;
}
.navbar-collapse {
  z-index:5;
}
.navbar-nav {
  width: 100%;
  background-color: #fff;
}
.nav-item {
  background-image: url("../assets/menu-item_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 150px;
  margin-right: 2%;  
}
.menu-link {
  display: block;
  white-space:nowrap;
  padding: 1rem 0rem 1rem 1.2rem;
  font-weight: 700;
  color: rgba(171, 138, 107, 1);
  letter-spacing: 5px;
  text-decoration: none;
}
.menu-link:hover {
  text-decoration: none;
  color: #fff;
}
.nav-item:hover {
  border-radius: 15px;
  background-color: rgba(171, 138, 107, 1);
}
.dropdown-menu {
  border: 1px solid rgba(171, 138, 107, 1);
}
.dropdown-item {
  letter-spacing: 1px;
  padding: 0.5rem 1.5rem;
}
.dropdown-item:hover {
  color: #fff;
  background-color: #ab8a6b;
  border-bottom: 1px solid rgba(171, 138, 107, 1);
}
.route_link:hover{
  text-decoration: none;
}
@media (max-width: 1308px) {
  .menu-nav {
    width: 75%;
  }
}
@media (max-width: 1221px) {
  .menu-nav {
    width: 85%;
  }
  .menu-link{
    padding: .5rem;
  }
}

@media (max-width: 1200px) {
  .menu-nav {
    width: 85%;
  }
  .menu-link{
    padding: .5rem;
  }
  .logo {
    top: 0;
  }
  .logo img {
    width: 50%;
    height: 50%;
  }
}
@media (max-width: 1078px) {
  .menu-nav {
    width: 90%;
  }
  .menu-link{
    padding: .5rem;
  }
}
@media (max-width: 1018px) {
  .menu-nav {
    width: 100%;
  }
  .menu-link{
    padding: .5rem;
  }
}
@media (max-width: 979px) {
  .profile-right{
    font-size: 12px;
  }
  .profile-name{
    font-size: 12px;
    letter-spacing: 5px;
  }
  
  .menu-nav {
    width: 100%;
  }
  .menu-link{
    padding: 1rem;
  }
  .nav-item{
    width: 100%;
    background-image: none;
  }
}


</style>
<template>
    <div class="header">
      <div class="head">
          <div class="profile">
              <div class="profile-right">
                  <!--未登入前-->
                  <ul v-if="user == ''" class="list">
                      <router-link to="/register" class="route_link" style="cursor: pointer;"><li class="b-right">註冊</li></router-link>
                      <router-link to="/login" class="route_link" style="cursor: pointer;"><li>登入</li></router-link>
                  </ul>
                  <!--登入後-->
                  <div v-else class="dropdown mid">
                      <button class="btn dropdown-toggle btn-md" type="button" id="dropdownMenu2"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <img src="../assets/user.png" width="32px"><span class="profile-name">{{user.name}}</span>
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                          <button class="dropdown-item" type="button">修改個人資訊</button>
                          <button class="dropdown-item" type="button">會員專區</button>
                          <div class="dropdown-divider"></div>
                          <div @click="logout"  class="dropdown-item" style="cursor: pointer;">登出</div>

                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="logo">
        <router-link to="/index" style="cursor: pointer;"><img src="../assets/logo.png" height="120" /></router-link>
      </div>
      <div class="menu">
          <nav class="menu-nav navbar navbar-expand-lg navbar-light ">
              <!--響應式漢堡條-->
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05"
                  aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarsExample05">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <a class="menu-link" href="#">最新消息</a>
                      </li>
                      <li class="nav-item dropdown">
                          <a class="menu-link dropdown-toggle" href="#" id="dropdown05" data-toggle="dropdown"
                              aria-haspopup="true" aria-expanded="false">景點簡介</a>
                          <div class="dropdown-menu" aria-labelledby="dropdown05">
                              <a class="dropdown-item" href="#">第二市場</a>
                              <a class="dropdown-item" href="#">第三市場</a>
                              <a class="dropdown-item" href="#">第五市場</a>
                          </div>
                      </li>
                      <li class="nav-item">
                          <a class="menu-link" href="#">活動簡介</a>
                      </li>
                      <li class="nav-item">
                          <a class="menu-link" href="#">嚮導簡介</a>
                      </li>
                      <li class="nav-item">
                          <router-link to="/searchCourse" class="menu-link">嚮導課程訓練</router-link>
                      </li>
                      <li class="nav-item">
                          <a class="menu-link" href="#">導覽媒合</a>
                      </li>
                  </ul>
              </div>
          </nav>
      </div>
  </div>
  <!-- <div>
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
  </div> -->
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