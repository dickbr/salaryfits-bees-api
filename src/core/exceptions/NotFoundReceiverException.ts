import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundReceiverException extends HttpException {
  constructor() {
    super({
      type: 'NotFoundReceiverException',
      message: 'Não existe um Sender com esse nome.'
    }, HttpStatus.CONFLICT);
  }
}