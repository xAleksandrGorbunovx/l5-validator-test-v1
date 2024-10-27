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

  maxDepth(max) {
    const validatorMaxDepth = (values) => {
      const iter = (element, depth = -1) => {
        if (!Array.isArray(element)) {
          return depth;
        }
        const result = element.map((value) => iter(value, depth + 1));
        return Math.max(...result);
      };
      return iter(values) <= max;
    };
    return new ArraySchema([validatorMaxDepth]);
  }
}
