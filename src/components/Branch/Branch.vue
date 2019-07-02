<style scoped>
table.search {
  margin: auto auto;
  width: 60%;
  border: solid;
  border-width: 5px;
  padding: 15px;
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
</style>

<template>
    <div>
        <!--eslint-disable-next-line-->
        <!-- <h1 width="100%">{{sessions?sessions[0].c_name:""}}</h1> -->
        <table class="search">
        <tr>
            <th>流程名稱 </th>
            <th>報名開始</th>
            <th>報名截止</th>
            <th></th>
            <th v-if="user.status == 4"></th>
        </tr>
        <tr :key="Branch.b_id" v-for="Branch in Branches">
            <td>{{Branch.title}}</td>
            <td>{{Branch.signUpTime_start}}</td>
            <td>{{Branch.signUpTime_end}}</td>
            <td>
              <router-link tag="button" :to="{name:'Branch_content',params:{b_id:Branch.b_id}}" >
                查看
              </router-link>
            </td>
            <td v-if="user.status == 4">
              <router-link tag="button" :to="{name:'checkSignUp',params:{b_id:Branch.b_id}}" >
                審核
              </router-link>
            </td>
            
        </tr>
        </table>
    </div>
</template>
<script>
export default {
  props:['user'],
  data() {
    return {
      Branches:[]
    }
  },
  mounted() {
    const self = this;
    this.$http.get(`http://163.17.145.142/api/getBranchListBys_id`,{
      params:{
        s_id:self.$route.params.s_id
      }}
    )
    .then(function(response) {
      self.Branches = response.data;
      console.log(response)
    })
    .catch(function(error) {
      console.log(error.response);
    });
    
  },
  methods: {
    
  },
}
</script>