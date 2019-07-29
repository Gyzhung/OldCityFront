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
              <div>
                  <div class="form-group row justify-content-center">
                      <label for="account" class="col-md-1 col-form-label">標題:</label>
                      <div class="col-md-4">
                          <input type="text"  v-model="announce.title"  class="form-control">
                      </div>
                      <label for="account" class="col-md-1 col-form-label">分類:</label>
                      <div class="col-md-4">
                          <select class="form-control"  v-model="announce.ann_type" >
                              <option value="1">活動</option>
                              <option value="2">景點</option>
                              <option value="3">課程</option>
                              <option value="4">媒體</option>
                          </select>
                      </div>
                  </div>
                  
                  <div class="form-group row justify-content-center">
                    <div class="col-md-10">
                      <label for="account" class="text-md-right">內容:</label>
                      <quill-editor  v-model="announce.content" :options="editorOption">
                      </quill-editor>
                    </div>
                  </div>
                  <div class="col-md-6 offset-md-5">
                      <button type="button" class="btn btn-lightbrown" @click="create">
                          建立公告
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { addQuillTitle } from '../../js/quill_title'
import { QuillWatch } from 'quill-image-extend-module'
export default {
  data() {
    return {
      announce: {
        title: "",
        content: "",
        ann_type: ""
      },
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "ann_pic",
            action: `${this.$GLOBAL.path}/api/add_ann_pic`,
            response: (res) => {
              return `${this.$GLOBAL.path}/images/OriginalImage/${res}`
            },
            headers: (xhr) => {
              xhr.setRequestHeader("authorization", `Bearer ${this.$GLOBAL.login_token}`)
            },
          },
          toolbar: {container:[
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            
          ],handlers: {
              'image': function () {
                  QuillWatch.emit(this.quill.id)
              }
          }},
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      }
    };
  },
  mounted() {
    addQuillTitle();
  },
  methods: {
    create() {
      const self = this;
      const data ={
        title: this.announce.title,
        content: this.announce.content,
        ann_type: this.announce.ann_type
      }
      this.$http.post(`${this.$GLOBAL.path}/api/addAnnounce`,data,{headers: {authorization: `Bearer ${this.$GLOBAL.login_token}`}})
      .then(function(response) {
        if ((status = 200)) {
          alert("新增公告成功");
          self.$router.push(`/index`);
        }
      })
      .catch(function(error) {
        console.log(error.response)
        alert("新增公告失敗");
      });
    }
  }
};

</script>