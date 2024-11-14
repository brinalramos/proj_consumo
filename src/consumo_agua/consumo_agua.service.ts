import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  private readonly consumos: ConsumoAgua[] = [];

  registerConsumo(usuarioId: number, quantidadeConsumida: number, dataLeitura: Date): ConsumoAgua {
    const consumo = new ConsumoAgua();
    consumo.id = this.consumos.length + 1;
    consumo.usuarioId = usuarioId;
    consumo.quantidadeConsumida = quantidadeConsumida;
    consumo.dataLeitura = dataLeitura;
    this.consumos.push(consumo);
    return consumo;
  }

  getHistoricoConsumo(usuarioId: number, dataInicio: Date, dataFim: Date): ConsumoAgua[] {
    return this.consumos.filter(consumo => 
      consumo.usuarioId === usuarioId &&
      consumo.dataLeitura >= dataInicio &&
      consumo.dataLeitura <= dataFim
    );
  }

  generateAlert(usuarioId: number): string {
    const historico = this.consumos.filter(consumo => consumo.usuarioId === usuarioId);
    
    if (historico.length < 2) {
      return "Não é possível gerar alerta. É necessário ter pelo menos 2 meses registrados para comparação.";
    }

    const ultimoConsumo = historico[historico.length - 1];
    const penultimoConsumo = historico[historico.length - 2];

    if (ultimoConsumo.quantidadeConsumida > penultimoConsumo.quantidadeConsumida) {
      return "Consumo elevado! O consumo deste mês é maior do que o do mês anterior.";
    } else {
      return "Não há consumo elevado. O consumo está dentro dos limites.";
    }
  }
}
