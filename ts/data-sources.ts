import 'dotenv/config'
import 'reflect/metadata'
import {DataSource} from 'typeorm'

const port = process.env.DB_PORT as number undefined

  export const AppDataSource = new DataSource({
})

  //falta terminar !!!!!!!!!! 