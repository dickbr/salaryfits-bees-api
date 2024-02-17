import { IsNotEmpty, IsString } from 'class-validator';

export class Input {
  @IsString()
  @IsNotEmpty()
  sender!: string;

  @IsString()
  @IsNotEmpty()
  receiver!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}