<style scoped>
.photo_page{
    padding-top: 50px;
}
</style>
<template>
    <div class="content">
        <div class="container-fluid photo_page mt-3 mb-5">
            <div class="row">
                <div class="col-4" v-for="branch in branch_list" :key="branch.b_id">
                    <router-link style="cursor: pointer;" :to="`/Branch_photo/${branch.b_id}`" tag="div" class="card">
                        <div class="card-header">
                            {{branch.session_name}}-{{branch.title}}
                        </div>
                        <div class="card-body">
                            <div v-if="branch.only_one_pic[0].picType == 0">
                                <img :src="`${this.$GLOBAL.path}/images/OriginalImage/${branch.only_one_pic[0].b_picName}`" width="100%" alt="">
                            </div>
                            <div v-else>
                                <video width="100%" :src="`${this.$GLOBAL.path}/videos/${branch.only_one_pic[0].b_picName}`" />
                            </div>
                        </div>
                        
                    </router-link>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props:["user"],
    data() {
        return {
            branch_list:[]
        }
    },
    mounted() {
        const self = this;
        this.$http.get(`${this.$GLOBAL.path}/api/getPicList`)
        .then(function(response) {
            console.log(response.data)
            self.branch_list = response.data.filter(a => a.only_one_pic.length != 0);
            console.log(self.branch_list)

        })
    },

}
</script>