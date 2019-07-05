<style scoped>
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
  <div class="content">
    <div class="col-lg-12">
      <div class="anousAdd" :key="annRes" align="center">
        <label>修改公告</label>
        <p>公告標題:</p>
        <input type="text" :ed_ann_title="editAnnData.ed_ann_title" v-model="editAnnData.ed_ann_title" autocomplete="on">
        <p>公告分類:</p>
        <p>
          1:景點消息
          2:活動消息
          <br>3:課程消息
          4:媒合消息
        </p>
        <select name="select_option" v-model="editAnnData.ed_ann_type">
          <option disabled selected hidden>{{ ann_type }}</option>
          <option :ed_ann_type="editAnnData.ed_ann_type">1</option>
          <option :ed_ann_type="editAnnData.ed_ann_type">2</option>
          <option :ed_ann_type="editAnnData.ed_ann_type">3</option>
          <option :ed_ann_type="editAnnData.ed_ann_type">4</option>
        </select>
        <p>公告內文:</p>
        <div class="onlineEdit">
          <mavon-editor ref="editer" v-model="doc"/>
        </div>
        <button class="onclk" @click="editann">建立公告</button>
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
      editAnnData: {
        ed_ann_title: "",
        ed_ann_type: ""
      },
      annRes: [],
      doc: "",
      ann_id: this.$route.params.announce_id
    };
  },
  beforeCreate: {
    getann() {
      alert(this.ann_id);
      alert(global_.login_token);
      let doc = this.doc;
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
          self.ann_title = response.data.ann_title;
          doc = response.data.ann_content;
          self.created_at = response.data.created_at;
          self.ann_type = response.data.ann_type;
          alert(ann_id);
          alert(ann_title);
          alert(doc);
          alert(created_at);
          alert(ann_type);
        })
        .catch(function(error) {
        });
    }
  },
  methods: {
    editann() {
      let html = this.$refs.editer.d_render;
      axios
        .post(
          `http://oldcity.southeastasia.cloudapp.azure.com/api/editAnnounce?ann_id=${
            this.ann_id
          }`,
          {
            ann_title: this.editAnnData.ed_ann_title,
            ann_content: html,
            ann_type: this.editAnnData.ed_ann_type
          },
          {
            headers: {
              authorization: `Bearer ${global_.login_token}`
            }
          }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("修改公告成功");
          }
        })
        .catch(function(error) {
          alert(response);
          alert("修改公告失敗");
        });
    }
  }
};
</script>