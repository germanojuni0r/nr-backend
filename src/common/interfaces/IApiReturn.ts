import { ApiErrorCodeEnum } from '../enums/ApiErrorCodeEnum';
import { IError } from './IError';
import { IResponseDTO } from './IResponseDTO';

/**
 * INTERFACE
 * Padroniza corpo do retorno json gerado pela api do sistema.
 *
 * @author Germano Junior
 */
export interface IApiReturn<DataType = IResponseDTO> {
  code?: ApiErrorCodeEnum;
  message?: string;
  errors?: IError[];
  data?: DataType;
}
