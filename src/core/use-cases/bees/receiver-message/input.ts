import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Input {
  @IsUUID()
  @IsNotEmpty()
  sender!: string;

  @IsUUID()
  @IsNotEmpty()
  receiver!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}