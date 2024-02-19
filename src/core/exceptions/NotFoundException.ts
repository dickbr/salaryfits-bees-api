import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super({
      type: 'NotFoundException',
      message: 'Não existe um Sender ou Receiver com esse nome.'
    }, HttpStatus.CONFLICT);
  }
}