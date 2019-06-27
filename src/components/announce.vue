
<style>
.annDetail {
  background-color: rgb(255, 238, 190);
  border: 2px burlywood;
  font-family: Microsoft JhengHei;
}

label {
  font-size: 34px;
  color: #94693f;
  font-weight: bold;
  font-family: Microsoft JhengHei;
}
.newsText {
  margin-top: 5px;
  margin-left: 10px;
  font-family: Microsoft JhengHei;
  font-size: 15px;
  border: 3px burlywood;
}
input {
  background: #dacfb8;
  border-radius: 5px;
  padding: 5px 15px;
}
input#search::-webkit-input-placeholder {
  color: #ffffff;
  font-family: Microsoft JhengHei;
}
</style>

<template>
  <div class="annDetail" align="center">
    <label>公告詳細</label>
    <table class="newsText" :annRes="annRes" border="1">
      <tr>
        <td width="150">標題</td>
        <td width="500" v-html="ann_title"></td>
      </tr>
      <tr>
        <td width="150">公告日期</td>
        <td width="500" v-html="created_at"></td>
      </tr>
      <tr>
        <td width="150">分類</td>
        <td width="500" v-html="typename"></td>
      </tr>
      <tr>
        <td width="150">公告內容</td>
        <td width="500" v-html="ann_content"></td>
      </tr>
      <tr>
        <td>
          <button class="onclk" @click="delann">刪除公告</button>
        </td>
        <td>
          <router-link
            tag="button"
            v-if="isShow"
            :to="{name:'editAnnounce',params:{announce_id:ann_id}}"
          >修改</router-link>
        </td>
      </tr>
    </table>
  </div>

  <!-- 8 -->
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
export default {
  props:["isShow"],
  data() {
    return {
      annRes: [],
      ann_id: this.$route.params.announce_id,
      typename:"",
      ann_title:"",
      ann_content:"",
      created_at:""
    };
  },
  mounted: function() {
    this.getann();
 
  },
  methods: {
    getann() {
      const self = this;
      axios
        .get(
          `http://163.17.145.142/api/getAnnounceData?ann_id=${
            this.ann_id
          }`
        )
        .then(function(response) {
          self.annRes = response.data;
          self.ann_id = response.data.ann_id;
          self.ann_title = response.data.title;
          self.ann_content = response.data.content;
          self.created_at = response.data.created_at;
          self.ann_type = response.data.ann_type;
          switch(self.ann_type){
            case 1:
              self.typename = "景點消息";
              break;
            case 2:
              self.typename = "活動消息";
              break;
            case 3:
              self.typename = "課程消息";
              break;
            case 4:
              self.typename = "媒合消息";
              break;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delann() {
      const self = this;
      axios
        .post(
          `http://163.17.145.142/api/deleteAnnounce?ann_id=${
            this.ann_id
          }`,
          {},
          {
            headers: {
              authorization: `Bearer ${global_.login_token}`
            }
          }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("刪除公告成功");
          }
        })
        .catch(function(error) {
          alert(response);
          alert("刪除公告失敗");
        });
    }
  }
};
</script>
