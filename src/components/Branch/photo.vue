<style scoped>
.photo_page{
    padding-top: 50px;
}
</style>

<template>
    <div class="content">
        <div class="container-fluid photo_page">
            <div class="text-center"><h1>{{Branch.title}}</h1></div>
            <div class="row">
                <div class="col-2">
                    <router-link class="btn btn-primary" style="color:white;" v-if="user.status == 4" :to="{name:'upload',params:{b_id:$route.params.b_id}}">新增</router-link>
                </div>
            </div>
            <div class="row mt-2" v-viewer>
                <div class="col-md-4 col-12 mb-2" v-for="photo in photos" :key="photo.bp_id" >
                    <div class="card">
                        <div class="card-header" v-if="user.status == 4">
                            <button class="btn btn-danger" @click="del_photo(photo.bp_id)">刪除</button>
                        </div>
                        <div class="card-body" >
                            <div v-if="photo.picType == 0" >
                                <img :src="`${$GLOBAL.path}/images/OriginalImage/${photo.b_picName}`" width="100%" alt="">
                            </div>
                            <div v-else>
                                <video width="100%" controls="controls" :src="`${$GLOBAL.path}/videos/${photo.b_picName}`" ></video>
                            </div>                            
                        </div>
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
            photos:[],
            Branch:[]
        }
    },
    mounted() {
        this.get_PicList()
    },
    methods:{
        del_photo:function (bp_id) {
            if(confirm("確定刪除花絮照片?")){
                const self = this;
                const data = {
                    bp_id:bp_id
                }
                this.$http.post(`${this.$GLOBAL.path}/api/delete_b_pic`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
                .then(function(response) {
                    alert(response.data)
                    self.get_PicList();
                })
                .catch(function(error) {
                    alert(error);
                });
            }
        },
        get_PicList:async function(){
            let res = await this.$http.get(`${this.$GLOBAL.path}/api/getPicListByb_id`,{
                params:{ b_id:this.$route.params.b_id}
            });
            this.photos = res.data;
            
            res = await this.$http.get(`${this.$GLOBAL.path}/api/getBranchData`,{
                params:{ b_id:this.photos[0].b_id}
            });
            this.Branch = res.data[0];
        },
         
        
    }
}
</script>