import { parseMeasurement } from '../../utils/utilities';

describe('parseMeasurement', () => {
  it('should return 250 when no measurement is provided', () => {
    const result = parseMeasurement(undefined);
    expect(result).toEqual(250);
  });

  it('should return 250 when a non-number measurement is provided', () => {
    const result = parseMeasurement('foo');
    expect(result).toEqual(250);
  });

  it('should return the parsed measurement when a string number is provided', () => {
    const result = parseMeasurement('500');
    expect(result).toEqual(500);
  });
});
