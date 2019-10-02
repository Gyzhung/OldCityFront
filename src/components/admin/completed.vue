<style scoped>
.content {
  background-color: #d6cab7;
  height: 100%;
  padding-bottom: 2rem;
}
.table {
  margin: 0 auto;
}
.table td{
  vertical-align: middle;
}
.table th{
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
.btn-lightbrown{
 margin-top: 2rem;
 font-weight: 600;
 letter-spacing: 2px;
}
.btn-enter{
  float: right;
  background-color: #784a45;
  color: #ffffff;
}
.btn-enter:hover{
  background-color: rgb(126, 98, 71);
  color: #ffffff;
}
.session{
  margin: 0 auto;
  width: 70%;
  min-height: 70vh;
}
.btn-blue{
  background-color: #60ABCB;
  color:#ffffff;
  font-weight: 700;
}
.btn-blue:hover{
  background-color: #4A869F;
  color: #ffffff;
}

</style>
<template>
    <div class="content">
        <div class="row justify-content-center" v-if="su_users.length!=0">
            <div class="table-header col-lg-6">點名系統 - {{su_users[0].title}}</div>
        </div>
        <div class="row justify-content-center mb-3" v-if="su_users.length!=0">
            <div class="col-lg-9 col-md-10 col-sm-10 col-12">
            <router-link tag="button" class="btn btn-warning" :to="{name:'Branch',params:{s_id:su_users[0].s_id}}">返回</router-link>
            </div>
        </div>
        <div class="row justify-content-center">
            <table class="table table-bordered col-lg-9 col-md-10 col-sm-10 col-12">
                <tbody>
                    <tr>
                        <th scope="row">#</th>
                        <th scope="row">姓名</th>
                        <th scope="row">帳號</th>
                        <th scope="row" width="25%">出席狀態</th>
                        <th width="10%">儲存</th>
                    </tr>
                    <tr :key="su_user.su_id" v-for="su_user in su_users">
                        <td>1</td>
                        <td>{{su_user.name}}</td>
                        <td>{{su_user.account}}</td>
                        <td>
                            <select class="form-control" v-model="completed_list_input[su_user.su_id]">
                                <option VALUE="-1" selected disabled>請選擇</option>
                                <option value="0">未出席</option>
                                <option value="2">有出席</option>
                                <option value="1">有出席但未通過</option>
                                <option value="3">有出席且有通過</option>
                            </select>
                        </td>
                        <td> 
                            <button type="button" class="btn btn-blue" @click="Completed(su_user)">
                                儲存
                            </button>
                        </td>
                    </tr>


                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    props:['user'],
    data() {
        return {
            su_users:[],
            completed_isopen:{},
            completed_list_input:{}
        }
    },
    watch: {
        user:function(n,o) {
            if (o == "") {
                this.getSu_usersData();
            }
        }
    },
    mounted() {
        if (this.$GLOBAL.login_token !='') {
          this.getSu_usersData();
         
        }
        
    },
    methods: {
        Completed_open:function(su_id) {
            this.completed_isopen[su_id] = true;
        },
        Completed:function(su_user) {
            if (this.completed_list_input[su_user.su_id] != -1) {
                const self = this;
                const data ={
                    completedDate : this.$GLOBAL.formatDate(new Date()),
                    su_id : su_user.su_id,
                    completeExtent : parseInt(this.completed_list_input[su_user.su_id])
                }
                this.$http.post(`${this.$GLOBAL.path}/api/updateCompleted`,data,{ headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
                .then(function(response) {
                    self.getSu_usersData();
                    alert(response.data);
                    
                })
                .catch(function(error) {
                    alert(error.response);
                });
            }else{
                alert("未選擇點名狀態")
            }      
        },
        completeExtent_tostring:function(completeExtent) {
            let str =''
            switch (completeExtent) {
                case 0:
                    str ='未出席'
                    break;
                case 1:
                    str ='有出席但未通過'
                    break;
                case 2:
                    str ='有出席'
                    break;
                case 3:
                    str ='有出席且有通過'
                    break;
                default:
                    break;
            }
            return str;
        },
        getSu_usersData:function() {
            const self = this;
            this.$http.get(`${this.$GLOBAL.path}/api/getCheckSignUpListByb_id`,
            {
                headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
                params:{ b_id:this.$route.params.b_id },
                
            })
            .then(function(response) {
                self.su_users = response.data;
                self.su_users.forEach(user => {
                    if (user.completed.length ==0) {
                        self.completed_list_input[user.su_id] = -1;
                        self.$set(self.completed_isopen, user.su_id, false);
                    }else{
                        self.completed_list_input[user.su_id] = user.completed[user.completed.length-1].completeExtent;
                        self.$set(self.completed_isopen, user.su_id, false);
                    }
                });
            })
            .catch(function(error) {
            });
        }
    },
    
}
</script>

