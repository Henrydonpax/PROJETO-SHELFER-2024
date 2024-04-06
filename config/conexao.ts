import { Client} from 'pg';

export default (db:any) => {

 db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bancosistema',
  password: 'postgres',
  port: 5432,
});

}




