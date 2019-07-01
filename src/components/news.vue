<style scoped>
.news {
  float: right;
  background-color: rgb(255, 238, 190);
  border: 2px burlywood;

  height: 1400px;
  width: 70%;
  min-width: 600px;
}
.newsbutton {
  float: left;
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 30%;
  min-width: 300px;
}
label {
  font-size: 34px;
  color: #94693f;
  font-weight: bold;
  font-family: Microsoft JhengHei;
}
.newsbutton label {
  padding-bottom: 55px;
  margin-left: 50px;
  margin-top: 50px;
}
.newsbutton img {
  padding-bottom: 55px;
}
.search {
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.newsTitle {
  margin-left: 40px;
}
.newscontent {
  margin-top: 20px;
  width: 90%;
  background-color: burlywood;
  font-family: Microsoft JhengHei;
  font-size: 15px;
  border: 3px burlywood;
}
input {
  background: #dacfb8;
  border-radius: 5px;
  padding: 5px 15px;
}
input#search::-webkit-input-placeholder {
  color: #ffffff;
  font-family: Microsoft JhengHei;
}
</style>

<template>
  <div class="content">
    <div class="newsbutton">
      <label id="new">最 新 消 息</label>
      <br>
      <img src="../image/allnews150.png" value="最新消息" width="300">
      <br>
      <img src="../image/AttractionsNews150.png" value="景點消息" width="300">
      <br>
      <img src="../image/activityNews150.png" value="活動消息" width="300">
      <br>
      <img src="../image/courseNews150.png" value="課程消息" width="300">
      <br>
      <img src="../image/interNews150.png" value="媒合消息" width="300">
    </div>
    <div class="news">
      <div class="search" align="left">
        <input type="search" id="search" placeholder="輸 入  關  鍵  字">
        <button>搜尋</button>
        <br>
      </div>
      <div class="newsTitle" align="left">
        <img src="../image/news_title.png" value="最新消息" width="1000">
        <br>
        <table class="newscontent" border="1" align="left">
          <tr>
            <td width="300" height="50">活動消息</td>
            <td width="515">標題標題標題標題標題標題標題標題</td>
            <td width="160">刊登日期刊登日期</td>
          </tr>
          <tr>
            <td width="300" height="50">媒合消息</td>
            <td width="515">標題標題標題標題標題標題標題標題</td>
            <td width="160">2019-05-31</td>
          </tr>
          <tr>
            <td width="300" height="50">活動消息</td>
            <td width="515">標題標題標題標題標題標題標題標題</td>
            <td width="160">2019-05-31</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
