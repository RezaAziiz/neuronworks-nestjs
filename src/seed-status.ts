import { DataSource } from 'typeorm';
import { Status } from './modules/users/entities/user-status.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Aziiz_4321',
  database: 'neuron_db',
  entities: [Status],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Status);

  const data = [
    { id: 1, description: 'active' },
    { id: 2, description: 'pending' },
    { id: 3, description: 'inactive' },
  ];

  for (const d of data) {
    const exist = await repo.findOne({ where: { id: d.id } });
    if (!exist) {
      await repo.save(repo.create(d));
    }
  }
  await AppDataSource.destroy();
  console.log('Status seeded!');
}

seed();