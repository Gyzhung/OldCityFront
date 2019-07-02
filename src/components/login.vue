<style scoped>
  #profile{
    float:right;
    background-color: rgba(240, 231, 208, 0.938);
    border:2px burlywood; 
  }
  .profilebutton{
    float:left;
    background-color: rgb(255, 255, 255);
    
    padding: bottom 85px;
  }
  label{
    font-size: 34px;
    color: #94693F;
    font-weight:bold;
    font-family: Microsoft JhengHei;

  }
  .profilebutton label{
    padding-bottom:  55px;
    margin-left: 50px;
    margin-top: 50px;
  }
  .profilebutton img{
    padding-bottom:  55px;
  }
  .search{
    padding-right: 50px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .newsText{
    margin-top: 5px;
    margin-left: 10px;
    font-family: Microsoft JhengHei;
    font-size: 15px;
    border:3px burlywood;
  }
  p{
    font-family: Microsoft JhengHei;
    font-size: 18px;
    color:#94693F;
    font-weight:bold;
  }
</style>

<template>
  <div>
    <div class="container">        
        <div id ="profile" class="col-lg-12 col-xs-12" align="center" >
          <label >會員登入</label>
        <div class="profileDetail">
          <br>
          <p>會員帳號:</p>
          <input id="account"  v-model="users.account" type="text" >
          
          <p>會員密碼:</p>
          <input id="password" v-model="users.password" type="password">
          <br><br>
          <button type="button" class="btn btn-light" >註冊會員</button>
          <button type="button" @click="login" class="btn btn-primary">登入</button>
          </div>
        </div><!-- 8 -->
      </div>
    <div style="clear:both;"></div><!--這是用來清除上方的浮動效果-->
  </div>
</template>


<script>
import axios from "axios";
import global_ from "@/components/Global/global";

export default {
  data() {
    return {
      users: {
        account: "",
        password: ""
      }
    };
  },
  computed: {},
  // updated() {
  //     this.getData();
  // },
  methods: {
    login() {
      const self = this;
      axios
        .post("http://163.17.145.142/api/login", {
          account: this.users.account,
          password: this.users.password
        })
        .then(function(response) {
          if ((status = 200)) {
            global_.setCookie('login_token',response.data,1);
            global_.login_token = response.data;
            axios
              .get(
                `http://163.17.145.142/api/getMyData`,
                {
                  headers: { authorization: `Bearer ${global_.login_token}` }
                }
              )
              .then(function(response) {
                if (status == 200) {
                  global_.status = response.data.status;
                  alert("已登入");
                  self.$emit("login",response.data);//使用外層方法
                  self.$router.push({ path: `/index` });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
