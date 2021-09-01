<template>
  <ValidationProvider
    :ref="`inputValidator_${id || componentId}`"
    v-slot="{ errors }"
    :name="name || componentId"
    :rules="rules"
    tag="div"
    :mode="validationMode || 'aggressive'"
    :class="containerClass"
  >
    <div class="text-field">
      <label :for="id || componentId" :class="allLabelClass" v-if="label">
        {{ label }}
        <small v-show="!isRequired" class="text-capitalize text-disabled">
          <i>({{ $t('forms.optional') }})</i>
        </small>
      </label>

      <input
        :id="id || componentId"
        :value="value"
        type="text"
        :class="errors.length > 0 ? classIsInvalid : allClass"
        :placeholder="placeholder || ''"
        :disabled="disabled"
        :ref="id || componentId"
        :tabindex="tabindex"
        @input="onInput($event.target.value)"
        @blur="onBlur($event.target.value)"
        @keyup.enter="$emit('enter')"
      />
      <p v-show="errors.length > 0" class="font-size-small m-0 mt-1 text-danger">
        {{ errors[0] }}
      </p>
    </div>
  </ValidationProvider>
</template>

<script>
import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';
import { randomHexString } from '~/utils/helpers';
export default Vue.extend({
  components: {
    ValidationProvider,
  },
  props: {
    validator: String | undefined,
    disabled: Boolean,
    name: String,
    label: String | undefined,
    id: String | undefined,
    value: String | undefined,
    customClass: String | undefined,
    containerClass: String | undefined,
    labelClass: String | undefined,
    placeholder: String | undefined,
    validationMode: {
      type: String,
      default: 'aggressive',
    },
    autoFocus: Boolean | undefined,
    tabindex: String,
  },
  mounted() {
    if (this.autoFocus) {
      this.focusInput();
    }
  },
  computed: {
    componentId() {
      return this.id || randomHexString(10);
    },
    rules() {
      let rules = this.validator;
      if (!rules) rules = 'max:150';
      else if (typeof rules == 'string' && !rules.includes('max')) {
        rules += '|max:150';
      } else if (typeof rules == 'object' && !rules.hasOwnProperty('max')) {
        rules.max = 150;
      }
      return rules;
    },
    isRequired() {
      const validator = this.validator;
      if (validator === undefined) {
        return false;
      }
      return validator.includes('required');
    },
    classIsInvalid() {
      if (this.customClass === undefined) {
        return 'is-invalid form-control';
      }
      return 'is-invalid form-control ' + this.customClass;
    },
    allClass() {
      if (this.customClass === undefined) {
        return 'form-control';
      }
      return 'form-control ' + this.customClass;
    },
    allLabelClass() {
      let classes = '';
      if (this.labelClass !== undefined) {
        classes += this.labelClass;
      }
      if (this.isRequired) {
        classes += ' required';
      }
      return classes;
    },
  },
  methods: {
    onInput(value) {
      this.triggerValidation(value);
      return this.$emit('input', value);
    },
    onBlur(value) {
      this.triggerValidation(value);
      return this.$emit('blur', value);
    },
    focusInput() {
      const refId = this.id || this.componentId;
      this.$nextTick(() => {
        if (this.$refs[refId] && !this.isTouchDevice()) {
          this.$refs[refId].focus();
        }
      });
    },
    isTouchDevice() {
      return 'ontouchstart' in document.documentElement;
    },
    triggerValidation(value) {
      const refId = `inputValidator_${this.id || this.componentId}`;
      if (this.validationMode && this.validationMode === 'passive' && value) {
        this.$nextTick(() => {
          if (this.$refs[refId]) {
            this.$refs[refId].validate();
          }
        });
      }
    },
  },
});
</script>