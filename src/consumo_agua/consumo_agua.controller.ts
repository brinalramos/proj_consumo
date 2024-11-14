import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo_agua')
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) {}

  @Post()
  registerConsumo(
    @Body('usuarioId') usuarioId: number,
    @Body('quantidadeConsumida') quantidadeConsumida: number,
    @Body('dataLeitura') dataLeitura: Date,
  ): ConsumoAgua {
    return this.consumoAguaService.registerConsumo(usuarioId, quantidadeConsumida, dataLeitura);
  }

  @Get('historico')
  getHistoricoConsumo(
    @Query('usuarioId') usuarioId: number,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ): ConsumoAgua[] {
    return this.consumoAguaService.getHistoricoConsumo(
      usuarioId,
      new Date(dataInicio),
      new Date(dataFim),
    );
  }

  @Get('alerta')
  generateAlert(@Query('usuarioId') usuarioId: number): string {
    return this.consumoAguaService.generateAlert(usuarioId);
  }
}
