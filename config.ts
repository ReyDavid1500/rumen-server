import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    database: process.env.DATABASE_CONNECTION,
    jwtSecret: process.env.SECRET_VALUE,
  };
});
