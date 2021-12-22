import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';

import { ApiErrorCodeEnum } from '../enums/ApiErrorCodeEnum';
import { GenericReturnMessages } from '../enums/GenericReturnMessages';
import { IApiReturn } from '../interfaces/IApiReturn';
import { IError } from '../interfaces/IError';
import { Response } from 'express';

/**
 * FILTRO DE EXCESSOES
 * Classe mae a ser extendida por classes que implementam a funcionalidade de filtros de excessao.
 *
 * @author Germano Junior
 * @see https://docs.nestjs.com/exception-filters
 */
export class GlobalExceptionFilters implements ExceptionFilter {
  /** @var {Response} Objeto resposta do Express (usado para gerar retorno para as falhas). */
  protected res!: Response | null;

  /** @var {string} Path da requisicao na qual ocorreu a falha. */
  protected endpoint!: string;

  /** @var {HttpMethodEnum} Metodo com que foi feita a requsicao na qual ocorreu a falha. */
  protected httpMethod!: string;

  /** @var {any} Excecao atual sendo tratada. */
  protected exception: any;

  /** @var {number} Codigo do erro tratado (caso identificado). */
  protected errorCode!: number;

  /** @var {HttpStatus} Status de retorno de api gerado. */
  protected responseStatus!: HttpStatus;

  /** @var {IApiReturn} Corpo do retorno de api gerado. */
  protected responseBody!: IApiReturn;

  /** @var {string} Mensagem de log a ser emitida antes de gerar o retorno da api. */
  protected infoLogMsg!: string;

  /**
   * Trata e gera retorno adequado em caso de lancamento de excessoes durante execucao da api.
   *
   * @param {HttpException} exception
   * @param {ArgumentsHost} host
   * @return {void}
   */
  catch(exception: any, host: ArgumentsHost): void {
    this.resetParams();

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    this.res = ctx.getResponse();

    this.endpoint = req.url;
    this.httpMethod = req.method;
    this.exception = exception;

    this.treatException();
  }

  /**
   * Gera retorno da api, efetivamente, e log de notificacao (se houver mensagem de log a ser emitida).
   * @return {void}
   */
  protected sendResponse(): void {
    if (this.res) this.res.status(this.responseStatus).send(this.responseBody);
  }

  /**
   * Estabelece tratamento para falhas genericas ou inesperadas lancadas de qualquer local da api.
   *
   * @return {void}
   */
  protected treatGeneralAndUnexpectedErrors(): void {
    // Falha de Validacao
    if (this.exception.status === HttpStatus.BAD_REQUEST) {
      if (!this.exception.response) {
        return this.returnInvalidJsonError(this.exception.message);
      } else {
        return this.returnValidationError(this.exception.response.message);
      }
    }

    // Falha de Validacao
    if (
      !!this.exception.code &&
      this.exception.code === ApiErrorCodeEnum.INVALID_INPUT
    ) {
      return this.returnValidationError();
    }

    // Falha inesperada
    console.log(this.exception);
    const returnBody: IApiReturn = { message: GenericReturnMessages.ERR_500 };

    if (this.res)
      this.res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(returnBody);
  }

  /** Executa tratamento customizado para falhas capturadas. */
  protected treatException(): void {
    this.treatGeneralAndUnexpectedErrors();
  }

  /** Reseta valores para que nenhuma filtragem nao interfira nas outras. */
  private resetParams(): void {
    this.res = null;
    this.endpoint = '';
    this.httpMethod = '';
    this.exception = null;
    this.errorCode = 0;
    this.responseStatus = HttpStatus.UNAUTHORIZED;
    this.responseBody = {};
    this.infoLogMsg = '';
  }

  /**
   * Gera retorno padrao para falha do tipo: Erro de validacao.
   * @return {void}
   */
  private returnValidationError(errors?: IError[]): void {
    errors = errors || this.exception.errors;

    this.infoLogMsg = `Invalid input error: Endpoint: "${this.endpoint}" | Method: ${this.httpMethod}`;
    this.responseStatus = HttpStatus.BAD_REQUEST;

    this.responseBody = {
      code: ApiErrorCodeEnum.INVALID_INPUT,
      message: GenericReturnMessages.ERR_INVALID_INPUT,
      errors,
    };

    this.sendResponse();
  }

  /**
   * Gera retorno padrao para falha do tipo: JSON Invalido.
   * @param {{}} message
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  private returnInvalidJsonError(message: {}): void {
    this.infoLogMsg = '';
    this.responseStatus = HttpStatus.BAD_REQUEST;
    this.responseBody = message;
    this.sendResponse();
  }
}
