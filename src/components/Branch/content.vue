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
                <div class="table-header col-lg-6">課程詳細</div>
                <table class="table table-bordered col-lg-9 col-md-9 col-sm-6 col-10">
                    <tbody>
                        <tr>
                            <th scope="row">標題</th>
                            <td colspan="3">{{Branch.title}}</td>
                        </tr>
                        <tr>
                            <th width="15%" scope="row">報名日期(起)</th>
                            <td width="35%">{{Branch.signUpTime_start}}</td>
                            <th width="15%" scope="row">報名日期(訖)</th>
                            <td width="35%">{{Branch.signUpTime_end}}</td>
                        </tr>
                        <!-- <tr>
                            <th scope="row">系列課程總時長(小時)</th>
                            <td colspan="3">18</td>
                        </tr> -->
                        <tr>
                            <th scope="row">人數上限</th>
                            <td colspan="3">{{Branch.maxNum}}</td>
                        </tr>
                        <tr>
                            <th scope="row">場次簡介</th>
                            <td colspan="3"><p>{{Branch.content}}</p></td>
                        </tr>
                        <tr>
                            <th scope="row">課程流程</th>
                            <td colspan="3">
                                <div v-for="schedule in Branch.branch_schedule" :key="schedule.bs_id">
                                    {{schedule.period}}-{{schedule.event}}
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div class="offset-lg-5 offset-md-4 offset-sm-4 offset-xs-4 offset-4">
                    <button type="button" @click="addSignUp" class="btn btn-lightbrown">報名活動/課程</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Branch:[]
        }
    },
    mounted() {
        const self = this;
        this.$http.get(`http://163.17.145.142/api/getBranchData`,{
            params:{
                b_id:this.$route.params.b_id
            }}
        )
        .then(function(response) {
            self.Branch = response.data[0];
        })
        .catch(function(error) {
        });

       
        
    },
    methods: {
        addSignUp:function() {
            const data = {
                b_id : this.$route.params.b_id
            }
            const self = this;
            this.$http.post(`http://163.17.145.142/api/addSignUp`,data,
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
            // this.$http.get(`http://163.17.145.142/api/get_L_BranchListBys_id`,
            //     {
            //         headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
            //         params:{ s_id:1 }
            //     }
            // )
            // .then(function(response) {
                
            //     console.log(response)
            // })
            // .catch(function(error) {
            //     console.log(error.response);
            // }); 
        }
    },
}
</script>