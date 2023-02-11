class MissingMeasurementError extends Error {
  constructor() {
    super('Missing measurement');
    this.name = 'MissingMeasurementError';
  }
}

class InvalidMeasurementError extends Error {
  constructor() {
    super('Invalid measurement');
    this.name = 'InvalidMeasurementError';
  }
}

export { MissingMeasurementError, InvalidMeasurementError };
