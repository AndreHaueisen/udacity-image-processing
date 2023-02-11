import { parseMeasurement } from '../../utils/utilities';

describe('parseMeasurement', () => {
  it('should throw "Measurement is undefined" when no measurement is provided', () => {
    expect(function () {
      parseMeasurement(undefined);
    }).toThrowError('Measurement is undefined');
  });

  it('should throw "Measurement is not a number" when a non-number measurement is provided', () => {
    expect(function () {
      parseMeasurement('foo');
    }).toThrowError('Measurement is not a number');
  });

  it('should return the parsed measurement when a string number is provided', () => {
    const result = parseMeasurement('500');
    expect(result).toEqual(500);
  });
});