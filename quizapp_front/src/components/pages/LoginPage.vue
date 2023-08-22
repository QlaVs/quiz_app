<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Quiz App</span>
        </div>
    </nav>

   <div class="d-flex justify-content-center mt-5">
      <div class="card">
         <div class="card-body">
            <nav class="d-flex justify-content-center">
               <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button class="nav-link active text-dark" id="login-tab" data-bs-toggle="tab"
                          data-bs-target="#login"
                          type="button" role="tab" aria-controls="login" aria-selected="true">
                     Логин
                  </button>
                  <button class="nav-link text-dark" id="register-tab" data-bs-toggle="tab"
                          data-bs-target="#register"
                          type="button" role="tab" aria-controls="register" aria-selected="false">
                     Регистрация
                  </button>
               </div>
            </nav>

            <div class="tab-content mt-2" id="nav-tabContent" style="min-height: 230px; min-width: 230px">
               <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                  <form ref="loginForm" @submit.prevent="handleLogin">
                     <!-- username -->
                     <div class="form-floating mb-3">
                        <input
                            id="username"
                            class="form-control"
                            type="text"
                            name="username"
                            placeholder="Логин"
                            @keyup.enter="handleLogin"
                            required
                        />
                        <label for="username">Логин</label>
                     </div>

                     <!-- password -->
                     <div class="form-floating mb-2">
                        <input
                            id="password"
                            class="form-control"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            @keyup.enter="handleLogin"
                            required
                        />
                        <label for="password">Пароль</label>
                     </div>


                      <div class="text-center mb-2"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Забыли пароль?</a></div>

                     <!-- submit-->
                     <div class="text-center">
                        <button
                            v-if="submitButtonVisible"
                            type="submit"
                            class="btn btn-primary btn-lg w-100"
                        >
                           Войти
                        </button>
                        <div
                            v-if="!submitButtonVisible"
                            class="spinner-border"
                            role="status"
                        ></div>
                     </div>
                  </form>
               </div>

               <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                  <form ref="registerForm" @submit.prevent="handleRegister">
                     <!-- username -->
                     <div class="form-floating mb-3">
                        <input
                            id="username"
                            class="form-control"
                            type="text"
                            name="username"
                            placeholder="Логин"
                            @keyup.enter="handleRegister"
                            required
                        />
                        <label for="username">Логин</label>
                     </div>

                     <div class="form-floating mb-3">
                        <input
                            id="password"
                            class="form-control"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            @keyup.enter="handleRegister"
                            required
                        />
                        <label for="password">Пароль</label>
                     </div>

                     <div class="form-floating mb-3">
                        <input
                            id="password2"
                            class="form-control"
                            type="password"
                            name="password2"
                            placeholder="Повторите пароль"
                            @keyup.enter="handleRegister"
                            required
                        />
                        <label for="password">Повторите пароль</label>
                     </div>

                     <div class="text-center">
                        <button
                            v-if="submitButtonVisible"
                            type="submit"
                            class="btn btn-primary btn-lg w-100"
                        >
                           Зарегистрироваться
                        </button>
                        <div
                            v-if="!submitButtonVisible"
                            class="spinner-border"
                            role="status"
                        ></div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>

    <footer class="py-3 my-2 fixed-bottom">
        <ul class="nav justify-content-center border-bottom">
            <span class="text-center">
                © QlaVs (Pavel Petrov)
                <a href="https://github.com/QlaVs" class="text-muted link-underline link-underline-opacity-0">
                    <img src="../../../public/github.png" alt="GithubIcon" style="height: 70%"/>
                </a>
            </span>
        </ul>
    </footer>

</template>

<script lang="ts">
import {defineComponent, ref, Ref} from "vue";
import router from "@/render/router";
import * as rp from "@/background/repository/repository";

export default defineComponent({
   components: {},
   emits: ["onAxiosError"],
   async setup() {

      const loginForm: Ref = ref(null);
      const registerForm: Ref = ref(null);
      const submitButtonVisible: Ref = ref(true);

      const handleLogin = () => {
         submitButtonVisible.value = false;

         rp.makeRequest(
             rp.login(
                loginForm.value.username.value,
                loginForm.value.password.value
            )
         ).then((data: any) => {
            submitButtonVisible.value = true;
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', loginForm.value.username.value)
            router.push('/')
         }).catch((err) => {
            submitButtonVisible.value = true;
            if (err.response.status == 400) {
               alert('Неверные данные авторизации')
            }
         });

      }

      const handleRegister = () => {

         if (registerForm.value.password.value != registerForm.value.password2.value) {
            alert('Пароли не совпадают')
            return
         }

         submitButtonVisible.value = false;

         rp.makeRequest(
             rp.register(
                 registerForm.value.username.value,
                 registerForm.value.password.value,
                 registerForm.value.password2.value
             )
         ).then((data: any) => {
            router.go(0)
            submitButtonVisible.value = true;
         }).catch((err) => {
            console.log(err)
            if (err.response.data.password) {
               alert(err.response.data.password)
            }
            submitButtonVisible.value = true;
         });

      }


      return {
         loginForm, registerForm,
         submitButtonVisible,
         handleLogin, handleRegister
      };
   }

});

</script>

<style lang="scss" scoped></style>
