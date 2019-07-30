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
<style>
  @import url('../../assets/css/tooltip.css');
</style>

<template>
    <div class="content">
    <div class="form session">
      <div class="row">
        <div class="table-header col-lg-6">
          
          <div>我的報名</div>
        </div>
        <table class="table col-lg-10 col-md-10 col-sm-10 col-12">
            <thead>
                <tr>
                  <th>場次名稱</th>
                  <th>流程名稱</th>
                  <th>活動時間</th>
                  <th>報名狀態</th>
                </tr>
            </thead>
            <tbody>
                <router-link style="cursor: pointer;" tag="tr" v-tooltip="signup.c_name" :to="`/Branch_content/${signup.b_id}`"  v-for="signup in mysignup" :key="signup.su_id">
                  <td >{{signup.session_name}}</td>
                  <td>{{signup.title}}</td>
                  <td>{{eventTime(signup)}}</td>
                  <td>{{ResultTostring(signup.reviewResult)}}</td>
                  
                </router-link>
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
                    return "報名成功"
                    break;
                case 0:
                    return "待審核"
                    break;
                default:
                    break;
            }
        },
        eventTime:function (signup) {
          return `${signup.eventTime_start.substr(5,5)}~${signup.eventTime_end.substr(5,5)}`
        },
    },
}
</script>