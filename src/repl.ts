import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

// yarn start -- --entryFile repl
// await get('UserRepository').update({id: 1}, {role: 'user'});
// await get('UserRepository').find()
async function bootstrap() {
  await repl(AppModule);
}

bootstrap();
