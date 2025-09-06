<script setup lang="ts">

// Componente de input base reutilizable
const props = withDefaults(defineProps<{
  id?: string
  label?: string
  type?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
}>(), {
  type: 'text',
  modelValue: '',
})

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>() // Emitimos el evento para v-model con el valor del input actualizado
const localId = computed(() => props.id || `in-${Math.random().toString(36).slice(2, 9)}`) // Generamos un ID único si no se proporciona uno
</script>

<template>
  <label class="grid gap-1" :for="localId">
    <span v-if="label" class="text-sm">{{ label }}</span>
    <input
      :id="localId"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :required="props.required"
      class="p-2 rounded bg-white/10 border border-white/20 focus:border-primary-500 w-full"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
