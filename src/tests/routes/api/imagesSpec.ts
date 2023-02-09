import { parseMeasurement } from '../../../routes/api/images';
import app from '../../..';
import request from 'supertest';

describe('/images', () => {
  it('returns instructions when route is /images', async () => {
    const res = await request(app).get('/images');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(
      'You have the following images to choose from: midjourney_1, midjourney_2, midjourney_3, midjourney_4'
    );
  });
});

describe('/images/:imageName', () => {
  it('returns an error when an invalid image name is provided', async () => {
    const res = await request(app).get('/images/invalid_image_name');

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Image name not found');
  });

  it('returns a resized image when a valid image name is provided', async () => {
    const res = await request(app).get('/images/midjourney_1');

    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('image/png');
    console.log(res.header['content-disposition']);
    expect(res.header['content-disposition']).toBe('attachment; filename="midjourney_1_250x250.png"');
  });
});

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