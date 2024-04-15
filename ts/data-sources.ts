import 'dotenv/config'
import 'reflect/metadata'

import { Pool } from 'pg';

class DataSource{
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'bancosistema',
      password: 'postgres',
      port: 5432,
    });
  }

  async connect() {
    
    try {
      await this.pool.connect();
      console.log('Conexão com o banco de dados estabelecida');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  }

  async query(sql: string, params: any[]) {
    
    try {
      const result = await this.pool.query(sql, params);
      return result;
    } catch (error) {
      console.error('Erro ao executar consulta SQL:', error);
      throw error;
    }
  }

  async end() {
    
    try {
      await this.pool.end();
      console.log('Conexão com o banco de dados encerrada');
    } catch (error) {
      console.error('Erro ao encerrar conexão com o banco de dados:', error);
    }
  }
}

export default new DataSource();
