<template>
   <div class="container my-4" style="width: 800px">
      <div class="card">
         <div class="card-body">
                <span class="question">
                    {{ currentQuestion + 1 }} / {{ quizRef.length }}
                </span>
            <h5 class="card-title text-center">{{ currentQuestionData.text }}</h5>
            <div class="mx-4 card-text">
               <form ref="checkForm">
                  <div class="form-check" v-for="answer in currentQuestionData.answers">
                     <input class="form-check-input" type="radio" v-model="pickedId" name="flexRadioDefault"
                            :id="`flexRadioDefault_${answer.id}`" :value="answer.id">
                     <label class="form-check-label" :for="`flexRadioDefault_${answer.id}`">
                        {{ answer.text }}
                     </label>
                  </div>
               </form>
            </div>
            <div class="text-center">
               <button
                   class="btn btn-primary"
                   v-show="currentQuestion + 1 < quizRef.length"
                   @click="handleNextQuestion"
               >
                  Следующий вопрос
               </button>
               <div
                   v-show="currentQuestion + 1 === quizRef.length">
                  <button
                      class="btn btn-primary btn-success"
                      v-if="submitButtonVisible && !showResults"
                      @click="handleQuizSubmit"
                  >
                     Завершить тест
                  </button>
                  <div
                      v-else-if="!submitButtonVisible && !showResults"
                      class="spinner-border"
                      role="status"
                  ></div>
                  <button
                      class="btn btn-secondary"
                      v-else-if="submitButtonVisible && showResults"
                      @click="closeResults"
                  >
                     Перейти к списку
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>

   <!-- Modal -->
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title fs-5" id="exampleModalLabel">Результат</h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeResults">
               </button>
            </div>
            <div class="modal-body">
               <div v-show="showResults">
                  <p>Правильных ответов: {{resultsData.correct}}</p>
                  <p>Правильных ответов (%): {{resultsData.score}}%</p>
               </div>
               <div v-show="!showResults">
                  <div
                      class="spinner-border"
                      role="status">
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeResults">
                     Перейти к списку
               </button>
            </div>
         </div>
      </div>
   </div>

</template>

<script lang="ts">

import {defineComponent, onMounted, ref, Ref} from "vue";
import * as rp from "@/background/repository/repository";
import {useRoute} from "vue-router";
import router from "@/render/router";
const lodash = require('lodash');

//@ts-ignore
import { Modal } from 'bootstrap'

export default defineComponent({
   name: "QuizList",
   setup() {
      const route = useRoute();

      const quizId: Ref = ref(null)
      const myModal: Ref = ref(null)
      const submitButtonVisible: Ref = ref(true)
      const showResults: Ref = ref(false)
      const resultsData: Ref = ref([])
      const quizRef: Ref = ref([])
      const pickedId: Ref = ref(null)
      const checkForm: Ref = ref(null)
      const currentQuestionData: Ref = ref([])
      const currentQuestion: Ref = ref(0)
      const startQuiz: Ref = ref(false)
      const answers: Ref = ref([])

      onMounted(() => {
         rp.makeRequest(
             rp.getQuiz(
                 route.query.id
             )
         ).then((data: any) => {
            data.questions.forEach((question: any) => {
               question.answers = lodash.shuffle(question.answers);
            })

            data.questions = lodash.shuffle(data.questions);

            quizRef.value = data.questions
            quizId.value = data.quiz[0].id
            currentQuestionData.value = quizRef.value[0]
         }).catch((err) => {
            console.log(err)
         });
      })

      const handleNextQuestion = () => {
         if (!pickedId.value) {
            alert('Выберите ответ')
            return
         }
         answers.value.push({questionId: currentQuestionData.value.id, answerId: pickedId.value})
         pickedId.value = null;
         // options = lodash.shuffle(options.value);
         currentQuestion.value += 1;
         currentQuestionData.value = quizRef.value[currentQuestion.value]
      }

      const closeResults = () => {
         myModal.value.hide();
         setTimeout(() => {
            router.push('/')
         }, 100)
      }

      const handleQuizSubmit = () => {
         if (!pickedId.value) {
            alert('Выберите ответ')
            return
         }
         answers.value.push({questionId: currentQuestionData.value.id, answerId: pickedId.value})
         pickedId.value = null;

         submitButtonVisible.value = !submitButtonVisible.value

         // const payload = {quizId: quizId.value, answers: { ...answers.value}}

         rp.makeRequest(
             rp.checkResults(
                 quizId.value,
                 answers.value
             )
         ).then((data: any) => {
            showResults.value = true;
            resultsData.value = data;

            myModal.value = new Modal('#exampleModal')
            myModal.value.show();


            submitButtonVisible.value = !submitButtonVisible.value
         }).catch((err) => {
            console.log(err)
            submitButtonVisible.value = !submitButtonVisible.value
         });
      }


      return {
         quizRef,
         pickedId,
         currentQuestion,
         currentQuestionData,
         checkForm,
         startQuiz,
         closeResults,
         handleNextQuestion, handleQuizSubmit,
         submitButtonVisible,
         showResults, resultsData
      };
   },

   components: {}

});
</script>


<style lang="scss" scoped>

</style>
