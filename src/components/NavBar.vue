<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user';
import LoginModal from '@/components/LoginModal.vue';
import LocaleSelector from '@/components/LocaleSelector.vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore()
const route = useRoute()
const { t } = useI18n()

let loginModalOpen = ref(false)
let userDropdownIsOpen = ref(false)

const getPageName = computed(() => {
    if (route.name == 'ContactUs') return t('contact_us.title')
    return "Dummy"
})

const toggleLoginModal = () => {
    loginModalOpen.value = !loginModalOpen.value
}

const toggleUserDropdown = () => {
    userDropdownIsOpen.value = !userDropdownIsOpen.value
}

const logout = () => {
    toggleUserDropdown()
    userStore.logout()
}
</script>

<template>
    <div class="flex justify-center">
        <div class="flex justify-between items-center p-4 max-w-screen-lg w-full">
            <LoginModal v-if="loginModalOpen" @closeModal="toggleLoginModal" />
            <div class="flex items-center gap-3">
                <router-link to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
                </router-link>
                <p class="font-bold text-2xl">{{ getPageName }}</p>
            </div>
            <div class="flex items-center gap-6">
                <router-link to="/contact-us">
                    <p>{{ $t('contact_us.title') }}</p>
                </router-link>
                <LocaleSelector :label="false" />
                <div>
                    <div v-if="userStore.user" class="flex gap-2 items-center relative">
                        <p>{{ userStore.user.name }}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                            @click="toggleUserDropdown"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        <div v-if="userDropdownIsOpen" class="flex flex-col gap-4 border rounded absolute p-4 top-8 right-2 bg-white">
                            <p>{{ userStore.user.email }}</p>
                            <a @click="logout" href="javascript:;" class="font-bold">{{ $t('logout') }}</a>
                        </div>
                    </div>
                    <div v-else @click="toggleLoginModal">
                        <a href="javascript:;">{{ $t('form.login') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>