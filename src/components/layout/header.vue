<style scoped>
.header_top{
  height: 80px;
  width: 100%;
  background-image: url("../../assets/header_bg.png");
  background-repeat: no-repeat; 
  background-size: Cover ;
}
.header_bottom{
  height: 80px;
  background-color: #fff;
  z-index: 999;
}
.logo{
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
}

.logo img{
  height:100px;
}

.nav-item {
  background-image: url("../../assets/menu-item_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 150px;
  margin-right: 8px;
  text-align: center;
}
.menu-link {
  display: block;
  font-size: 18px;
  padding: 10px;
  font-weight: 700;
  color: rgba(171, 138, 107, 1);
  letter-spacing: 10px;
  text-decoration: none;
  white-space:nowrap;
  cursor: pointer;
}
.navbar-collapse {
  z-index:5;
}
.navbar-nav{
  border-bottom-right-radius:10px;
  border-bottom-left-radius:10px;  
}
.menu-nav {
  height: 100%;
}


.profile{
  margin-right: 30px;
  line-height:  80px;
}
.dropdown-item{
  line-height:  40px;
}
.profile-right{
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
@media (max-width: 1156px) {
  .logo{
    padding: 10px;
  }
  .logo img{
    height:60px;
  }
} 

@media (min-width: 992px) {
  .menu-nav {
    float: right;
  }
}

@media (max-width: 979px) {
  .menu-nav {
    width: 100%;
    
  }
  .menu-link:hover{
    border-radius:10px;
    background-color: rgba(171, 138, 107, 1);
    color: #fff;
  }
  .nav-item{
    width: 100%;
    background-image: none;
  }
  .navbar-nav{
    background-color:  #fff;
    width:200px;
  }
  #navbarsExample05{
     width:200px;
  }
}
.message_img {
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    float:left;
    margin-right: 10px;
}
</style>
<template>
  <div>
    <div class="header_top">
      <div class="profile">
        <div class="profile-right">
          <!-- 未登入前 -->
          <ul v-if="user == ''" class="list">
              <router-link to="/register" class="route_link" style="cursor: pointer;"><li class="b-right">註冊</li></router-link>
              <router-link to="/login" class="route_link" style="cursor: pointer;"><li>登入</li></router-link>
          </ul>
          <!-- 登入後 -->
          <div v-else class="dropdown mid">
            <button class="btn dropdown-toggle btn-md" type="button" id="dropdownMenu2"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div v-if="user.profile_pic != null"  class="message_img" style="width: 32px; height: 32px;">
                  <img :src="`${this.$GLOBAL.path}/images/ThumbnailImage/${user.profile_pic}`" alt="" class="img" width="32" height="32" style="vertical-align:baseline;">
                </div>
                <img v-else src="../../assets/user.png" width="32px"><span class="profile-name">{{user.name}}</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
              <router-link to="/createannounce" v-if="user.status ==4"><button class="dropdown-item" type="button">新增公告</button></router-link>
              <router-link to="/profile" ><button class="dropdown-item" type="button">個人資訊</button></router-link>
              <router-link to="/resume" ><button class="dropdown-item" type="button">我的履歷</button></router-link>
              <router-link to="/signuplist" ><button class="dropdown-item" type="button">我的報名</button></router-link>
              <router-link to="/userlist"  v-if="user.status ==4"><button class="dropdown-item" type="button">查詢用戶</button></router-link>
              <router-link to="/banuser"  v-if="user.status ==4"><button class="dropdown-item" type="button">限制用戶</button></router-link>
                
                <div class="dropdown-divider"></div>
                <div @click="logout"  class="dropdown-item" style="cursor: pointer;">登出</div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header_bottom">
      <nav class="menu-nav navbar navbar-expand-lg navbar-light ">
        <button ref="navbar_toggler" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05"
            aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample05">
            <ul class="navbar-nav">
                <li class="nav-item" @click="close_nav">
                    <router-link tag="div" to="/news" class="menu-link">最新消息</router-link>
                </li>
                <li class="nav-item" @click="close_nav">
                   <router-link  tag="div" to="/attraction" class="menu-link">景點簡介</router-link>
                </li>
                <li class="nav-item" @click="close_nav">
                    <router-link tag="div" to="/photo" class="menu-link">活動花絮</router-link>
                </li>
                <li class="nav-item" @click="close_nav()">
                    <router-link tag="div" to="/wizard_introduction" class="menu-link">嚮導簡介</router-link>
                </li>
                <li class="nav-item" @click="close_nav">
                    <router-link  tag="div" to="/Course" class="menu-link">嚮導課程</router-link>
                </li>
                <li class="nav-item" @click="close_nav();notOpen()">
                    <div class="menu-link" >導覽媒合</div>
                </li>
            </ul>
        </div>
      </nav>
    </div>
    <div class="logo">
      <router-link to="/index" style="cursor: pointer;"><img src="../../assets/logo.png"  /></router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      screenWidth:document.body.clientWidth,
      is_small:false
    };
  },
  watch: {
    screenWidth:function(n,o) {
      //判斷當前螢幕大小 
      if (n <= 989 && o > 989) {
        this.is_small = true;
      }else if(n > 989 && o <= 989){
        this.is_small = false;
      }
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
    if (this.screenWidth > 989) {
      this.is_small = false;
    }else{
      this.is_small = true;
    }
  },
  methods: {
    logout() {
      //登出
      this.$http.post(`${this.$GLOBAL.path}/api/logout`,'',{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
      .then(response=> {
        if ((status = 200)) {
          //呼叫上層組件登出方法
          this.$emit('logout');
          alert("已登出");
          //導向首頁
          this.$router.push('/index');
        }
      })
      .catch(error=> {
        console.log(error.response)
      });
    },
    close_nav:function() {
      //在點擊案鈕時 關閉下拉選單
      if (this.is_small) {
        this.$refs.navbar_toggler.click()
      }
    },
    notOpen:function() {
      //未開放
      alert("尚未開放")
    }
  },
};
</script>