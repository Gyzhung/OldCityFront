<style scoped>
.content {
  height: 100%;
  padding-bottom: 2rem;
}
.nav {
  height: 150px;
  padding-left: 15px;
}
.table {
  margin: 0 auto;
  color: gray;
}
.table td {
  vertical-align: middle;
}
.news_title {
  border-radius: 10px;
  background-color: #d6cab7;
  border-collapse: collapse;
  border-color: none;
}
.news_title th:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.news_title th:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.table th {
  vertical-align: middle;
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
  background-image: url("../assets/side-menu-item.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.AManage-nav-link {
  cursor: pointer;
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
  min-height: 40vw;
}
.btn-red {
  background-color: #ec4b4b;
  color: #ffffff;
  font-weight: 700;
}
.btn-red:hover {
  background-color: #c52121;
  color: #ffffff;
}
@media (max-width: 980px) {
  #course {
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
    padding: 0.25rem 0;
    border-radius: 8px;
  }
  .manage-content {
    font-size: 12px;
  }
}
</style>

<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <ul class="nav col-lg-3 col-md-12 col-sm-12 col-12" id="myTab" role="tablist">
          <li class="table-header">最新消息</li>
          <li class="AManage-nav-item">
            <span class="AManage-nav-link" id="allnews-tab" @click="type = 0">全部消息</span>
          </li>
          <li class="AManage-nav-item">
            <span class="AManage-nav-link" id="activitynews-tab" @click="type = 1">活動消息</span>
          </li>
          <li class="AManage-nav-item">
            <span class="AManage-nav-link" id="attractionnews-tab" @click="type = 2">景點消息</span>
          </li>
          <li class="AManage-nav-item">
            <span class="AManage-nav-link" id="coursenews-tab" @click="type = 3">課程消息</span>
          </li>
          <li class="AManage-nav-item">
            <span class="AManage-nav-link" id="medianews-tab" @click="type = 4">媒體消息</span>
          </li>
        </ul>
        <div class="tab-content col-lg-9 col-md-12 col-sm-12 col-12 mt-5" id="myTabContent">
          <div
            class="tab-pane fade show active pt-4"
            id="allnews"
            role="tabpanel"
            aria-labelledby="allnews-tab"
          >
            <div class="table-header col-lg-6">{{typeToString(type)}}</div>
            <div class="manage-content">
              <table class="table col-lg-11 col-md-11 col-sm-11 col-12">
                <tbody>
                  <tr class="news_title">
                    <th scope="row">分類</th>
                    <th scope="row">公告標題</th>
                    <th scope="row" width="30%">公告日期</th>
                  </tr>
                  <router-link
                    style="cursor: pointer;"
                    :to="`/Announce/${Announce.ann_id}`"
                    tag="tr"
                    v-for="Announce in filter_Announce_list"
                    :key="Announce.ann_id"
                  >
                    <td>{{typeToString(Announce.ann_type)}}</td>
                    <td>{{Announce.title}}</td>
                    <td class="font-italic">{{Announce.created_at}}</td>
                  </router-link>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      Announce_list: []
    };
  },
  mounted() {
    const self = this;
    this.$http
      .post(`${this.$GLOBAL.path}/api/searchAnnounce`, { keyword: `all:` })
      .then(function(response) {
        if ((status = 200)) {
          self.Announce_list = response.data;
        }
      })
      .catch(function(error) {
        alert(response);
      });
  },
  methods: {
    typeToString: function(type) {
      switch (type) {
        case 0:
          return "全部消息";
          break;
        case 1:
          return "活動消息";
          break;
        case 2:
          return "景點消息";
          break;
        case 3:
          return "課程消息";
          break;
        case 4:
          return "媒體消息";
          break;
      }
    }
  },
  computed: {
    filter_Announce_list: function() {
      switch (this.type) {
        case 0:
          return this.Announce_list;
          break;
        case 1:
          return this.Announce_list.filter(a => a.ann_type == 1);
          break;
        case 2:
          return this.Announce_list.filter(a => a.ann_type == 2);
          break;
        case 3:
          return this.Announce_list.filter(a => a.ann_type == 3);
          break;
        case 4:
          return this.Announce_list.filter(a => a.ann_type == 4);
          break;
      }
    }
  }
};
</script>