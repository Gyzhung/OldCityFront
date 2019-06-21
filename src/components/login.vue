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
  // updated() {
  //     this.getData();
  // },
  methods: {
    login() {
      const self = this;
      axios
        .post("http://oldcity.southeastasia.cloudapp.azure.com/api/login", {
          account: this.users.account,
          password: this.users.password
        })
        .then(function(response) {
          if ((status = 200)) {
            global_.login_token = response.data;
            console.log(typeof global_.login_token);
            console.log(global_.login_token);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
   
  }
};
</script>
