import { fileURLToPath } from 'url';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { combine, timestamp, label, printf, colorize } = winston.format;
const logDir = path.join(__dirname, 'logs');

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        label({ label: 'Tobari' }),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            format: colorize()
        }),
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: '%DATE%.log',
            maxFiles: 30,
            zippedArchive: false
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: path.join(logDir, 'error'),
            filename: '%DATE%.error.log',
            maxFiles: 30,
            zippedArchive: false
        })
    ]
});

export default logger;