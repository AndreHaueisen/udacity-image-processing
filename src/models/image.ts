import { parseMeasurement } from '../utils/utilities';
import path from 'path';

export default class Image {
  readonly height: number;
  readonly width: number;
  readonly name: string;

  constructor(height: string | undefined, width: string | undefined, name: string) {
    this.height = parseMeasurement(height);
    this.width = parseMeasurement(width);
    this.name = name;
  }

  get sourcePath(): string {
    return path.resolve(__dirname, `../../assets/images/${this.name}.png`);
  }

  get destinationImageName(): string {
    return `${this.name}_${this.width}x${this.height}.png`;
  }

  get destinationPath(): string {
    return path.resolve(__dirname, `../../assets/images_results/${this.destinationImageName}`);
  }
}
