<style scoped>
.b_content {
  background-color: #d6cab7;
  height: 100%;
  padding-bottom: 2rem;
}
.table {
  margin: 0 auto;
}
.table-header {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #784a45;
  font-size: 25px;
  font-weight: 700;
}
.btn-lightbrown{
    margin-top: 2rem;
    font-weight: 600;
    letter-spacing: 2px;
}
</style>

<template>
    <div class="content">
        <div class="b_content">
            <div class="form course">
                <div class="container-fluid">
                    <div class="row">
                        <div class="table-header col-lg-6">課程詳細</div>           
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row justify-content-center mb-3">
                        <div class="col-lg-9 col-md-9 col-sm-6 col-10 ">
                            <router-link tag="button"  v-if="user.status == 4" class="btn btn-primary" :to="{name:'editbranch',params:{b_id:b_id}}">修改</router-link>
                            <div style="float:right;" v-if="Branch != ''">
                                <router-link tag="button"  class="btn btn-warning" :to="{name:'Branch',params:{s_id:Branch.s_id}}">返回</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row">
                        <table class="table table-bordered col-lg-9 col-md-9 col-sm-6 col-10">
                            <tbody>
                                <tr>
                                    <th scope="row">標題</th>
                                    <td colspan="3">{{Branch.title}}</td>
                                </tr>
                                <tr>
                                    <th width="20%" scope="row">報名日期(起)</th>
                                    <td width="30%">{{Branch.signUpTime_start}}</td>
                                    <th width="20%" scope="row">報名日期(訖)</th>
                                    <td width="30%">{{Branch.signUpTime_end}}</td>
                                </tr>
                                <tr>
                                    <th width="20%" scope="row">活動日期(起)</th>
                                    <td width="30%">{{Branch.eventTime_start}}</td>
                                    <th width="20%" scope="row">活動日期(訖)</th>
                                    <td width="30%">{{Branch.eventTime_end}}</td>
                                </tr>
                                <tr>
                                    <th scope="row">活動地點</th>
                                    <td colspan="3">{{Branch.eventPlace}}</td>
                                </tr>
                                <tr>
                                    <th width="20%" scope="row">人數上限</th>
                                    <td width="30%">{{Branch.maxNum}}</td>
                                    <th width="20%" scope="row">已報名人數</th>
                                    <td width="30%">{{SignUpCount}}</td>
                                </tr>
                                <tr>
                                    <th scope="row">場次簡介</th>
                                    <td colspan="3" v-html="Branch.content"></td>
                                </tr>
                                <tr>
                                    <th scope="row">課程流程</th>
                                    <td colspan="3">
                                        <div v-for="schedule in Branch.branch_schedule" :key="schedule.bs_id">
                                            <span v-if="editschedule.filter(a=>a.bs_id == schedule.bs_id)[0].value == false">
                                                {{schedule.period}}-{{schedule.event}}
                                                <button @click="openeditbranch_schedule(schedule.bs_id)" v-if="user.status == 4" class="btn btn-warning mb-2">修改</button>
                                            </span>
                                            <span v-else>
                                                <input type="text" v-model="schedule.period"><input v-model="schedule.event" type="text">
                                                <button @click="savebranch_schedule(schedule.bs_id)" v-if="user.status == 4" class="btn btn-primary mb-2">儲存</button>
                                            </span>

                                            
                                            <button @click="delbranch_schedule(schedule.bs_id)" v-if="user.status == 4" class="btn btn-danger mb-2">刪除</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="offset-lg-5 offset-md-4 offset-sm-4 offset-xs-4 offset-4">
                            <button type="button" @click="addSignUp" class="btn btn-lightbrown">報名活動/課程</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["user"],
    data() {
        return {
            Branch:'',
            b_id:this.$route.params.b_id,
            SignUpCount:0,
            editschedule:[]
        }
        
    },
    mounted() {
       this.getsignup();
    },
    methods: {
        getsignup:function () {
             const self = this;
            this.$http.get(`${this.$GLOBAL.path}/api/getBranchData`,{
                params:{
                    b_id:this.$route.params.b_id
                }}
            )
            .then(function(response) {
                self.Branch = response.data[0];
                self.Branch.branch_schedule.forEach(element => {
                    self.editschedule.push({bs_id:element.bs_id,value:false})
                });
            })
            .catch(function(error) {
            });
            this.$http.get(`${this.$GLOBAL.path}/api/getSignUpCountByb_id`,{
                params:{
                    b_id:this.$route.params.b_id
                }}
            )
            .then(function(response) {
                self.SignUpCount = response.data;
            })
            .catch(function(error) {
            });
            
        },
        addSignUp:function() {
            const data = {
                b_id : this.$route.params.b_id
            }
            const self = this;
            this.$http.post(`${this.$GLOBAL.path}/api/addSignUp`,data,
                {
                    headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }
                }
            )
            .then(function(response) {
                alert("報名成功")
            })
            .catch(function(error) {
                alert(error.response.data);
            });
        },
        delbranch_schedule:function(bs_id) {
            if (confirm("刪除計畫?")) {
                const self = this;
                const data = {
                    bs_id:bs_id
                }
                this.$http.post(`${this.$GLOBAL.path}/api/deleteBranchSchedule`,data,
                    {
                        headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }
                    }
                )
                .then(function(response) {
                    alert(response.data)
                    self.getsignup();
                })
                .catch(function(error) {
                    alert(error.response.data);
                });
            }
            
        },
        openeditbranch_schedule:function(bs_id) {
            const index = this.editschedule.map(a=>a.bs_id).indexOf(bs_id);
            this.editschedule[index].value = true
        },
        savebranch_schedule:function(bs_id) {
            //加入 修改api







            const index = this.editschedule.map(a=>a.bs_id).indexOf(bs_id);
            this.editschedule[index].value = false
        },
        //新增
    },
}
</script>