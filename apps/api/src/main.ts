import nodeProcess from 'node:process'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { baseLogger } from './utils/logger'

const logger = baseLogger.child({ module: 'main' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  )

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })

  const port = nodeProcess.env.PORT || 3001
  await app.listen(port)
  logger.info(`API server is running on ${port}`)
}

bootstrap()
