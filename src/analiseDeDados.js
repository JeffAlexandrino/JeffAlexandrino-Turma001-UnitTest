class AnaliseDeDados {
  constructor(dados = []) {
    this.dados = dados; // Array numérico para análise estatística
  }
  
  //Método 1 - adicionar novos dados ao array existente
  adicionarDados(novosDados) {
    if (!Array.isArray(novosDados)) throw new Error("Os dados devem ser um array.");
    this.dados.push(...novosDados);
  }

  //Método 2 -  limpar todos os dados armazenados
  limparDados() {
    this.dados = [];
  }
 
  //Método 3 -  ordenar os dados em ordem crescente
  ordenarDados() {
    return [...this.dados].sort((a, b) => a - b);
  }

  //Método 4 - calcular a média dos dados
  calcularMedia() {
    if (this.dados.length === 0) return null;
    return this.dados.reduce((sum, num) => sum + num, 0) / this.dados.length;
  }

  //Método 5 - calcular a mediana dos dados
  calcularMediana() {
    if (this.dados.length === 0) return null;
    const ordenado = this.ordenarDados();
    const meio = Math.floor(ordenado.length / 2);
    return ordenado.length % 2 === 0 ? (ordenado[meio - 1] + ordenado[meio]) / 2 : ordenado[meio];
  }

  //Método 6 - calcular a moda dos dados
  calcularModa() {
    if (this.dados.length === 0) return null;
    const frequencias = this.dados.reduce((freq, num) => {
      freq[num] = (freq[num] || 0) + 1;
      return freq;
    }, {});

    const maxFrequencia = Math.max(...Object.values(frequencias));
    return Object.keys(frequencias)
      .filter(num => frequencias[num] === maxFrequencia)
      .map(Number);
  }

  //Método 7 - calcular a variância dos dados
  calcularVariancia() {
    if (this.dados.length === 0) return null;
    const media = this.calcularMedia();
    return this.dados.reduce((sum, num) => sum + Math.pow(num - media, 2), 0) / this.dados.length;
  }

  //Método 8 - calcular o desvio padrão dos dados
  calcularDesvioPadrao() {
    const variancia = this.calcularVariancia();
    return variancia !== null ? Math.sqrt(variancia) : null;
  }

  //Método 9 - calcular o coeficiente de variação dos dados
  calcularCoeficienteDeVariacao() {
    const media = this.calcularMedia();
    const desvio = this.calcularDesvioPadrao();
    return media !== 0 ? (desvio / media) * 100 : null;
  }

  //Método 10 - remover outliers dos dados com base no IQR
  removerOutliers(fator = 1.5) {
    const q1 = this.calcularPercentil(25);
    const q3 = this.calcularPercentil(75);
    const iqr = q3 - q1;
    const limiteInferior = q1 - fator * iqr;
    const limiteSuperior = q3 + fator * iqr;
    this.dados = this.dados.filter(num => num >= limiteInferior && num <= limiteSuperior);
  }

  //Método 11 - calcular a correlação entre dois conjuntos de dados
  calcularCorrelacao(outroConjunto) {
    if (!Array.isArray(outroConjunto) || this.dados.length !== outroConjunto.length) return null;
    
    const mediaX = this.calcularMedia();
    const mediaY = outroConjunto.reduce((sum, num) => sum + num, 0) / outroConjunto.length;

    const numerador = this.dados.reduce((sum, x, i) => sum + (x - mediaX) * (outroConjunto[i] - mediaY), 0);
    const denominadorX = Math.sqrt(this.dados.reduce((sum, x) => sum + Math.pow(x - mediaX, 2), 0));
    const denominadorY = Math.sqrt(outroConjunto.reduce((sum, y) => sum + Math.pow(y - mediaY, 2), 0));

    return denominadorX * denominadorY !== 0 ? numerador / (denominadorX * denominadorY) : null;
  }
}

// Exportando a classe para ser usada em outros arquivos ou em testes
module.exports = AnaliseDeDados;