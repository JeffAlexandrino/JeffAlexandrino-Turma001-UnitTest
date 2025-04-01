class AnaliseDeDados {
  constructor(dados = []) {
    this.dados = dados;
  }

  adicionarDados(novosDados) {
    if (!Array.isArray(novosDados)) throw new Error("Os dados devem ser um array.");
    this.dados.push(...novosDados);
  }

  limparDados() {
    this.dados = [];
  }
  
  ordenarDados() {
    return [...this.dados].sort((a, b) => a - b);
  }

  calcularMedia() {
    if (this.dados.length === 0) return null;
    return this.dados.reduce((sum, num) => sum + num, 0) / this.dados.length;
  }

  calcularMediana() {
    if (this.dados.length === 0) return null;
    const ordenado = this.ordenarDados();
    const meio = Math.floor(ordenado.length / 2);
    return ordenado.length % 2 === 0 ? (ordenado[meio - 1] + ordenado[meio]) / 2 : ordenado[meio];
  }

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

  calcularVariancia() {
    if (this.dados.length === 0) return null;
    const media = this.calcularMedia();
    return this.dados.reduce((sum, num) => sum + Math.pow(num - media, 2), 0) / this.dados.length;
  }

  calcularDesvioPadrao() {
    const variancia = this.calcularVariancia();
    return variancia !== null ? Math.sqrt(variancia) : null;
  }

  calcularCoeficienteDeVariacao() {
    const media = this.calcularMedia();
    const desvio = this.calcularDesvioPadrao();
    return media !== 0 ? (desvio / media) * 100 : null;
  }

  removerOutliers(fator = 1.5) {
    const q1 = this.calcularPercentil(25);
    const q3 = this.calcularPercentil(75);
    const iqr = q3 - q1;
    const limiteInferior = q1 - fator * iqr;
    const limiteSuperior = q3 + fator * iqr;
    this.dados = this.dados.filter(num => num >= limiteInferior && num <= limiteSuperior);
  }

  calcularCorrelacao(outroConjunto) {
    if (!Array.isArray(outroConjunto) || this.dados.length !== outroConjunto.length) return null;
    
    const mediaX = this.calcularMedia();
    const mediaY = outroConjunto.reduce((sum, num) => sum + num, 0) / outroConjunto.length;

    const numerador = this.dados.reduce((sum, x, i) => sum + (x - mediaX) * (outroConjunto[i] - mediaY), 0);
    const denominadorX = Math.sqrt(this.dados.reduce((sum, x) => sum + Math.pow(x - mediaX, 2), 0));
    const denominadorY = Math.sqrt(outroConjunto.reduce((sum, y) => sum + Math.pow(y - mediaY, 2), 0));

    return denominadorX * denominadorY !== 0 ? numerador / (denominadorX * denominadorY) : null;
  }

  calcularPercentil(percentil) {
    if (this.dados.length === 0) return null;
    const ordenado = this.ordenarDados();
    const pos = (percentil / 100) * (ordenado.length - 1);
    const base = Math.floor(pos);
    const resto = pos - base;
    if (ordenado[base + 1] !== undefined) {
        return ordenado[base] + resto * (ordenado[base + 1] - ordenado[base]);
    } else {
        return ordenado[base];
    }
  }
}

module.exports = AnaliseDeDados;