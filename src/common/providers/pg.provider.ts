import { Client } from 'pg';

export const pgProvider = [
  {
    provide: 'POSTGRES_CONNECTION',
    useFactory: async () => {
      const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'Pedro2024',
        database: 'gids6082_db',
      });
      await client.connect();
      return client;
    },
  },
];
