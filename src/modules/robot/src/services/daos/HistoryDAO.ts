import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HistoryModel } from '../../models/HistoryModel';

/**
 * DAO (Data Access Object) do histórico de status do robô. Acesso ao banco.
 * @author Germano Junior
 */

@Injectable()
export class HistoryDAO {
  constructor(
    @InjectRepository(HistoryModel)
    private readonly _historyRepository: Repository<HistoryModel>,
  ) {}

  async create(history: HistoryModel): Promise<HistoryModel | undefined> {
    return await this._historyRepository.save(history);
  }

  async find(withDeleted = false, where: any = null): Promise<HistoryModel[]> {
    if (where === null)
      return await this._historyRepository.find({ withDeleted });
    else return await this._historyRepository.find({ withDeleted, where });
  }
}
