import winston from 'winston'
const { combine, timestamp, prettyPrint, printf} = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

class Logger {
  logger: winston.Logger
  constructor () {
    this.logger = winston.createLogger({
      level: 'info',
      format: combine(
        timestamp(),
        winston.format.json()
      ),
      defaultMeta: { service: 'system-service'},
      transports: [
        new winston.transports.Console({format: combine(
          timestamp(),
          prettyPrint(),
          winston.format.colorize(),
          myFormat,
        )}),
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' })
      ]
    });
  }
  
  log(level:string,message:string) {
    return this.logger.log(level, message);
  }
}



export default new Logger()