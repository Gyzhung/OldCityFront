
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
    
    .profileDetail input{
      margin-top: 5px;
      margin-bottom: 10px;
    }
    .profileDetail select{
      margin-top: 5px;
      margin-bottom: 10px;
    }
</style>


<template>
  <div>
    <div class="container">
      <div id ="profile" class="col-lg-12 col-xs-12" align="center" >
        <label >會員註冊</label>
      <div class="profileDetail" >
        <br>
        <p>會員帳號:</p>
        <input id="account" v-model="users.account"  type="text" >
        <p>會員密碼:</p>
        <input id="password" v-model="users.password" type="password">
        <p>使用者名稱:</p>
        <input id="name" v-model="users.name" type="text">
        <p>身分證號碼:</p>
        <input id="identity_num"  v-model="users.identity_num" type="text">
        <p>性別:</p>
        <select name="select_option" v-model="users.gender">
          <option value="0">女</option>
          <option value="1">男</option>
          <option value="2">其他</option>
        </select>
        <p>通訊地址:</p>
        <input id="address" v-model="users.address" type="text">
        <p>家用電話:</p>
        <input id="tel" v-model="users.tel" type="tel">
        <p>行動電話:</p>
        <input id="cel" v-model="users.cel" type="cel">
        <p>Email:</p>
        <input id="email" v-model="users.email" type="email">
        <p>生日:</p>
        <input id="birthday" v-model="users.birthday" type="date">
        <br><br>
        <button type="button" @click="register" class="btn btn-primary">確認註冊</button>
        
        </div>
      </div><!-- 8 -->
    </div>
    <div style="clear:both;"></div><!--這是用來清除上方的浮動效果-->

 
      <!-- <td>
        <p>簡單自介:</p>
        <textarea type="text" :status="users.selfIntroduction" v-model="users.selfIntroduction"></textarea>
      </td> -->
    <!-- <tr>
      <td>
        <h2>有無以下志工經驗?</h2>
        <br>第二市場
        <input
          type="checkbox"
          :is_secondMarket="users.is_secondMarket"
          v-model="users.is_secondMarket"
          value="true"
        >
        <br>台灣文學館
        <input
          type="checkbox"
          :is_NMoTL="users.is_NMoTL"
          v-model="users.is_NMoTL"
          value="true"
        >
        <br>文資園區
        <input type="checkbox" :is_MoC="users.is_MoC" v-model="users.is_MoC" value="true">
        <br>
        <br>
      </td>
    </tr> -->
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
export default {
  name: "HelloWorld",

  data() {
    return {
      users: {
        account: "",
        password: "",
        identity_num: "",
        name: "",
        address: "",
        gender: "",
        tel: "",
        cel:"",
        email: "",
        // profile_pic:"",
        birthday: "",
        tokenStr: "",
        status: "",
        selfIntroduction: "",
        is_secondMarket: false,
        is_NMoTL: false,
        is_MoC: false
        // other:""
      }
    };
  },
  methods: {
    register() {
      const self = this;
      axios 
        .post(`http://163.17.145.142/api/register`, {
          account: this.users.account,
          password: this.users.password,
          identity_num: this.users.identity_num,
          name: this.users.name,
          gender: this.users.gender,
          tel: this.users.tel,
          cel:this.users.cel,
          email: this.users.email,
          birthday: this.users.birthday,
          status: this.users.status,
  
        })
        .then(function(response) {
          if ((status = 200)) {
            alert("成功註冊");
            self.$router.push({ path: `/index` });
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
