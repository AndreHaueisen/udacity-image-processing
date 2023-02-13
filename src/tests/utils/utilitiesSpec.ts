import { InvalidMeasurementError, MissingMeasurementError } from '../../erros/measurement_error';
import { parseMeasurement, resizeImage } from '../../utils/utilities';
import Image from '../../models/image';

describe('parseMeasurement', () => {
  it('should throw "Measurement is undefined" when no measurement is provided', () => {
    expect(function () {
      parseMeasurement(undefined);
    }).toThrowError(MissingMeasurementError);
  });

  it('should throw "Measurement is not a number" when a non-number measurement is provided', () => {
    expect(function () {
      parseMeasurement('foo');
    }).toThrowError(InvalidMeasurementError);
  });

  it('should return the parsed measurement when a string number is provided', () => {
    const result = parseMeasurement('500');
    expect(result).toEqual(500);
  });
});

describe('resizeImage', () => {
  it('should resize the image', async () => {
    const image = new Image('500', '350', 'midjourney_1');

    const outputInfo = await resizeImage(image.sourcePath, image.destinationPath, image.width, image.height);
    expect(outputInfo.width).toEqual(350);
    expect(outputInfo.height).toEqual(500);
  });

  it('should throw an error when the image does not exist', async () => {
    const image = new Image('500', '350', 'invalid_image');

    try {
      await resizeImage(image.sourcePath, image.destinationPath, image.width, image.height);
    } catch (error) {
      expect((error as Error).message).toEqual(`Input file is missing: ${image.sourcePath}`);
    }
  });
});
