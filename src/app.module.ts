import { Module } from '@nestjs/common';
import { ConsumoAguaModule } from './consumo_agua/consumo_agua.module';

@Module({
  imports: [ConsumoAguaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
