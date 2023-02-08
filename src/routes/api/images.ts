import express from 'express';
import sharp from 'sharp';

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

  const width = req.query.width;
  const height = req.query.height;

  let parsedWidth: number;
  let parsedHeight: number;

  if (!width || !height) {
    parsedWidth = 250;
    parsedHeight = 250;
  } else {
    parsedWidth = parseInt(width.toString()) || 250;
    parsedHeight = parseInt(height.toString()) || 250;
  }

  const imagePath = `../../../assets/images/${imageName}.png`;
  const destinationPath = `../../../assets/images_results/${imageName}_${parsedWidth}x${parsedHeight}.png`;

  try {
    await sharp(imagePath).resize(parsedWidth, parsedHeight).png().toFile(destinationPath);
  } catch (error) {
    return res.status(500).send({ error: `Sorry, but something went wrong. ${error}` });
  }

  return res.send(`You have chosen ${req.params.imageName}`);
});

export default images;
