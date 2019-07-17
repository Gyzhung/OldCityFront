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
                  <div class="form-group row">
                      <label for="account" class="offset-1 col-md-1 col-form-label">標題:</label>
                      <div class="col-md-4">
                          <input type="text"  v-model="announce.title"  class="form-control">
                      </div>
                      <label for="account" class="offset-1 col-md-1 col-form-label">分類:</label>
                      <div class="col-md-4">
                          <select class="form-control"  v-model="announce.ann_type" >
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
                      <ckeditor ref="editor" @ready="onReady" :editor="editor" v-model="announce.content"  :config="editorConfig" ></ckeditor>
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
import axios from 'axios'
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
        image: {
            toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],

            styles: [
                // This option is equal to a situation where no style is applied.
                'full',

                // This represents an image aligned to the left.
                'alignLeft',

                // This represents an image aligned to the right.
                'alignRight'
            ]
        },
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
  },
  methods: {
    onReady( editor )  {
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new UploadAdapter( loader );
      };
    },
    create() {
      const self = this;
      const data ={
        title: this.announce.title,
        content: this.announce.content,
        ann_type: this.announce.ann_type
      }
      console.log(data)
      this.$http.post(`${this.$GLOBAL.path}/api/addAnnounce`,data,{headers: {authorization: `Bearer ${this.$GLOBAL.login_token}`}})
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

class UploadAdapter {
    constructor(loader, url) {
        this.loader = loader;
    }
    upload() {
        return new Promise((resolve, reject) => {
          let formdata = new FormData();
          this.loader.file.then(function(result) {
              formdata.append("image", result);
              axios({
                method:"POST",
                url:`https://api.imgur.com/3/image`,
                data:formdata,
                headers: {
                  authorization: `Bearer 5eeae49394cd929e299785c8805bd168fc675280`,
                },
                mimetype:"multipart/form-data"
              })
              .then(function(response) {
                console.log(response)
                resolve({ default: response.data.data.link });
              })
              .catch(function(error) {
                console.log(error);
              });
          })
        })
    }
    abort() {
        console.log("abort")
    }
}
</script>