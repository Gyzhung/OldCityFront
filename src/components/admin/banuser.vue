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
          <div>已限制用戶</div>
        </div>
        <div class="col-lg-10 col-md-9 col-sm-6 col-10 mb-2" style="margin: 0 auto;" v-if="user.status ==4">
          <div style="float:left;">
            <router-link :to="{name:'userlist'}"  class="btn btn-danger" style="color:white;">限制</router-link>
          </div>
        </div>
        <table class="table col-lg-10 col-md-9 col-sm-6 col-10">
            <thead>
                <tr>
                  <th>用戶名稱</th>
                  <th>帳號</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="banuser in banusers" :key="banuser.su_id">
                  <td>{{banuser.name}}</td>
                  <td>{{banuser.account}}</td>
                  <td><button button class="btn btn-primary" @click="ban_user(banuser.account,banuser.is_ban)">解除</button></td>
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
            banusers:[]
        }
    },
    watch: {
        user:function(){
            this.getbanuser()
        }
    },
    mounted() {
        if (this.user != '') {
          this.getbanuser()
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
          self.getbanuser()
        }).catch(function(error) {
          console.log(error.response)
        });
      },
      getbanuser:function() {
        const self = this;
        this.$http.get(`${this.$GLOBAL.path}/api/getBanUserList`,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
        .then(function(response) {
            self.banusers = response.data
        }).catch(function(error) {
            console.log(error.response)
        });
      }
    },
}
</script>