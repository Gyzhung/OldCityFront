<template>
    <div>
        <!--eslint-disable-next-line-->
        <h1 width="100%">{{sessions?sessions[0].c_name:""}}</h1>
        <table class="search">
        <tr>
            <th>場次名稱 </th>
            <!-- <th>場次ID </th>
            <th>報名開始</th>
            <th>報名截止</th>
            <th>課程開始</th>
            <th>課程結束</th> -->
            <th></th>
        </tr>
        <tr :key="session.s_id" v-for="session in sessions">
            <td>{{session.session_name}}</td>
            <!-- <td><router-link :to="{name:'getUncheckSignUp',params:{s_id:ses.s_id}}">查詢報名審核名單 {{ses.s_id}}</router-link></td>
            <td>{{session.signUpTime_start}}</td>
            <td>{{session.signUpTime_end}}</td>
            <td>{{session.sessions_start}}</td>
            <td>{{session.sessions_end}}</td> -->
            <td>
            <router-link
                tag="button"
                :to="{name:'Session',params:{s_id:session.s_id}}"
            >{{sign}}{{session.Is_signUp}}</router-link>
            </td>
        </tr>
        </table>
    </div>
</template>
<script>
export default {
    mounted() {
        axios.get(`http://163.17.145.142/api/getBranchListBys_id`,{
              params:{
                s_id:1
              }}
            )
            .then(function(response) {
              console.log(response)
            })
            .catch(function(error) {
              console.log(error.response);
            });
    },
}
</script>