import pino from 'pino'

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        translateTime: 'yyyy-mm-dd HH:MM:ss:l', // Format the date in a human-readable format
        messageFormat: '[{module}] {msg}', // Custom format including the module
        ignore: 'pid,hostname,module', // Ignore certain fields
      },
    },
  ],
})

export const baseLogger = pino(
  {
    level: 'info',
    redact: [],
    serializers: {
      error: pino.stdSerializers.err,
      err: pino.stdSerializers.err,
    },
    base: undefined,
  },
  transport
)
