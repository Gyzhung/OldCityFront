<style scoped>
.announce {
  background-color: #dacfb8;
  padding: 1rem;
}
.announce-header {
  /* text-align: center; */
  font-size: 25px;
  font-weight: 700;
  color: #94693a;
}
.announce-date {
  font-size: 14px;
  color: gray;
}
.announce-more {
  padding: 0.5rem 2rem 0.5rem 1rem;
  color: #ffffff;
  float: right;
}
.l-header {
  color: #94693a;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 7px;
}
.landscpe-img{
    width: 250px;
}
.guide-list {
  background-color: #dacfb8;
  border-radius: 20px;
  margin: 0rem 1rem 1rem 1rem;
}
.guide-list img {
  width: 200px;
}
@media (max-width: 1024px) {
  .guide-list img {    
    width: 150px;
  }
}

</style>

<template>
  <div class="content">
    <div class="row no-gutters mb-4">
        <!--輪播-->
        <div id="carouselExampleCaptions" class="carousel slide col-lg-8" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class=""></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1" class="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2" class=""></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item">
                    <img class="d-block w-100" src="../assets/picBig.png" data-holder-rendered="true">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>台中車站</h5>
                        <p></p>
                    </div>
                </div>
                <div class="carousel-item active">
                    <img class="d-block w-100" src="../assets/picBig.png" data-holder-rendered="true">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>第一廣場</h5>
                        <p></p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="../assets/picBig.png" data-holder-rendered="true">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>第三市場</h5>
                        <p></p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <!--公告欄-->
        <div class="announce col-lg-4">
            <div class="announce-header text-center">最新公告</div>
            <div class=" announce-list container-fluid" v-for="Announce in Announces" :key="Announce.ann_id">
              <router-link class="row" :to="{name:'Announce',params:{announce_id:Announce.ann_id}}">
                <div class="col-lg-10 announce-text text-truncate">{{Announce.title}}</div>
                <div class="col-lg-10 announce-text announce-date font-italic">{{Announce.created_at}}</div>
              </router-link>
            </div>
            <div class="announce-more text-monospace font-italic">more▼</div>

        </div>
    </div>
    <!--遊程介紹-->
    <div class="container-fluid">
      <div class="row border-top mb-4">
        <div class="mt-3 text-center col-lg-3 col-md-6 col-sm-12">
            <img src="../assets/picS.png" class="landscpe-img">
        </div>
        <div class="border-right mt-3 col-lg-3 col-md-6 col-sm-12">
            <p class="l-header">遊程介紹</p>
            <p>這是一個景點簡介，說明旅程內容活動內容等等等等等</p>
        </div>
        <div class="mt-3 text-center col-lg-3 col-md-6 col-sm-12">
            <img src="../assets/picS2.png" class="landscpe-img">
        </div>
        <div class="mt-3 col-lg-3 col-md-6 col-sm-12">
            <p class="l-header">遊程介紹</p>
            <p>這是一個景點簡介，說明旅程內容活動內容等等等等等</p>
        </div>
      </div>
    </div>
    
    <!--響導人員-->
    <div class="container-fluid">
      <div class="row border-top pt-3 pl-5">
        <p class="l-header ml-4 col-lg-11">嚮導人員</p>
        <div class="guide-list col-lg-2 col-md-3 col-sm-4 col-6">
            <img src="../assets/boy.png">
        </div>
        <div class="guide-list col-lg-2 col-md-3 col-sm-4 col-6">
            <img src="../assets/boy.png">
        </div>
        <div class="guide-list col-lg-2 col-md-3 col-sm-4 col-6">
            <img src="../assets/boy.png">
        </div>
        <div class="guide-list col-lg-2 col-md-3 col-sm-4 col-6">
            <img src="../assets/boy.png">
        </div>
        <div class="guide-list col-lg-2 col-md-3 col-sm-4 col-6">
            <img src="../assets/boy.png">
        </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      keystr: {
        keyword: "all:"
      },
      Announces:''

     
    };
  },
  mounted(){
    const self = this;
    this.$http.post(`${this.$GLOBAL.path}/api/searchAnnounce`,
      {
        keyword: `${this.keystr.keyword}`
      }).then(function(response) {
        if ((status = 200)) {
          self.Announces = response.data;
        }
      })
      .catch(function(error) {
        alert(response);
      });
  },
  methods: {
    
    
  }
};
</script>