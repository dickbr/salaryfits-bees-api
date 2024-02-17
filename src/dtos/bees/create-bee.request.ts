import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBeeRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}