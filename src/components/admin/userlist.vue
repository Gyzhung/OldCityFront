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
          <div style="float:left;">
            註冊人數 : {{usercount}}
          </div>
          <div style="float:right;">
            <input type="text" v-model="keyword">
            <button class="btn btn-success" style="color:white;" @click="search">搜尋</button>
          </div>
        </div>
        <table class="table col-lg-10 col-md-9 col-sm-6 col-10">
            <thead>
                <tr>
                  <th>帳號</th>
                  <th>用戶名稱</th>
                  <th></th>
                  <th width="25%"></th>                  
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.u_id">
                  <td>{{user.account}}</td>
                  <td>{{user.name}}</td>
                  <td>{{statusToString(user.status)}}</td>
                  <td>
                    <router-link tag="button"  class="btn btn-primary" :to="`userdetail/${user.account}`">查看</router-link>
                    <button v-if="user.is_ban == 1" class="btn btn-warning" disabled>已限制</button>
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
            keyword:'',
            usercount:0
        }
    },
    watch: {
        user:function(){
            this.getuserlist()
            
        }
    },
    mounted() {
        if (this.user != '') {
          this.getuserlist();
        }
    },
    methods: {
        ban_user:function(account,is_ban) {
          const banRemark = prompt("請輸入限制理由")
          let data ={
              review_account:account,
              reviewResult:!is_ban,
            }
          if (banRemark != "") {
            data["banRemark"] = banRemark
          }
          
          this.$http.post(`${this.$GLOBAL.path}/api/reviewUser`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
          .then( response => {
            this.getuserlist();
          }).catch(function(error) {
            alert(error.response)
              //console.log(error.response)
          });
        },
        getuserlist:function () {
          this.$http.get(`${this.$GLOBAL.path}/api/getAllUser`,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
          .then(response => {
              this.users = response.data
              this.usercount = this.users.length
          }).catch(function(error) {
              alert(error.response.data[0])
          });
        },
        search:function() {
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
          .then(response=> {
              this.users = response.data
          }).catch(function(error) {
              alert(error.response.data[0])
          });
        },
        statusToString:function (status) {
          switch (status) {
            case 0:
              return "未驗證"
              break;
            case 1:
              return "會員(學員)"
              break;
            case 2:
              return "導覽員"
              break;
            case 3:
              return "工讀生"
              break;
            case 4:
              return "系統管理員"
              break;
            default:
              break;
          }
        }
    },
}
</script>