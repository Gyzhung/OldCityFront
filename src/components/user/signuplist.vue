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
          
          <div>我的報名</div>
        </div>
        <table class="table col-lg-10 col-md-9 col-sm-6 col-10">
            <thead>
                <tr>
                  <th>課程名稱</th>
                  <th>場次名稱</th>
                  <th>流程名稱</th>
                  <th>審核狀態</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="signup in mysignup" :key="signup.su_id">
                  <td>{{signup.c_name}}</td>
                  <td>{{signup.session_name}}</td>
                  <td>{{signup.title}}</td>
                  <td>{{ResultTostring(signup.reviewResult)}}</td>
                  
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
            mysignup:[]
        }
    },
    watch: {
        user:function(){
            const self = this;
            this.$http.get(`${this.$GLOBAL.path}/api/getMyBranchList`,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
            .then(function(response) {
                self.mysignup = response.data;
            
            }).catch(function(error) {
                console.log(error.response)
            });
        }
    },
    mounted() {
        if (this.user != '') {
            const self = this;
            this.$http.get(`${this.$GLOBAL.path}/api/getMyBranchList`,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
            .then(function(response) {
                self.mysignup = response.data;
            
            }).catch(function(error) {
                console.log(error.response)
            });
        }
    },
    methods: {
        ResultTostring:function (Result) {
            switch (Result) {
                case 1:
                    return "已審核"
                    break;
                case 0:
                    return "待審核"
                    break;
                default:
                    break;
            }
        }
    },
}
</script>