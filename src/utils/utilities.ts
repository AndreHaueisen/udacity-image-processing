import express from 'express';
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

export { parseMeasurement, setContentDispositionHeader };
