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
      <td>
        <button @click="login">登入</button>
      </td>
    </tr>
  </table>
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
  methods: {
    login() {
      const self = this;
      axios
        .post(`http://localhost/api/login`, {
          account: this.users.account,
          password: this.users.password
        })
        .then(function(response) {
          if ((status = 200)) {
            global_.login_token = response.data;
            alert("登入成功");
            axios
              .get(`http://localhost/api/getMyData`, {
                headers: { authorization: `Bearer ${global_.login_token}` }
              })
              .then(function(response) {
                if (status == 200) {
                  global_.isLogin = false;
                } else {
                  global_.isLogin = true;
                  alert("dddd");
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
