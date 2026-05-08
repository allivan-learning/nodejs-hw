import pino from 'pino-http';

export const logger = pino({
  transport: {
    target: 'pino-pretty', // делает логи читаемыми в консоли
  },
});
