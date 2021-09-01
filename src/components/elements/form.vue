<template>
  <ValidationObserver ref="formValidator" v-slot="{ handleSubmit, reset, invalid, errors }" tag="div">
    <form
      v-bind="attrs"
      novalidate="novalidate"
      @submit.prevent="
        handleSubmit(onSubmit);
        showNotify();
      "
      @reset.prevent="reset"
    >
      <slot :invalid="invalid" :errors="errors" />
    </form>
  </ValidationObserver>
</template>

<script>
import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';
export default Vue.extend({
  components: {
    ValidationObserver,
  },
  props: ['method', 'customClass', 'id', 'notify'],
  computed: {
    attrs() {
      return {
        id: this.id,
        class: this.customClass,
        method: this.method,
      };
    },
  },
  methods: {
    async showNotify() {
      let valid = await this.validate();
      if (this.notify && !valid) {
        this.$notify({
          group: 'top-center',
          type: 'error',
          text: this.notify,
          duration: 5000,
        });
      }
    },
    onSubmit() {
      return this.$emit('submit');
    },
    validate() {
      return this.$refs.formValidator.validate();
    },
    setErrors(errors) {
      this.$refs.formValidator.setErrors(errors);
    },
    reset() {
      requestAnimationFrame(() => {
        this.$refs.formValidator.reset();
      });
    },
  },
});
</script>