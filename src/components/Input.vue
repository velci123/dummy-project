<script setup lang="ts">
import { ErrorObject } from '@vuelidate/core'

interface InputProps {
    label?: string
    type: string
    placeholder: string
    modelValue: string
    errors?: ErrorObject[]
}

defineProps<InputProps>()

</script>

<template>
    <div class="flex flex-col gap-2">
        <label v-if="label" class="font-bold">{{ label }}</label>
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', (($event.target as HTMLInputElement).value))"
            @focus="$emit('inputFocused')"
            :type="type"
            :placeholder="placeholder"
            class="border rounded h-[40px] px-2">
        <p v-for="error in errors" :key="error.$uid" class="text-red-500 text-sm">{{ error.$message }}</p>
    </div>
</template>