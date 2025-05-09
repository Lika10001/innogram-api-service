import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalValidationPipeConfig } from './configs/validation.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe(globalValidationPipeConfig));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
