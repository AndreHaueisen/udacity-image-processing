import express from 'express';

function parseMeasurement(measurement: string | undefined): number {
  if (!measurement) {
    return 250;
  }

  const parsedMeasurement = parseInt(measurement.toString());
  if (isNaN(parsedMeasurement)) {
    return 250;
  }

  return parsedMeasurement;
}

function setContentDispositionHeader(res: express.Response, fileName: string) {
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
}

export { parseMeasurement, setContentDispositionHeader };
