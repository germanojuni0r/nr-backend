'use strict';

import 'dotenv/config';

import { AppModule } from './modules/app/AppModule';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { getConnection } from 'typeorm';

const port = 8080;

const apiStartNotification = `
*******************************
API Running: Nasa Robot API
v0.0.1 - 21/12/2021
Port: ${port}
*******************************
`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      validationError: { target: false },
    }),
  );

  await app.listen(port, async () => {
    try {
      const conn = getConnection('default');
      await conn.runMigrations({ transaction: 'all' });
      console.info(
        '\nChecagem de versionamento do banco de dados concluida com sucesso...',
      );
    } catch (error) {
      app.close();
      console.error(
        '\nFalha ao tentar atualizar versao do banco de dados!\n',
        error,
      );
      throw { error };
    }

    console.info(apiStartNotification);
  });
}
bootstrap();
