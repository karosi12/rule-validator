import dotenv from 'dotenv';

dotenv.config();

const config = {
  serverDetails: {
    port: process.env.PORT,
    hostName: process.env.HOSTNAME,
  },
};

export default config;
