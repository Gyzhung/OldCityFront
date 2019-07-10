<style scoped>
.upload_page{
    padding-top:50px;
}
</style>

<template>
    <div class="content">
        <div class="upload_page">
            <div class="row">
                <div class="offset-3 col-6">
                    <input class="form-control-file" type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
                </div>
            </div>
            
            <div class="row mt-5">
                <div class="offset-3 col-6">
                    <div v-for="(file, key) in files" class="file-listing mt-1" :key="file.id">
                        {{ file.name }} <button class="btn btn-danger" v-on:click="removeFile( key )">刪除</button>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="offset-3 col-6">
                    <button class="btn btn-primary" @click="addFiles">增加</button>
                    <button class="btn btn-success" @click="submitFiles">上傳</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            files:[]
        }
    },
    methods: {
        addFiles(){
            this.$refs.files.click();
        },
        submitFiles(){            
            this.files.forEach(file => {
                let formdata = new FormData();
                formdata.append('b_id', this.$route.params.b_id);
                formdata.append('b_pic', file);
                
                this.$http.post('http://163.17.145.142/api/add_b_pic',formdata,
                {
                    headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
                    'Content-Type': 'multipart/form-data'
                })
                .then(function(response) {
                    console.log("上傳成功")
                })
                .catch(function(error) {
                    console.log(error.response)
                });
            });
            
        },
        handleFilesUpload(){
            
            let uploadedFiles = this.$refs.files.files;
            for( var i = 0; i < uploadedFiles.length; i++ ){
                this.files.push( uploadedFiles[i] );
            }
            console.log(this.files)
        },
        removeFile( key ){
            this.files.splice( key, 1 );
        }
    },
}
</script>