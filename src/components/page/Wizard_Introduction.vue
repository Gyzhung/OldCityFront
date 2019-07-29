<style scope>
    .title{
        letter-spacing: 50px;
        font-size: 25px;
        color:#9B734C;
        font-weight: 700;
    }
    .page{
        margin-top: 50px;
    }
    .introduction{
        margin-top: 30px;
    }
    .introduction_title{
        padding: 5px 0px 5px 15px;
        display:inline-block !important; 
        display:inline; 
        text-align: center;
        font-size: 18px;
        letter-spacing: 15px;
        color:#9B734C;
        font-weight: 700;
        border: #9B734C;
        border-style: solid;
        border-radius: 10px;
        border-width: 1.5px;
    }
    .introduction_content{
        margin-top: 20px;
        font-size: 16px;
        line-height: 24px;
    }
    .condition{
        margin-top: 30px;
    }
    .condition_title{
        padding: 5px 0px 5px 15px;
        display:inline-block !important; 
        display:inline; 
        text-align: center;
        font-size: 18px;
        letter-spacing: 15px;
        color:#9B734C;
        font-weight: 700;
        border: #9B734C;
        border-style: solid;
        border-radius: 10px;
        border-width: 1.5px;
    }
    .condition_content{
        margin-top: 20px;
        font-size: 16px;
        line-height: 24px;
    }
    .flowchart{
        margin-top: 30px;
    }
    .flowchart_title{
        padding: 5px 0px 5px 15px;
        display:inline-block !important; 
        display:inline; 
        text-align: center;
        font-size: 18px;
        letter-spacing: 15px;
        color:#9B734C;
        font-weight: 700;
        border: #9B734C;
        border-style: solid;
        border-radius: 10px;
        border-width: 1.5px;
    }
    .flowchart_content{
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>
<template>
    <div class="content">
        <div class="container page">
            <div class="title">成為嚮導</div>
            <div class="introduction">
                <div class="introduction_title">嚮導說明</div> 
                <div class="introduction_content">
                    成為在地嚮導後,只要您在 Google 地圖上分享評論、相片和相關知識,就能獲得積分。這些積分可讓您在計劃中提升等級,同時
                    享有各種福利,像是搶先體驗 Google 新功能,以及合作夥伴提供的特別獎勵。升到第 4 級時,您也將獲得第一枚在地嚮導徽章,
                    這將使您針對各地點貢獻的內容更受人重視。
                </div>
            </div>
            <div class="condition">
                <div class="condition_title">申請條件</div> 
                <div class="condition_content">
                    必須完成以下三項規定，方能取得解說導覽員資格，並開始登錄解說導覽時數。<br/>
                    1.參與老城區市場與周邊巷弄故事探索或老市場新玩法遊程設計課程之一。<br/>
                    2.參與在地解說導覽訓練及驗收課程之第一天訓練課程，以及完成第二日課程上午或下午的驗收課程，並通過驗收。<br/>
                    3.參與遊程體驗計畫三梯次之一。<br/>
                </div>
            </div>
            <div class="flowchart">
                <div class="flowchart_title">成為嚮導流程圖</div> 
                <div class="flowchart_content">
                    <img src="../../assets/flowchart.gif" alt="" class="img-fluid" @click="img_click">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['user'],
    methods: {
        img_click:function() {
            if (this.user == '') {
                this.$router.push("register");
            }else{
                this.$router.push("Session/1");
            }
        }
    },
}
</script>