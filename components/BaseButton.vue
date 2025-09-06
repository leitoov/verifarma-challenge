<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: 'button' | 'a' // Define si el boton es un <button> o un <a>
  type?: 'button' | 'submit' // Define el tipo de boton (solo si es <button>)
  href?: string // Define el href (solo si es <a>)
  variant?: 'primary' | 'secondary' | 'danger' // Define el estilo del boton
  disabled?: boolean // Define si el boton esta deshabilitado
}>(), {
  as: 'button',
  type: 'button',
  variant: 'primary',
  disabled: false,
})

const base = 'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-60 disabled:pointer-events-none'
const variants: Record<string, string> = {
  primary: 'bg-primary-600 hover:bg-primary-500 text-white',
  secondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/20',
  danger: 'bg-danger-600 hover:bg-danger-500 text-white',
}
</script>

<template>
  <component
    :is="props.as === 'a' ? 'a' : 'button'"
    :type="props.as === 'a' ? undefined : props.type"
    :href="props.as === 'a' ? props.href : undefined"
    :disabled="props.disabled"
    :class="[base, variants[props.variant || 'primary'], 'px-3 py-2']"
  >
    <slot />
  </component>
</template>
