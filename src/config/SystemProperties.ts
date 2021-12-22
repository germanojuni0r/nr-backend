/**
 * Classe que define as variaveis do sistema.
 *
 * @author Germano Junior
 */

export class SystemProperties {
  static dbHost(): string | undefined {
    return process.env['DB_HOST'];
  }

  static dbUser(): string | undefined {
    return process.env['DB_USER'];
  }

  static dbPassword(): string | undefined {
    return process.env['DB_PASS'];
  }

  static dbName(): string | undefined {
    return process.env['DB_NAME'];
  }

  static dbPort(): number | undefined {
    const dbPort = process.env['DB_PORT'];
    return !!dbPort ? +dbPort : undefined;
  }
}
