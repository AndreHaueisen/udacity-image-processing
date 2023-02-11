import express from 'express';

function parseMeasurement(measurement: string | undefined): number {
  if (!measurement) {
    throw new Error('Measurement is undefined');
  }

  const parsedMeasurement = parseInt(measurement.toString());
  if (isNaN(parsedMeasurement)) {
    throw new Error('Measurement is not a number');
  }

  return parsedMeasurement;
}

function setContentDispositionHeader(res: express.Response, fileName: string) {
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
}

export { parseMeasurement, setContentDispositionHeader };
