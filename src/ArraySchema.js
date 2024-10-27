export default class ArraySchema {
  validator = (value) => Array.isArray(value);

  constructor(validators = []) {
    this.validators = [this.validator, ...validators];
  }

  isValid(value) {
    return this.validators.every((oneOfArrayValidator) => oneOfArrayValidator(value) === true);
  }

  length(num) {
    const validatorLength = (value) => (value !== null ? value.length === num : false);
    return new ArraySchema([validatorLength]);
  }
}
