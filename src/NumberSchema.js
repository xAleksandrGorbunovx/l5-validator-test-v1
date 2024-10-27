export default class NumberSchema {
  validator = (value) => typeof value === 'number' && !Number.isNaN(value);

  constructor(validators = []) {
    this.validators = [this.validator, ...validators];
  }

  isValid(value) {
    return this.validators.every((oneOfArrayValidator) => oneOfArrayValidator(value) === true);
  }

  even() {
    const validatorEven = (value) => value % 2 === 0;
    return new NumberSchema([validatorEven]);
  }

  odd() {
    const validatorOdd = (value) => value % 2 !== 0;
    return new NumberSchema([validatorOdd]);
  }
}
