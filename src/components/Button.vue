<script setup lang="ts">
interface ButtonProps {
    text: string
}

defineProps<ButtonProps>()
</script>

<template>
    <button class="bg-black text-white font-bold h-[40px] rounded">{{ text }}</button>
</template>