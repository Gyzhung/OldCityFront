<style scoped>
.content {
  height: 100%;
  padding-bottom: 2rem;
}
.nav{
  height: 150px;
  padding-left: 15px;
}
.table-header {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 3px;
}
.AManage-nav-item {
  width: 90%;
  margin: 1rem 0 1rem 0;
  padding: 1rem 0rem 1rem 2rem;
  font-size: 20px;
  text-align: right;
  letter-spacing: 5px;
  background-image: url("../../assets/side-menu-item.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.AManage-nav-link {
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
  color: rgba(171, 138, 107, 1);
}
.AManage-nav-link:hover {
  text-decoration: none;
  color: #ffffff;
  background-color: #94693a;
}
.manage-content {
  min-height: 42vw;
}
.card{
  border: 1px solid rgba(171, 138, 107, 1);
}
.card-header{
  border: 1px solid rgba(171, 138, 107, 1);
  background-color: rgba(171, 138, 107, 0.9);
}
.btn-link{
  color: #ffffff;
}
.btn-link:hover{
  color: #ffffff;
  text-decoration: none;
}
@media (max-width: 980px) {
  #course{
    margin-top: 2rem;
  }
  .AManage-nav-item {
    width: 20%;
    padding: 0.5rem 0rem;
    margin: 1rem 1rem;
    text-align: center;
    font-size: 15px;
  }
  .AManage-nav-link {
    padding: 0.5rem;
  }
  .table-header {
    width: 100%;
    font-size: 20px;
  }
  .manage-content {
    font-size: 15px;
  } 
}
@media (max-width: 740px) {
  .AManage-nav-item {
    margin: 1rem 0.5rem;
  }
}
@media (max-width: 480px) {
  .AManage-nav-item {
    width: 22%;
    margin: 1rem 0.25rem;
    font-size: 12px;
  }
  .AManage-nav-link {
    padding: .25rem 0;
    border-radius: 8px;
  } 
  .manage-content {
    font-size: 12px;
  } 
}
.pilot{
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
        <div class="container-fluid">
            <div class="row">
                <ul class="nav col-lg-3 col-md-12 col-sm-12 col-12" id="myTab" role="tablist">
                    <li class="table-header">嚮導簡介</li>
                    <li class="AManage-nav-item">
                        <router-link to="/wizard_introduction" tag="span" class="AManage-nav-link" >成為嚮導</router-link>
                    </li>
                    <li class="AManage-nav-item">
                        <router-link to="/wizard_list" tag="span" class="AManage-nav-link" >嚮導列表</router-link>
                    </li>
                </ul>
                <div class="tab-content col-lg-9 col-md-12 col-sm-12 col-12" id="myTabContent">
                    <div class="row pilot mt-4 pt-2">
                        <div class="col-lg-3 col-md-4">
                            <router-link to="/pilot_info/123" tag="div" class="card">
                                <img class="card-img-top img-thumbnail" src="../../assets/boy.png" alt="Card image cap">
                                <div class="card-body text-center">
                                    <h5 class="card-title font-weight-bold">王小名</h5>
                                    <p class="card-text">4.5★</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-4">
                            <div class="card">
                                <img class="card-img-top img-thumbnail" src="../../assets/woman.png" alt="Card image cap">
                                <div class="card-body text-center">
                                    <h5 class="card-title font-weight-bold">吳小美</h5>
                                    <p class="card-text">4.5★</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4">
                            <div class="card">
                                <img class="card-img-top img-thumbnail" src="../../assets/boy.png" alt="Card image cap">
                                <div class="card-body text-center">
                                    <h5 class="card-title font-weight-bold">王小名</h5>
                                    <p class="card-text">3★</p>
                                </div>
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
    
}
</script>