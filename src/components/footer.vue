<style scoped>
.footer { 
  width: 100%;
  height: auto;
  background-color: #f3efe9;
}
.bottom-bar {
  position: absolute; 
  bottom: 0;  
  width: 100%;
  height: 30px;
  background-image: url("../assets/header_bg.png");
  background-repeat: no-repeat;
  background-size: 100vw 100%;
}
</style>

<template>
  <div class="footer pt-5 pb-5">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 col-6 text-right pr-5">
        <img src="../assets/mail.png" width="64">
        <p class="mt-2 font-weight-bold">聯絡我們</p>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-6 pl-5">
        <img src="../assets/fb.png" width="64">
        <p class="mt-2 font-weight-bold">紛絲專頁</p>
      </div>
    </div>
    <div class="bottom-bar"></div>
  </div>
</template>