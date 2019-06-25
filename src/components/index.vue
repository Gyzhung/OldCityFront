<style scoped>
.slideshow {
  width: 60%;
  float: left;
  clear: both;
}
.news {
  width: 40%;
  height: 100%;
  float: right;
  background-color: #94693f;
}
#newstitle {
  font-size: "微軟正黑體";
  color: #ffc710;
}
h1 {
  padding-top: 50px;
  padding-left: 20px;
}
h3 {
  padding-left: 20px;
}
.intro {
  background-color: rgb(255, 255, 255);
  height: 330px;
  width: 100%;
  padding: bottom 35px;
  border: #94693f;
}
.intro img {
  margin-left: 100px;
}
.intro label {
  font-size: 25px;
  color: #94693f;
  font-weight: bold;
  font-family: Microsoft JhengHei;
}
.intro p {
  font-size: 18px;
  color: rgb(128, 128, 128);

  font-family: Microsoft JhengHei;
}
label.guidelabel {
  font-size: 40pt;
  color: #94693f;
  font-weight: bold;
  font-family: Microsoft JhengHei;
  margin-left: 100px;
  height: 80px;
}
.guide {
  background-image: url("../image/guideBG.png");
  background-size: 95%;
  background-repeat: no-repeat;
  width: 360px;
  height: 350px;
}
.guide img {
  width: 250px;
  height: 290px;
  margin-left: 40px;
}
tr {
  height: 90px;
}
</style>

<template>
  <div id="index">
   
    <!-- 輪播 -->
    <div class="slideshow">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          caption="台中火車站"
          text="近年來，台中舊城成了許多人訪舊尋新，體驗多元文化的熱門地點，到底，這個老城區有何魅力？在秋涼10月，走一趟台中舊城，感受新舊交融的人文氣息。"
          img-src="http://foritech-tlife.cloudapp.net/wp-content/uploads/2017/08/DSC_7114.jpg"
          img-width="1600px"
          img-height="1200px"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide
          caption="第二市場"
          text="臺中市公有第二零售市場是位於臺灣臺中市中區三民路與臺灣大道一段路口的傳統觀光市場。"
          img-src="https://imgs.gvm.com.tw/upload/gallery/20171120/41098_01.jpg"
          img-width="1600px"
          img-height="1000px"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="第三市場"
          text="台中市公有第三市場，創立於日治1922年，舊名敷島町市場，至今已有90多年的歷史，位於台中火車站附近，主要是由和平街及民意街的攤販集中區所形成的親子市場，是台中市老牌市場之一。"
          img-src="https://pic.pimg.tw/enlife/1447335050-2874038098_l.jpg"
          img-width="1600px"
          img-height="1200px"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="第五市場"
          text="第五市場位於西區廣民里大明街九號，為台中市「市44」市場用地，佔地雖不大卻是五臟俱全，商品種類齊全，應有盡有，號稱「第五百貨」。"
          img-src="http://3.blog.xuite.net/3/c/1/4/12133965/blog_765081/txt/511429765/0.jpg"
          img-width="1600px"
          img-height="1200px"
        ></b-carousel-slide>

        <!-- Slides with image only
        <b-carousel-slide
          img-src="https://picsum.photos/1024/480/?image=58"
          img-width="1600px"
          img-height="1200px"
        ></b-carousel-slide>-->

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <!-- <b-carousel-slide>
          <img
            slot="img"
            class="d-block img-fluid w-100"
            width="1600"
            height="1200"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </b-carousel-slide>-->

        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <!-- <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
            a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
          </p>
        </b-carousel-slide>-->
      </b-carousel>
    </div>
    <table class="news">
      <tr id="newstitle">
        <h1>最新消息</h1>
        <hr>
      </tr>
      <tr>
        <h3>公告公告公告公告</h3>
      </tr>
      <tr>
        <h3>公告公告公告公告</h3>
      </tr>
      <tr>
        <h3>公告公告公告公告</h3>
      </tr>
      <tr>
        <h3>公告公告公告公告</h3>
      </tr>
      <tr>
        <h3>公告公告公告公告</h3>
      </tr>
      <tr>
        <h3>公告公告公告公告</h3>
      </tr>
    </table>
    <div style="clear:both;"></div>
    <!--這是用來清除上方的浮動效果-->
    <div class="content">
      <div class="intro">
        <table class="newsText" border="2" align="center" width="100%">
          <tr>
            <td width="475" height="300">
              <img src="../image/picS.png">
            </td>
            <td width="475" height="300">
              <label>遊程介紹</label>
              <p id>簡介簡介簡介簡介簡介簡介簡介簡介簡介</p>
              <p></p>
            </td>
            <td width="475" height="300">
              <img src="../image/picS2.png">
            </td>ㄊ
            <td width="475" height="300">
              <label>遊程介紹</label>
              <p id>簡介簡介簡介簡介簡介簡介簡介簡介簡介</p>
              <p></p>
            </td>
          </tr>
        </table>
        <label class="guidelabel">嚮 導 人 員</label>
        <table align="center">
          <tr>
            <td class="guide">
              <img src="../image/guidephoto.jpg" width="300px" height="320px">
            </td>
            <td class="guide"></td>
            <td class="guide"></td>
            <td class="guide"></td>
            <td class="guide"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>