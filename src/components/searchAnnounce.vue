<style scope>
table.search {
  margin: 5%  auto 5%;
  width:70%;
   border: solid;
  border-width: 5px;
  
}
.bar{
    text-align: center;
  margin: 5%  auto 5%;
}
.search th{
  background-color:gray;
  color:white;
}
.search tr{
  border: solid;
  border-width: 3px;
}
.saerch tr td{
  border-right: solid;
  border-width: 1px;
}

</style>

<template>
  <div class="container">
    
      <table class="bar" border="0" >
        <tr>
          <td>
            搜尋公告:
            <input
              type="text"
              :keyword="keystr.keyword"
              v-model="keystr.keyword"
              autocomplete="on"
            >
          </td>
          <button @click="search">搜尋</button>
        </tr>
      </table>
      <!--eslint-disable-next-line-->

      <table class="search">
        <tr>
          <th>公告id</th>
          <th>公告標題</th>
          <th>詳細</th>
        </tr>
        <tr  :key="item.ann_id" v-for="item in getRes">
          <td>{{ item.ann_id }}</td>
          <td>{{ item.title }}</td>
          <td><router-link :to="{name:'Announce',params:{announce_id:item.ann_id}}">詳細公告</router-link></td>
        </tr>
      </table>
    </div>
 
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      keystr: {
        keyword: ""
      },
      getRes: [],
      msg: ""
    };
  },
  mounted: function() {
    const self = this;
    axios
      .post(
        `http://163.17.145.142/api/searchAnnounce`,
        {
          keyword: `all:`
        }
      )

      .then(function(response) {
        if ((status = 200)) {
          self.getRes = response.data;
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
        .post(
          `http://163.17.145.142/api/searchAnnounce`,
          {
            keyword: `${this.keystr.keyword}`
          }
        )

        .then(function(response) {
          if ((status = 200)) {
            self.getRes = response.data;
          }
        })
        .catch(function(error) {
          alert(response);
        });
    }
  }
};
</script>
