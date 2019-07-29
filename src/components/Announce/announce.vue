
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
                <div class="table-header col-lg-6">公告詳細</div>
                <table class="table table-bordered col-lg-9 col-md-9 col-sm-9 col-10">
                    <tbody>
                        <tr>
                            <th scope="row" width="20%">標題</th>
                            <td colspan="3">{{Announce.title}}</td>
                        </tr>
                        <tr>
                            <th scope="row">公告日期</th>
                            <td colspan="3">{{Announce.created_at}}</td>
                        </tr>
                        <tr>
                            <th scope="row">分類</th>
                            <td colspan="3">{{typeToString(Announce.ann_type)}}</td>
                        </tr>
                        <tr>
                            <th scope="row">公告內容</th>
                            <td colspan="3" v-html="Announce.content"></td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="user.status == 4" class="row justify-content-center mt-2 pb-2">
                  <div class="offset-1 col-md-10 text-left"> 
                    <button class="onclk btn btn-danger" @click="delann">刪除公告</button>
                    <router-link tag="button" :to="{name:'editAnnounce',params:{announce_id:ann_id}}" class="btn btn-warning">修改公告</router-link>
                  </div>
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
