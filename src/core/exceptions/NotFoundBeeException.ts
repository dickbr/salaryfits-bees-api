import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundBeeException extends HttpException {
  constructor() {
    super({
      type: 'NotFoundCpfException',
      message: 'CPF not found.'
    }, HttpStatus.NOT_FOUND);
  }
}