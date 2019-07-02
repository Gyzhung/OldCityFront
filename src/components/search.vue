<style scoped>
table.search {
  margin: 5% auto 5%;
  width: 70%;
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
  padding:10px;
  border-right: solid;
  border-width: 1px;
}
</style>

<template>
  <div>
    <table class="bar" border="0" align="center">
      <tr>
        搜尋: <input type="text" v-model="keyword.keystr" autocomplete="on">
        <button @click="search">搜尋</button>
      </tr>
    </table>
    <!--eslint-disable-next-line-->
    <table class="search">
      <tr>
        <th>課程名稱</th>
        <!-- <th>課程時長(小時)</th>
        <th>課程人數上限(人)</th> -->
        <th>課程簡介</th>
        <th>課程種類</th>
        <th>查看場次</th>
      </tr>
      <tr v-for="course in courses" :key="course.c_id">
        <td>{{ course.c_name }}</td>
        <!-- <td>{{ item.duration}}</td>
        <td>{{ item.maxNum}}</td> -->
        <td>{{ course.introduce }}</td>
        <td>{{ course.type }}</td>
        <td>
          <router-link :to="{name:'ShowSession',params:{c_id:course.c_id}}">查看場次</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
export default {
  props:['user'],
  data() {
    return {
      keyword: {
        keystr: "",
        time: ""
      },
      courses:[],
      getRes: [],
      userStatus: "",
      typename: "",
     
    };
  },
  mounted: function() {
    const self = this;
   
    axios
      .post(`http://163.17.145.142/api/searchCourse`, {
        keyword: `all:`
      })

      .then(function(response) {
        if ((status = 200)) {
          console.log(response.data)
          self.courses = response.data;
        }
      })
      .catch(function(error) {
        alert(response);
      });
  },
  methods: {
    search() {
      const self = this;

      axios
        .post(`http://163.17.145.142/api/searchCourse`, {
          keyword: `${this.keyword.keystr}`
        })
        .then(function(response) {
          if ((status = 200)) {
            self.courses = response.data;
          }
        })
        .catch(function(error) {
          alert(error.response.data[0]);
        });
    }
  }
};
</script>
