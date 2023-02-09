import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const images = express.Router();
const imageOptions = ['midjourney_1', 'midjourney_2', 'midjourney_3', 'midjourney_4'];

images.get('/', (_, res) => {
  res.send('You have the following images to choose from: midjourney_1, midjourney_2, midjourney_3, midjourney_4');
});

images.get('/:imageName', async (req, res) => {
  const imageName = req.params.imageName;
  if (imageOptions.includes(imageName) === false) {
    return res.status(400).send({ error: 'Image name not found' });
  }

  const width = req.query.width?.toString();
  const height = req.query.height?.toString();

  const parsedWidth = parseMeasurement(width);
  const parsedHeight = parseMeasurement(height);

  const imagePath = path.resolve(__dirname, `../../../assets/images/${imageName}.png`);
  const fileName = `${imageName}_${parsedWidth}x${parsedHeight}.png`;
  const destinationPath = path.resolve(__dirname, `../../../assets/images_results/${fileName}`);

  try {
    if (fs.existsSync(destinationPath)) {
      console.log('File exists, returning cached file');
      setContentDispositionHeader(res, fileName);
      return res.sendFile(destinationPath);
    }

    await sharp(imagePath).resize(parsedWidth, parsedHeight).png().toFile(destinationPath);
  } catch (error) {
    return res.status(500).send({ error: `Sorry, but something went wrong. ${error}` });
  }

  setContentDispositionHeader(res, fileName);
  return res.sendFile(destinationPath);
});

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

export { images, parseMeasurement };
