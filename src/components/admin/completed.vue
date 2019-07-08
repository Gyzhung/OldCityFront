<style scoped>
.search {
    margin: auto auto;
    width: 60%;
}
table{
    border: solid;
    padding: 15px;
    border-width: 5px;
}
.bar {
  text-align: center;
  margin: 5% auto 5%;
}
.search th {
  background-color: gray;
  color: white;
}
.search tr {
  border: solid;
  border-width: 3px;
}
td {
  border-right: solid;
  border-width: 1px;
  padding: 10px;
}
h1 {
  margin: auto 5%;
  margin-top: 5%;
  margin-bottom: 2%;
}
@media (max-width: 1250px) {
    table.search {
        width: 90%;
    }
}


</style>
<template>
    <div class="content">
        <div style="min-height: 80vh;margin-top:50px;">
            <!--eslint-disable-next-line-->
            <!-- <h1 width="100%">{{sessions?sessions[0].c_name:""}}</h1> -->
            <div class="search">
                <!-- <div class="text-right mb-2 mr-2">
                    <button class="btn btn-success" @click="Completed_all">
                        全部儲存
                    </button>
                </div> -->
                <table >
                    <tr>
                        <th width="15%">帳號</th>
                        <th width="10%">姓名</th>
                        <th>場次</th>
                        <th></th>
                    </tr>
                    <tr :key="su_user.su_id" v-for="su_user in su_users">
                        <td>{{su_user.account}}</td>
                        <td>{{su_user.name}}</td>
                        <td>{{su_user.title}}</td>
                        <td v-if="user.status == 4">
                            <div class="form-inline">
                                <div class="form-group">
                                    <div v-if="completed_isopen[su_user.su_id] == true">
                                        <select class="form-control mr-2" v-model="completed_list_input[su_user.su_id]" @change="select_change(su_user)">
                                            <option VALUE="-1" selected disabled>請選擇</option>
                                            <option value="0">未出席</option>
                                            <option value="2">有出席</option>
                                            <option value="1">有出席但未通過</option>
                                            <option value="3">有出席且有通過</option>
                                        </select>
                                        <button v-if="completed_list[su_user.su_id] != -1" class="btn btn-success mr-2" @click="Completed(su_user)">
                                            儲存
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button v-if="su_user.completed.length != 1" class="btn btn-primary" @click="Completed_open(su_user.su_id)">
                                            點名
                                        </button>
                                        <div v-else>
                                            已點名-{{completeExtent_tostring(su_user.completed[0].completeExtent)}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </td>
                        
                    </tr>
                </table>
            </div>
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
            completed_list:{},
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
        select_change:function(su_user) {
            this.$set(this.completed_list, su_user.su_id, this.completed_list_input[su_user.su_id])
        },
        Completed_open:function(su_id) {
            this.completed_isopen[su_id] = true;
        },
        Completed:function(su_user) {
            const self = this;
            if (su_user.completed.length == 0) {
                if (this.completed_list[su_user.su_id] != -1) {
                const data ={
                    completedDate : this.$GLOBAL.formatDate(new Date()),
                    su_id : su_user.su_id,
                    completeExtent : parseInt(this.completed_list[su_user.su_id])
                }
                this.$http.post(`http://163.17.145.142/api/updateCompleted`,data,{ headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
                .then(function(response) {
                    self.getSu_usersData();
                    alert(response.data);
                })
                .catch(function(error) {
                });
                }
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
        }
    },
    getSu_usersData:function() {
        const self = this;
        this.$http.get(`http://163.17.145.142/api/getCheckSignUpListByb_id`,
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
                    self.$set(self.completed_list, user.su_id, -1)
                }else{
                    self.completed_list_input[user.su_id] = -1;
                    self.$set(self.completed_isopen, user.su_id, false);
                    self.$set(self.completed_list, user.su_id, -1)
                }
                
            });
        })
        .catch(function(error) {
        });
    }
}
</script>

