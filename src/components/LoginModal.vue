<script setup lang="ts">
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import LocaleSelector from '@/components/LocaleSelector.vue';
import { reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { useLanguageStore } from '@/store/language';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n';

const userStore = useUserStore()
const languageStore = useLanguageStore()
const { locale } = useI18n()

let formData = reactive({
    name: '',
    email: '',
    password: ''
})

const rules = {
    name: { required },
    email: { required, email },
    password: { required },
}

const v$ = useVuelidate(rules, formData)

const emit = defineEmits(['closeModal'])

const closeModal = () => {
    emit('closeModal')
}

const login = (event: Event) => {
    event.preventDefault()
    v$.value.$touch()
    if (v$.value.$invalid) return
    userStore.user = {
        name: formData.name,
        email: formData.email
    }
    languageStore.selectedLanguage = locale.value
    closeModal()
}
</script>

<template>
    <div class="fixed left-0 top-0 bg-black bg-opacity-40 w-screen h-screen flex justify-center items-center">
        <div class="bg-white rounded shadow-sm p-8 w-full max-w-md flex flex-col gap-5 relative mx-2">
            <div class="absolute top-6 right-6" @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
            <p class="font-bold text-2xl">{{ $t('form.login') }}</p>
            <form class="flex flex-col gap-5" @submit="login">
                <Input :label="$t('form.name')" :type="'text'" :placeholder="$t('form.name')" v-model="formData.name" :errors="v$.name.$errors" />
                <Input :label="$t('form.email')" :type="'email'" :placeholder="$t('form.email')" v-model="formData.email" :errors="v$.email.$errors" />
                <Input :label="$t('form.password')" :type="'password'" :placeholder="$t('form.password')" v-model="formData.password" :errors="v$.password.$errors" />
                <LocaleSelector :label="true" />
                <Button :text="$t('form.login')" />
            </form>
        </div>
    </div>
</template>