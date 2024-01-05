import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: process.env.DATABASE_CONNECTION,
    jwtSecret: process.env.SECRET_VALUE,
  };
});
