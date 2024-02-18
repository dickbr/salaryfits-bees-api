import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundSeenderException extends HttpException {
  constructor() {
    super({
      type: 'NotFoundSeenderException',
      message: 'Não existe um Sender com esse nome.'
    }, HttpStatus.CONFLICT);
  }
}