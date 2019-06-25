<style>
.right {
  position: absolute;
  right: 30%;
  padding-top: 1%;
}
.header {
  background: url("../image/headerBg.png");
  width: 100%;
  height: 183px;
}
#logo {
  margin-top: 30px;
  margin-left: 30px;
}
.routelink {
  position: absolute;
  right: 0%;
  top: 100px;
  height: 83px;
  border: 0px;
  background-color: #d6cab7;
}
.btn {
  height: 83px;
  padding: 0px;
  background: none;
  border: 0px;
  outline: none;
}
.btn:hover {
  background-color: #94693f; /* Green */
}
.btn:before {
  background-color: rgba(182, 102, 12, 0.87);
}
</style>
<template>
  <div class="header">
    <table class="right" border="0">
      <tr>
        <router-link to="/register">註冊</router-link>
        <span>|</span>
        <router-link  to="/login">登入</router-link>
        <span>|</span>
        <router-link to="/searchCourse">搜尋</router-link>
        <span>|</span>
        <router-link  to="/addAnnounce">新增公告</router-link>
        <span>|</span>
        <router-link to="/searchAnnounce">搜尋公告</router-link>
        <span>|</span>
        <router-link to="/announce">公告</router-link>
        <span>|</span>
        <router-link to="/createCourse">建立</router-link>
      </tr>
    </table>
    <router-link to="/">
      <img id="logo" src="../image/LOGO.png" width="156px" height="116px">
    </router-link>
    <table class="routelink">
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
    </table>
  </div>
</template>
<script>
import global_ from "@/components/Global/global";
export default{
  data(){
  
      // show:global_.isShow
  }
}
</script>