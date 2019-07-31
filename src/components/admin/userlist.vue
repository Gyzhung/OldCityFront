<style scoped>
.content {
  background-color: #d6cab7;
  height: 100%;
  padding-bottom: 2rem;
}
.table {
  margin: 0 auto;
}
.table td {
  vertical-align: middle;
}
.table th {
  vertical-align: middle;
}
.table-header {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
}
.btn-lightbrown {
  font-weight: 600;
  letter-spacing: 2px;
}
.btn-enter {
  float: right;
  background-color: #784a45;
  color: #ffffff;
}
.btn-enter:hover {
  background-color: rgb(126, 98, 71);
  color: #ffffff;
}
.session {
  margin: 0 auto;
  width: 90%;
  min-height: 70vh;
}
</style>
<template>
    <div class="content">
    <div class="form session">
      <div class="row">
        <div class="table-header col-lg-6">
          <div>查詢用戶</div>
        </div>
        <div class="col-lg-10 col-md-9 col-sm-6 col-10 mb-2" style="margin: 0 auto;" v-if="user.status ==4">
          <div style="float:right;">
            <input type="text" v-model="keyword">
            <button class="btn btn-success" style="color:white;" @click="search">搜尋</button>
          </div>
        </div>
        <table class="table col-lg-10 col-md-9 col-sm-6 col-10">
            <thead>
                <tr>
                  <th>用戶名稱</th>
                  <th>帳號</th>
                  <th width="25%"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.u_id">
                  <td>{{user.account}}</td>
                  <td>{{user.name}}</td>
                  <td>
                    <router-link tag="button"  class="btn btn-primary" :to="`userdetail/${user.account}`">查看</router-link>
                    <button v-if="user.is_ban == 1" class="btn btn-warning" @click="ban_user(user.account,user.is_ban)">解除</button>
                    <button v-else class="btn btn-danger" @click="ban_user(user.account,user.is_ban)">限制</button>
                  </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:["user"],
    data() {
        return {
            users:[],
            keyword:''
        }
    },
    watch: {
        user:function(){
            this.getuserlist("all:")
            
        }
    },
    mounted() {
        if (this.user != '') {
          this.getuserlist("all:");
        }
    },
    methods: {
        ban_user:function(account,is_ban) {
          const self = this;
          const data ={
            review_account:account,
            reviewResult:!is_ban
          }
          this.$http.post(`${this.$GLOBAL.path}/api/reviewUser`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
          .then(function(response) {
            self.getuserlist("all:");
          }).catch(function(error) {
              console.log(error.response)
          });
        },
        getuserlist:function (keyword) {
          const self = this;
          const data ={
            keyword:keyword
          }
          this.$http.post(`${this.$GLOBAL.path}/api/searchUser`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
          .then(function(response) {
              self.users = response.data
          }).catch(function(error) {
              alert(error.response.data[0])
          });
        },
        search:function() {
          const self = this;
          let data;
          if (this.keyword == "") {
            data ={
              keyword:"all:"
            }
          }else{
            data ={
              keyword:this.keyword
            }
          }
          this.$http.post(`${this.$GLOBAL.path}/api/searchUser`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
          .then(function(response) {
              self.users = response.data
          }).catch(function(error) {
              alert(error.response.data[0])
          });
        }
    },
}
</script>