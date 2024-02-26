<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue'
import { useUserStore } from '@/store/user';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n';

const userStore = useUserStore()
const { t } = useI18n()

let formData = reactive({
	name: userStore.user?.name || '',
	email: userStore.user?.email || '',
	phone: '',
	comment: '',
	country: {
		id: '',
		name: ''
	}
})
let countryListIsVisible = ref(false)
let searchTerm = ref('')
let searchResults = ref<Country[] | null>(null)

const rules = {
    name: { required },
    email: { required, email },
    phone: { required },
    comment: { required },
	country: {
		name: { required }
	}
}

const v$ = useVuelidate(rules, formData)

const sendContactForm = (event: Event) => {
	event.preventDefault()
    v$.value.$touch()
    if (v$.value.$invalid) return
	console.log(formData, 'formData')
}

interface Country {
	id: string
	name: string
}

const countryList: Country[] = [
	{ id: "TR", name: t('countries.turkey') },
	{ id: "US", name: t('countries.usa') },
	{ id: "GB", name: t('countries.uk') },
	{ id: "DE", name: t('countries.germany') },
	{ id: "SE", name: t('countries.sweden') },
	{ id: "KE", name: t('countries.kenya') },
	{ id: "BR", name: t('countries.brazil') },
	{ id: "ZW", name: t('countries.zimbabwe') }
]

const selectCountry = (country: Country) => {
	formData.country = country
	searchTerm.value = country.name
	countryListIsVisible.value = false
}

const searchCountry = () => {
	const results = countryList.filter((country: Country) => {
		return country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	})
	searchResults.value = results
}

const getCountries = computed(() => {
	if (searchTerm.value) return searchResults.value
	return countryList
})

</script>

<template>
	<div class="flex justify-center">
		<div class="px-4 py-12 max-w-screen-lg w-full">
			<p class="font-bold text-5xl mb-4">{{ $t('contact_us.title') }}</p>
			<form class="flex flex-col gap-5" @submit="sendContactForm">
				<Input :label="$t('form.name')" :type="'text'" :placeholder="$t('form.name')" v-model="formData.name" :errors="v$.name.$errors" />
				<Input :label="$t('form.email')" :type="'email'" :placeholder="$t('form.email')" v-model="formData.email" :errors="v$.email.$errors" />
				<Input :label="$t('form.phone')" :type="'number'" :placeholder="$t('form.phone')" v-model="formData.phone" :errors="v$.phone.$errors" />
				<div>
					<p class="font-bold mb-2">Select Country</p>
					<Input :placeholder="'Search Country'" :type="'text'" v-model="searchTerm" @inputFocused="countryListIsVisible = true" @input="searchCountry" />
					<p v-for="error in v$.country.$errors" :key="error.$uid" class="text-red-500 text-sm mt-2">{{ error.$message }}</p>
					<div class="relative" v-if="countryListIsVisible">
						<div class="border bg-white absolute top-2 w-full rounded">
							<div v-for="country in getCountries" :key="country.id" class="p-2" @click="selectCountry(country)">
								<p>{{ country.name }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label class="font-bold" for="comment">{{ $t('form.comment') }}</label>
					<textarea id="comment" :placeholder="$t('form.name')" class="border rounded h-[120px] p-2" v-model="formData.comment"></textarea>
					<p v-for="error in v$.comment.$errors" :key="error.$uid" class="text-red-500 text-sm">{{ error.$message }}</p>
				</div>
				<Button :text="$t('form.send')" />
			</form>
		</div>
	</div>
</template>