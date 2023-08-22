<template>
    <div class="page">

        <header class="header">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <router-link class="btn navbar-brand" :to="{path:'/quiz-list'}">
                       Quiz App
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                Пользователь: {{ uName }}
                            </li>
                        </ul>
                    </div>
                    <span class="navbar-text">
                        <button class="btn nav-link active" aria-current="page" @click="clickLogout">Выйти</button>
                    </span>
                </div>
            </nav>
        </header>


        <div class="container">
            <div class="row">
                <div class="col page-content">
                    <Suspense>
                        <router-view/>
                    </Suspense>
                </div>
            </div>
        </div>

    </div>

</template>

<script lang="ts">

import {defineComponent, onMounted, ref, Ref} from "vue";
import {useStore} from "vuex";

export default defineComponent({
    setup() {
        const uName: Ref = ref('uname_placeholder');

        const store = useStore();

        onMounted(() => {
            const uNameVal = localStorage.getItem('username');
            if (uNameVal != null) {
                uName.value = uNameVal;
            }
        })

        const clickLogout = () => {
            store.dispatch("auth/logout");
        }


        return {
            uName,
            clickLogout
        };
    },

    components: {}

});
</script>


<style lang="scss" scoped>

</style>
