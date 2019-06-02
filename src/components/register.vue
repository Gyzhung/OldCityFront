


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
        <input type="text" :gender="users.gender" v-model="users.gender">
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
    </tr>
    <tr>
      <td>
        status:
        <input type="datetime" :status="users.status" v-model="users.status">
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
        birthday: "",
        tokenStr: "",
        status:""
      }
    };
  },
  methods: {
    sendPost() {
      axios.post(`http://localhost/api/register`, {
          account: this.users.account,
          password: this.users.password,
          identity_num: this.users.identity_num,
          name: this.users.name,
          address: this.users.address,
          gender: this.users.gender,
          tel: this.users.tel,
          email: this.users.email,
          birthday: this.users.birthday,
          status:this.users.status
        })
        .then(function(response) {
          alert("okok")
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
