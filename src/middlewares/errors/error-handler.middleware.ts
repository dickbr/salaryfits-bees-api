import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ExistsBeeException } from 'core/exceptions/ExistsBeeException';
import { NotFoundReceiverException } from 'core/exceptions/NotFoundReceiverException';
import { NotFoundSeenderException } from 'core/exceptions/NotFoundSeenderException';
import { FastifyReply } from 'fastify';
import { ErrorHandlerResponse } from './error-handler.response';

@Catch(
  ExistsBeeException,
  NotFoundReceiverException,
  NotFoundSeenderException
)
export class ErrorHandlerMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus() ?? 500;

    const error: ErrorHandlerResponse = {
      type: exception.constructor.name,
      message: status === 500 ? 'Internal Server Error' : exception.message,
    }

    reply.status(status).send(error)
  }
}