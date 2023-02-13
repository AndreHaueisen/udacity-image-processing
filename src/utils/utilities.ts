import express from 'express';
import sharp from 'sharp';
import { MissingMeasurementError, InvalidMeasurementError } from '../erros/measurement_error';

function parseMeasurement(measurement: string | undefined): number {
  if (!measurement) {
    throw new MissingMeasurementError();
  }

  const parsedMeasurement = parseInt(measurement.toString());
  if (isNaN(parsedMeasurement)) {
    throw new InvalidMeasurementError();
  }

  return parsedMeasurement;
}

function setContentDispositionHeader(res: express.Response, fileName: string): void {
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
}

function resizeImage(
  sourcePath: string,
  destinationPath: string,
  width: number,
  height: number
): Promise<sharp.OutputInfo> {
  return sharp(sourcePath).resize(width, height).png().toFile(destinationPath);
}

export { parseMeasurement, setContentDispositionHeader, resizeImage };
