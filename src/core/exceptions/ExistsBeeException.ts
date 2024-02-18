import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistsBeeException extends HttpException {
  constructor() {
    super({
      type: 'ExistsBeeException',
      message: 'Já existe uma abelha com esse nome.'
    }, HttpStatus.CONFLICT);
  }
}