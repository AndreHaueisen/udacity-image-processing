import express from 'express';
import sharp from 'sharp';

import fs from 'fs';
import Image from '../../models/image';

import { setContentDispositionHeader } from '../../utils/utilities';

const images = express.Router();
const imageOptions = ['midjourney_1', 'midjourney_2', 'midjourney_3', 'midjourney_4'];

images.get('/', (_, res) => {
  res.send('You have the following images to choose from: midjourney_1, midjourney_2, midjourney_3, midjourney_4');
});

images.get('/:imageName', async (req, res) => {
  const image = new Image(req.query.height?.toString(), req.query.width?.toString(), req.params.imageName);

  if (imageOptions.includes(image.name) === false) {
    return res.status(400).send({ error: 'Image name not found' });
  }

  const imageSourcePath = image.sourcePath;
  const destinationImageName = image.destinationImageName;
  const destinationPath = image.destinationPath;

  try {
    if (fs.existsSync(destinationPath)) {
      console.log('File exists, returning cached file');
      setContentDispositionHeader(res, destinationImageName);
      return res.sendFile(destinationPath);
    }

    await sharp(imageSourcePath).resize(image.width, image.height).png().toFile(destinationPath);
  } catch (error) {
    return res.status(500).send({ error: `Sorry, but something went wrong. ${error}` });
  }

  setContentDispositionHeader(res, destinationImageName);
  return res.sendFile(destinationPath);
});

export { images };
