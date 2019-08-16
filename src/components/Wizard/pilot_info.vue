<style scoped>
.pilot{
  width: 70%;
  margin: 0 auto;
}
.card{
  border: 1px solid rgba(0,0,0,0);
}
.card-title{
  letter-spacing: 5px;
  color: #784a45;
}
.card-text{
  color: gray;
}
.img-thumbnail{
  border: 2px solid #ab8a6b;
  border-radius: 3rem;
}
.start{
  font-size: 24px;
}
.name{
  font-size: 28px;
  letter-spacing: 10px;
}
.article-class{
  border-radius: 10px;
  background-color: #784a45;
  color: #ffffff;
  letter-spacing: 10px;
}
.article-title{
  font-size: 18px;
}
</style>
<template>
    <div class="content">
        <div class="row pilot mt-4 pt-2">
            <div class="col-lg-6 col-md-4">
                <div class="card col-lg-8">
                    <img class="card-img-top img-thumbnail" src="../../assets/boy.png" alt="Card image cap">
                    <div class="card-body text-center">
                        <p class="card-text start font-italic">4.5★</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-4">
                <h5 class="card-title name font-weight-bold">王小名</h5>
                <p>我是XXX，我是台中人。在一個平凡的家庭出生，家中排行老二，現在住在台北市。爸爸在台電上班，媽媽在中油上班，哥哥在證券公司上班，妹妹還在國中唸書。我目前是XX高中三年級的學生，在學校的成績還不錯，平常的興趣是看電影、聽音樂、
                    看書、打球。我的個性非常隨和、很好相處。參加學校的OO服務社，在參加社團的過程中讓我學習到很 多，我覺得對我很有幫助。很高興您能給我這樣一個機會在這裡面試，再次謝謝您，以上就是我的自我介紹。
                </p>
            </div>
        </div>
        <div class="row pilot">
            <div class="col-lg-6 col-md-4">
                <p class="col-lg-8 article-class text-center">嚮導文章</p>
            </div>
            <div class="col-lg-6 col-md-4">
                <div>
                    <p class="card-title font-weight-bold article-title">環境與自然的..</p>
                    <P>環境是指相對並相關某項中心事物的周圍事物。
                        中心事物不同，與其相關的周圍事物就不同。例如，以人或人類為中心事物，其他生物和非生命物質就是人類生存的環境。以生物為中心事物，其他非生命物質就是生物界的環境。

                        環境可以指：

                        生態環境：對生物學來說，環境是指生物生活周圍的氣候、生態系統、周圍群體和其他種群。
                        對文學、歷史和社會科學來說，環境指具體的人生活周圍的情況和條件。
                        建成環境：對建築學來說，是指室內條件和建築物周圍的景觀條件。
                        社會環境：對企業和管理學來說，環境指社會和心理的條件，如工作環境等。
                        對熱力學來說，是指向所研究的系統提供熱或吸收熱的周圍所有物體。
                        對化學或生物化學來說，是指發生化學反應的溶液。
                        自然環境：從環境保護的宏觀角度來說，就是這個人類的家園地球。人類生活的自然環境，主要包括：岩石圈、水圈、大氣圈、生物圈。</P>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>