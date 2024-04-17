import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    database: process.env.DATABASE_CONNECTION,
    jwtSecret: process.env.SECRET_VALUE,
    dataBaseConnection: process.env.DATABASE_CONNECTION,
    secretValue: process.env.SECRET_VALUE,
    emailServicePassword: process.env.SMTP_PASSWORD,
    emailServiceUserName: process.env.SMTP_USERNAME,
    mailHost: process.env.MAIL_HOST,
    baseUrl: process.env.BASE_URL,
  };
});
