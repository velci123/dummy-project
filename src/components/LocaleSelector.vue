<script setup lang="ts">
interface LocaleSelectorProps {
    label?: boolean
}

defineProps<LocaleSelectorProps>()
</script>

<template>
    <div>
        <p v-if="label" class="font-bold mb-2">{{ $t('form.select_locale') }}</p>
        <div class="flex border-black border rounded">
            <div
                class="flex-1 flex items-center justify-center px-2 cursor-pointer"
                :class="{ 'bg-black text-white': $i18n.locale == 'en' }"
                @click="$i18n.locale = 'en'"
            >
                <p>EN</p>
            </div>
            <div
                class="flex-1 flex items-center justify-center px-2 cursor-pointer"
                :class="{ 'bg-black text-white': $i18n.locale == 'tr' }"
                @click="$i18n.locale = 'tr'"
            >
                <p>TR</p>
            </div>
        </div>
    </div>
</template>