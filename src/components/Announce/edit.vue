<style scoped>
.form {
    padding-top: 2rem;
  width: 90%;
  margin: 0 auto;
}
.add{
  
  min-height: 70vh;
}
.form-header {
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
}
.form-control:focus {
  border-color: #ab8a6b;
  box-shadow: 0 0 5px rgba(171, 138, 107, 1);
}
.form-control{
  width: 80%;
}
.btn-lightbrown{
  font-weight: 700;
}
</style>

<template>
  <div class="content">
      <div class="form add">
          <div class="form-header ">修改公告</div>
          <div class="card-body">
              <div>
                  <div class="form-group row">
                      <label for="account" class="offset-1 col-md-1 col-form-label">標題:</label>
                      <div class="col-md-4">
                          <input type="text"  v-model="editAnnounce.title"  class="form-control">
                      </div>
                      <label for="account" class="offset-1 col-md-1 col-form-label">分類:</label>
                      <div class="col-md-4">
                          <select class="form-control"  v-model="editAnnounce.ann_type" >
                              <option value="1">活動</option>
                              <option value="2">景點</option>
                              <option value="3">課程</option>
                              <option value="4">媒體</option>
                          </select>
                      </div>
                  </div>
                  
                  <div class="form-group row">
                    <div class="offset-1 col-md-10">
                      <label for="account" class="text-md-right">內容:</label>
                      <ckeditor :editor="editor" v-model="editAnnounce.content"  :config="editorConfig" ></ckeditor>
                    </div>
                  </div>
                  <div class="col-md-6 offset-md-5">
                      <button type="button" class="btn btn-lightbrown" @click="edit">
                          修改公告
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import zh from '@ckeditor/ckeditor5-build-classic/build/translations/zh.js';
export default {
  data() {
    return {
      editAnnounce: {
        title: "",
        content: "",
        ann_type: ""
      },
      ann_id: this.$route.params.announce_id,
      editor:ClassicEditor,
      editorConfig:{
        language: 'zh',
        heading: {
            options: [
                { model: 'paragraph', title: '標題', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: '大標題', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: '中標題', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: '小標題', class: 'ck-heading_heading3' },
            ]
        },
      },
    };
  },
  mounted() {
    const self = this;
    this.$http.get(`${this.$GLOBAL.path}/api/getAnnounceData?ann_id=${this.ann_id }` )
    .then(function(response) {
      self.editAnnounce.title = response.data.title;
      self.editAnnounce.content = response.data.content;
      self.editAnnounce.ann_type = response.data.ann_type;
    })
    .catch(function(error) {
    });
  },
  methods: {
    edit:function() {
      const self = this;
      const  data = {
        ann_id: this.ann_id,
        title: this.editAnnounce.title,
        content: this.editAnnounce.content,
        ann_type: this.editAnnounce.ann_type
      }
      this.$http.post(`${this.$GLOBAL.path}/api/editAnnounce`,data,{headers: {authorization: `Bearer ${this.$GLOBAL.login_token}`}})
      .then(function(response) {
        alert("修改成功");
        self.$router.push(`/Announce/${self.ann_id}`)
      })
      .catch(function(error) {
        alert("修改失敗");
      });
    }
  }
};
</script>