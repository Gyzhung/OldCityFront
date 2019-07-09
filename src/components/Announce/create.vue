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
          <div class="form-header ">新增公告</div>
          <div class="card-body">
              <form name="my-form" onsubmit="return validform()" action="success.php" method="">
                  <div class="form-group row">
                      <label for="account" class="offset-1 col-md-1 col-form-label">標題:</label>
                      <div class="col-md-4">
                          <input type="text"  v-model="announce.title"  class="form-control">
                      </div>
                      <label for="account" class="offset-1 col-md-1 col-form-label">分類:</label>
                      <div class="col-md-4">
                          <select class="form-control"  v-model="announce.ann_type" >
                              <option value="1">系統</option>
                              <option value="2">活動</option>
                              <option value="3">課程</option>
                          </select>
                      </div>
                  </div>
                  
                  <div class="form-group row">
                    <div class="offset-1 col-md-10">
                      <label for="account" class="text-md-right">內容:</label>
                      <ckeditor :editor="editor" v-model="announce.content"  :config="editorConfig" ></ckeditor>
                    </div>
                  </div>
                  <div class="col-md-6 offset-md-5">
                      <button type="button" class="btn btn-lightbrown" @click="create">
                          建立公告
                      </button>
                  </div>
              </form>
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
      announce: {
        title: "",
        content: "",
        ann_type: ""
      },
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
  methods: {
    create() {
      const data ={
        title: this.announce.title,
        content: this.announce.content,
        ann_type: this.announce.ann_type
      }
      this.$http.post(`http://163.17.145.142/api/addAnnounce`,data,{headers: {authorization: `Bearer ${this.$GLOBAL.login_token}`}})
      .then(function(response) {
        if ((status = 200)) {
          alert("新增公告成功");
          self.$router.push(`/index`);
        }
      })
      .catch(function(error) {
        alert("新增公告失敗");
      });
    }
  }
};
</script>