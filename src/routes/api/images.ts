import express from 'express';

import fs from 'fs';
import Image from '../../models/image';

import { setContentDispositionHeader, resizeImage } from '../../utils/utilities';
import { InvalidMeasurementError, MissingMeasurementError } from '../../erros/measurement_error';

const images = express.Router();
const imageOptions = ['midjourney_1', 'midjourney_2', 'midjourney_3', 'midjourney_4'];

images.get('/', (_, res) => {
  res.send('You have the following images to choose from: midjourney_1, midjourney_2, midjourney_3, midjourney_4');
});

images.get('/:imageName', async (req, res): Promise<express.Response | void> => {
  let image: Image;
  try {
    image = new Image(req.query.height?.toString(), req.query.width?.toString(), req.params.imageName);
  } catch (error) {
    let errorMessage = '';
    if (error instanceof MissingMeasurementError) {
      errorMessage = 'Either width or height are missing';
    } else if (error instanceof InvalidMeasurementError) {
      errorMessage = 'Either width or height are invalid';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Something went wrong';
    }

    return res.status(400).send({ error: errorMessage });
  }

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

    await resizeImage(imageSourcePath, destinationPath, image.width, image.height);
  } catch (error) {
    return res.status(500).send({ error: `Sorry, but something went wrong. ${error}` });
  }

  setContentDispositionHeader(res, destinationImageName);
  return res.sendFile(destinationPath);
});

export { images };
