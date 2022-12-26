<template>
    <div>
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
            <div class="carousel-item active">
                <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

                <div class="container">
                <div class="carousel-caption text-middle">
                    <h1 v-if="$store.state.account.userno">{{state.account.name}}</h1>
                    <p>Some representative placeholder content for the first slide of the carousel.</p>
                    <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
                </div>
                </div>
            </div>
            
            </div>
        </div>
        <div class="container list">

            <div class="row">
            <div class="col-lg-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" fill="currentColor" class="bi bi-1-circle" viewBox="0 0 16 16">
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/>
                </svg>
                <h2 class="fw-normal">Ranking</h2>
                <p><a class="btn btn-secondary" @click="moveTo(0)">View details &raquo;</a></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                <h2 class="fw-normal">Write</h2>
                <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
                <p><a class="btn btn-secondary" @click="moveTo(1)">View details &raquo;</a></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                <h2 class="fw-normal">Heading</h2>
                <p>And lastly this, the third column of representative placeholder content.</p>
                <p><a class="btn btn-secondary" @click="moveTo(2)">View details &raquo;</a></p>
                <!-- href="#" -->
            </div><!-- /.col-lg-4 -->
            </div><!-- /.row -->


        </div><!-- /.container -->
    </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import store from "@/store/store";
import router from "@/router/index";
export default {
  setup() {
    const state = reactive({
      account: {
        userno: null,
        name: "",
        money: null
      },
      form: {
        loginId: "",
        loginPw: ""
      }
    });
    

    const moveTo = (signal) => {
      if(signal == 0)
        router.push('/asset');
      else router.push('/signup');
    }

    const submit = () => {

      axios.post("/api/account", state.form).then((res) => {
        alert("로그인 성공");
        state.account = res.data;
        store.commit('setAccount', res.data);
        router.push({path: "/"});
      }).catch(() => {
        alert("로그인 실패");
      });
    };

    axios.get("/api/account/").then((res) => {
      state.account = res.data;
    });

    return { state, submit, moveTo };
  }
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
  letter-spacing: -.05rem;
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