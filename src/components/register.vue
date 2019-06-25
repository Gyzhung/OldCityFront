
<style scoped>
textarea{
  overflow-y: scroll;
  width:600px ;
}
</style>


<template>
  <table border="0" align="center">
    <tr>
      <td>
        帳號:
        <input type="text" :name="users.account" v-model="users.account" autocomplete="on">
      </td>
      <td>
        密碼:
        <input type="password" :password="users.password" v-model="users.password">
      </td>
    </tr>
    <tr>
      <td>
        身分證字號:
        <input type="text" :identity_num="users.identity_num" v-model="users.identity_num">
      </td>
      <td>
        名字:
        <input type="text" :name="users.name" v-model="users.name">
      </td>
    </tr>
    <tr>
      <td>
        聯絡地址:
        <input type="text" :address="users.address" v-model="users.address">
      </td>
      <td>
        性別:
        <select name="select_option" :gender="users.gender" v-model="users.gender">
            <option :gender="users.gender" value="0">男</option>
            <option :gender="users.gender" value="1">女</option>
            <option :gender="users.gender" value="2">不顯示</option>
          </select>
      </td>
    </tr>
    <tr>
      <td>
        手機電話:
        <input type="text" :tel="users.tel" v-model="users.tel">
      </td>
      <td>
        電子信箱:
        <input type="text" :email="users.email" v-model="users.email">
      </td>
    </tr>
    <tr>
      <td>
        生日:
        <input type="datetime" :birthday="users.birthday" v-model="users.birthday">
      </td>
      <td>
        <p>簡單自介:</p>
        <textarea type="text" :status="users.selfIntroduction" v-model="users.selfIntroduction"></textarea>
      </td>
    </tr>
    <tr>
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
    </tr>

    <button @click="sendPost">註冊</button>
  </table>
</template>

<script>
import axios from "axios";
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
    sendPost() {
      axios
        .post(`http://163.17.145.142/api/register`, {
          account: this.users.account,
          password: this.users.password,
          identity_num: this.users.identity_num,
          name: this.users.name,
          address: this.users.address,
          gender: this.users.gender,
          tel: this.users.tel,
          email: this.users.email,
          birthday: this.users.birthday,
          status: this.users.status,
          selfIntroduction: this.users.selfIntroduction,
          is_secondMarket: this.users.is_secondMarket,
          is_NMoTL: this.users.is_NMoTL,
          is_MoC: this.users.is_MoC
        })
        .then(function(response) {
          if ((status = 200)) {
            alert("成功註冊");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
