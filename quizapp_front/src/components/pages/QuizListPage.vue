<template>
    <div class="row g-2 mt-2 row-cols-auto">
        <div class="col d-flex align-items-stretch" v-for="quiz in quizDataRef">
            <div class="card" style="width: 25rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ quiz.name }}</h5>
                    <p class="card-text">
                        {{ quiz.description }}
                        <br>
                    </p>

                    <div class="row text-center">
                        <div class="col-12">
                            <router-link class="col-auto text-center btn btn-primary" :to="{path:'/quiz', query: {id: quiz.id} }">
                                Начать тест
                            </router-link>
                        </div>
                        <div class="col-12">
                            Кол-во вопросов: {{ quiz.q_num }}
                        </div>
                        <div class="col-12" v-if="quiz.user_score != null">
                            Предыдущий результат: {{ quiz.user_score }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent, onMounted, ref, Ref} from "vue";
import * as rp from "@/background/repository/repository";
import router from "@/render/router";

export default defineComponent({
    name: "QuizList",
    setup() {
        const quizDataRef: Ref = ref([])

        onMounted(() => {
            rp.makeRequest(
                rp.getQuizList()
            ).then((data: any) => {
                quizDataRef.value = data
            }).catch((err) => {
                console.log(err)
                if (err.response && err.response.status == 401) {
                }
            });
        })

        return {
            quizDataRef
        };
    },

    components: {}

});
</script>


<style lang="scss" scoped>

</style>
