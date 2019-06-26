<style>
table.search {
  text-align: center;
  margin: 5%  auto 5%;
 
  width:70%;
  
}
.bar{
    text-align: center;
  margin: 5%  auto 5%;
}
.search td {
  text-align: center;
  border: solid;
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
      <table class="search" :key="item.ann_id" v-for="item in getRes">
        <tr>
          <td>公告id:{{ item.ann_id }}</td>
          <td>公告標題:{{ item.ann_title }}</td>
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
        `http://oldcity.southeastasia.cloudapp.azure.com/api/searchAnnounce`,
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
        console.log(error);
        alert(response);
      });
  },
  methods: {
    search() {
      console.log(this.keystr.keyword);

      const self = this;
      axios
        .post(
          `http://oldcity.southeastasia.cloudapp.azure.com/api/searchAnnounce`,
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
          console.log(error);
          alert(response);
        });
    }
  }
};
</script>
