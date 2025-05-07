import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: String(process.env.DATABASE_PASSWORD),
    database: process.env.DATABASE_NAME,
    synchronize: true,
    autoLoadEntities: true,
};
