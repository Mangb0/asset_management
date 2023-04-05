<template>
  <div>
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <v-img
            class="bd-placeholder-img"
            width="100%"
            height="100%"
            :src="require(`@/assets/bene_img.png`)"
            aria-hidden="true"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777" />
          </v-img>

          <div class="container">
            <div class="carousel-caption text-middle">
              <h1 v-if="$store.state.account.userno">
                {{ state.account.name }}
              </h1>
              <p>소비 패턴을 파악하고, 돈을 더 효율적으로 사용하세요!</p>
              <p>
                <a class="btn btn-lg btn-primary" href="#">Log in Now!</a>
              </p>
            </div>
          </div>
          s
        </div>
      </div>
    </div>
    <div class="container list">
      <div class="row">
        <div class="col-lg-4">
          <v-icon icon="mdi-wallet-outline" size="140" />

          <h2 class="fw-normal">
            <div v-if="!$store.state.account.userno">login 필요</div>
            <div v-else>Asset</div>
          </h2>
          <p>
            <a
              v-if="!$store.state.account.userno"
              class="btn btn-secondary"
              @click="moveTo(3)"
              >Login &raquo;</a
            ><a v-else class="btn btn-secondary" @click="moveTo(0)"
              >View details &raquo;</a
            >
          </p>
        </div>
        <!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <v-icon icon="mdi-crown-outline" size="140" />

          <h2 class="fw-normal">랭킹</h2>
          <p>
            절약의 달인들을 소개하는 랭킹 페이지, 이번 달 소비가 가장 적은
            사람들이 누구인지 확인하세요!
          </p>
          <p>
            <a class="btn btn-secondary" @click="moveTo(1)"
              >View details &raquo;</a
            >
          </p>
        </div>
        <!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <v-icon icon="mdi-bulletin-board" size="140" />

          <h2 class="fw-normal">게시판</h2>
          <p>
            더 나은 미래를 위한 절약의 시작, 자신들만의 비결을 공유해보세요!
          </p>
          <p>
            <a class="btn btn-secondary" @click="moveTo(2)"
              >View details &raquo;</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import router from "@/router/index";

export default {
  setup() {
    const state = reactive({
      account: {
        userno: null,
        name: "",
        money: null,
      },
      form: {
        loginId: "",
        loginPw: "",
      },
    });

    const moveTo = (signal) => {
      if (signal == 0) router.push("/asset");
      else if (signal == 1) router.push("/ranking");
      else if (signal == 3) router.push("/login");
      else router.push("/board");
    };

    return { state, moveTo };
  },
};
</script>

<style scoped>
/* GLOBAL STYLES
-------------------------------------------------- */
/* Padding below the footer and lighter body text */

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}

/* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 32rem;
}

/* MARKETING CONTENT
-------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.list .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
/* rtl:begin:ignore */
.list .col-lg-4 h2 {
  margin-top: 1rem;
}
/* rtl:end:ignore */

/* Featurettes
------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
/* rtl:begin:remove */
.featurette-heading {
  letter-spacing: -0.05rem;
}

/* rtl:end:remove */

/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>
