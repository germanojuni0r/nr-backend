import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';

import { ApiErrorCodeEnum } from 'src/common/enums/ApiErrorCodeEnum';
import { GlobalExceptionFilters } from 'src/common/exceptions/GlobalExceptionFilter';
import { RobotReturnMessages } from './RobotReturnMessages';

/**
 * FILTRO DE EXCESSOES
 * Filtro para tratar erros & falhas de execucao relacionadas ao módulo do robô
 *
 * @author Germano Junior
 * @see https://docs.nestjs.com/exception-filters
 */
@Catch()
export class RobotExceptionFilter extends GlobalExceptionFilters {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    this.res = ctx.getResponse();

    this.endpoint = req.url;
    this.httpMethod = req.method;
    this.exception = exception;

    if (!this.caughtModuleErrors()) return this.treatException();

    this.sendResponse();
  }

  /**
   * @inheritDoc
   */
  protected caughtModuleErrors(): boolean {
    if (!this.isModuleError()) return false;

    super.sendResponse();
    return true;
  }

  /**
   * Avalia excessao ocorrida neste modulo
   * Se for, gera parametrizacao necessaria para montar o retorno de api apropriado.
   */
  private isModuleError(): boolean {
    let message: string;

    switch (this.exception.code) {
      case ApiErrorCodeEnum.INVALID_INPUT:
        message = RobotReturnMessages.INVALID_COMMAND;

        this.responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      case ApiErrorCodeEnum.OUT_OF_EDGE:
        message = RobotReturnMessages.OUT_OF_EDGE;

        this.responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.infoLogMsg = message;
        this.responseBody = { message };
        break;

      default:
        return false;
    }

    return true;
  }
}
