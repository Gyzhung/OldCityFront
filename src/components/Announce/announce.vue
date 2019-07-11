
<style scoped>
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
    <table class="newsText" border="1">
      <tr>
        <td width="150">標題</td>
        <td width="500">{{Announce.title}}</td>
      </tr>
      <tr>
        <td width="150">公告日期</td>
        <td width="500">{{Announce.created_at}}</td>
      </tr>
      <tr>
        <td width="150">分類</td>
        <td width="500" >{{typeToString(Announce.ann_type)}}</td>
      </tr>
      <tr>
        <td width="150">公告內容</td>
        <td width="500" v-html="Announce.content"></td>
      </tr>
      <tr v-if="user.status == 4">
        <td>
          <button class="onclk" @click="delann">刪除公告</button>
        </td>
        <td>
          <router-link
            tag="button"
            :to="{name:'editAnnounce',params:{announce_id:ann_id}}"
          >修改</router-link>
        </td>
      </tr>
    </table>
  </div>

  <!-- 8 -->
</template>

<script>
export default {
  props:['user'],
  data() {
    return {
      Announce: [],
      ann_id: this.$route.params.announce_id,
    };
  },
  mounted: function() {
    this.getann();
 
  },
  methods: {
    getann() {
      const self = this;
      this.$http.get(`${this.$GLOBAL.path}/api/getAnnounceData?ann_id=${this.ann_id }` )
      .then(function(response) {
        self.Announce = response.data;        
      })
      .catch(function(error) {
      });
    },
    delann() {
      const self = this;
      this.$http.post(`${this.$GLOBAL.path}/api/deleteAnnounce?ann_id=${this.ann_id}`,{},
        {
          headers: {
            authorization: `Bearer ${this.$GLOBAL.login_token}`
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
    },
    typeToString:function(type) {
      switch(type){
        case 1:
          return "活動消息";
          break;
        case 2:
          return "景點消息";
          break;
        case 3:
          return "課程消息";
          break;
        case 4:
          return "媒合消息";
          break;
      }
    }
  }
};
</script>
