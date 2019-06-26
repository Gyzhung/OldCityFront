<style>
label {
  font-size: 34px;
  color: #94693f;
  font-weight: bold;
  font-family: Microsoft JhengHei;
}
p {
  font-family: Microsoft JhengHei;
  margin-left: 20px;
  font-weight: bold;
}

input {
  margin: 20px;
  width: 500px;
  border-radius: 5px;
  padding: 5px 15px;
}
button.onclk {
  margin-top: 5%;
}
.onlineEdit {
  width: 70%;
}
</style>

<template>
  <div>
    <!-- 公告內容:
          <input
            type="text"
            :ann_content="announce.ann_content"
            v-model="announce.ann_content"
    >-->

    <div class="content">
      <div class="col-lg-12">
        <div class="anousAdd" align="center">
          <label>新增公告</label>
          <p>公告標題:</p>
          <input
            type="text"
            :ann_title="announce.ann_title"
            v-model="announce.ann_title"
            autocomplete="on"
          >
          <p>公告分類:</p>
          <p>
            1:景點消息
            2:活動消息
            <br>3:課程消息
            4:媒合消息
          </p>
          <select name="select_option" :ann_type="announce.ann_type" v-model="announce.ann_type">
            <option :ann_type="announce.ann_type" value="1">景點消息</option>
            <option :ann_type="announce.ann_type" value="2">活動消息</option>
            <option :ann_type="announce.ann_type" value="3">課程消息</option>
            <option :ann_type="announce.ann_type" value="4">媒合消息</option>
          </select>
          <p>公告內文:</p>
          <div class="onlineEdit">
            <mavon-editor ref="editer" v-model="doc"/>
          </div>
          <button class="onclk" @click="addCourse">建立公告</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: { mavonEditor },
  data() {
    return {
      announce: {
        ann_title: "",
        ann_content: "",
        ann_type: ""
      },
      annRes: [],
      doc: "",
     
    };
  },
  methods: {
    addCourse() {
      let html = this.$refs.editer.d_render;
      axios
        .post(
          `http://163.17.145.142/api/addAnnounce`,
          {
            ann_title: this.announce.ann_title,
            ann_content: html,
            ann_type: this.announce.ann_type
          },
          {
            headers: {
              authorization: `Bearer ${global_.login_token}`
            }
          }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("新增公告成功");
          }
        })
        .catch(function(error) {
          console.log(error);
          alert(response);
          alert("新增公告失敗");
        });
    }
  }
};
</script>