
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
.ann_content img{
  width: 100%;
}
img{
  max-width:100% !important;
}
</style>
<style>
img{
  max-width:100% !important;
}
.col_b_left_top{
  border-style:solid;
}
.col_b_left{
  border-right-style:solid;
  border-bottom-style:solid;
  border-left-style:solid;
}
.col_b_right_top{
  border-right-style:solid;
  border-bottom-style:solid;
  border-top-style:solid;
}
.col_b_right{
  border-right-style:solid;
  border-bottom-style:solid;
}
</style>

<template>
  <div class="annDetail" align="center">
    <label>公告詳細</label>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-1 text-left col_b_left_top pb-2"> 
          <span>標題</span>
        </div>
        <div class="col-md-10 text-left col_b_right_top">
          <span>{{Announce.title}}</span>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-1 text-left col_b_left pb-2"> 
          <span>公告日期</span>
        </div>
        <div class="col-md-10 text-left col_b_right">
          <span>{{Announce.created_at}}</span>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-1 text-left col_b_left pb-2"> 
          <span>分類</span>
        </div>
        <div class="col-md-10 text-left col_b_right">
          <span>{{typeToString(Announce.ann_type)}}</span>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-1 text-left col_b_left pb-2"> 
          <span>公告內容</span>
        </div>
        <div class="col-md-10 text-left col_b_right">
          <span v-html="Announce.content"></span>
        </div>
      </div>
      <div v-if="user.status == 4" class="row justify-content-center mt-2 pb-2">
        <div class="offset-1 col-md-10 text-left"> 
          <button class="onclk btn btn-danger" @click="delann">刪除公告</button>
          <router-link tag="button" :to="{name:'editAnnounce',params:{announce_id:ann_id}}" class="btn btn-warning">修改公告</router-link>
        </div>
      </div>
    </div>
  </div>
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
        console.log(self.Announce)   
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
