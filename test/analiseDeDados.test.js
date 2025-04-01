const AnaliseDeDados = require('../src/analiseDeDados');

describe('AnaliseDeDados', () => {
  let analise;

  beforeEach(() => {
    analise = new AnaliseDeDados([10, 20, 20, 30, 40]);
  });

  // Teste para o método adicionarDados
  test('adicionarDados deve adicionar novos dados ao array', () => {
    analise.adicionarDados([50, 60]);
    expect(analise.dados).toEqual([10, 20, 20, 30, 40, 50, 60]);
  });

  // Teste para o método limparDados
  test('limparDados deve limpar todos os dados armazenados', () => {
    analise.limparDados();
    expect(analise.dados).toEqual([]);
  });

  // Teste para o método ordenarDados
  test('ordenarDados deve retornar os dados ordenados', () => {
    expect(analise.ordenarDados()).toEqual([10, 20, 20, 30, 40]);
  });

  // Teste para o método calcularMedia
  test('calcularMedia deve calcular a média corretamente', () => {
    expect(analise.calcularMedia()).toBe(24);
  });

  // Teste para o método calcularMediana
  test('calcularMediana deve calcular a mediana corretamente', () => {
    expect(analise.calcularMediana()).toBe(20);
  });

  // Teste para o método calcularModa
  test('calcularModa deve calcular a moda corretamente', () => {
    expect(analise.calcularModa()).toEqual([20]);
  });

  // Teste para o método calcularVariancia
  test('calcularVariancia deve calcular a variância corretamente', () => {
    expect(analise.calcularVariancia()).toBeCloseTo(104, 2);
  });

  // Teste para o método calcularDesvioPadrao
  test('calcularDesvioPadrao deve calcular o desvio padrão corretamente', () => {
    expect(analise.calcularDesvioPadrao()).toBeCloseTo(10.2, 1);
  });

  // Teste para o método calcularCoeficienteDeVariacao
  test('calcularCoeficienteDeVariacao deve calcular o coeficiente de variação corretamente', () => {
    expect(analise.calcularCoeficienteDeVariacao()).toBeCloseTo(42.5, 1);
  });

  // Teste para o método calcularPercentil
  test('calcularPercentil deve calcular o percentil corretamente', () => {
    expect(analise.calcularPercentil(25)).toBe(20);
    expect(analise.calcularPercentil(50)).toBe(20);
    expect(analise.calcularPercentil(75)).toBe(30);
  });

  // Teste para o método removerOutliers
  test('removerOutliers deve remover valores fora do IQR', () => {
    // Cenário com outliers
    analise.adicionarDados([100, 5]);
    analise.removerOutliers();
    expect(analise.dados).toEqual([10, 20, 20, 30, 40]);
  
    // Cenário sem outliers
    analise = new AnaliseDeDados([10, 20, 30, 40, 50]);
    analise.removerOutliers();
    expect(analise.dados).toEqual([10, 20, 30, 40, 50]);
  
    // Cenário com apenas um elemento
    analise = new AnaliseDeDados([100]);
    analise.removerOutliers();
    expect(analise.dados).toEqual([100]);
  
    // Cenário com array vazio
    analise = new AnaliseDeDados([]);
    analise.removerOutliers();
    expect(analise.dados).toEqual([]);
  });

  // Teste para o método calcularCorrelacao
  test('calcularCorrelacao deve calcular a correlação corretamente', () => {
    const outroConjunto = [5, 15, 25, 35, 45];
    expect(analise.calcularCorrelacao(outroConjunto)).toBeCloseTo(1, 1);
  });

  // Teste para o método adicionarDados com erro
  test('adicionarDados deve lançar erro se não for passado um array', () => {
    expect(() => analise.adicionarDados(10)).toThrow('Os dados devem ser um array.');
  });

  // Teste para o método calcularMedia com array vazio
  test('calcularMedia deve retornar null se não houver dados', () => {
    analise.limparDados();
    expect(analise.calcularMedia()).toBeNull();
  });

  // Teste para o método calcularMediana com array vazio
  test('calcularMediana deve retornar null se não houver dados', () => {
    analise.limparDados();
    expect(analise.calcularMediana()).toBeNull();
  });

  // Teste para o método calcularModa com array vazio
  test('calcularModa deve retornar null se não houver dados', () => {
    analise.limparDados();
    expect(analise.calcularModa()).toBeNull();
  });

  // Teste para o método calcularVariancia com array vazio
  test('calcularVariancia deve retornar null se não houver dados', () => {
    analise.limparDados();
    expect(analise.calcularVariancia()).toBeNull();
  });

  // Teste para o método calcularDesvioPadrao com array vazio
  test('calcularDesvioPadrao deve retornar null se não houver dados', () => {
    analise.limparDados();
    expect(analise.calcularDesvioPadrao()).toBeNull();
  });

  // Teste para o método calcularCoeficienteDeVariacao com array vazio
  test('calcularCoeficienteDeVariacao deve retornar null se não houver dados', () => {
    analise.limparDados();
    expect(analise.calcularCoeficienteDeVariacao()).toBeNull();
  });

  // Teste para o método calcularCorrelacao com tamanhos diferentes
  test('calcularCorrelacao deve retornar null se os conjuntos tiverem tamanhos diferentes', () => {
    const outroConjunto = [5, 15, 25];
    expect(analise.calcularCorrelacao(outroConjunto)).toBeNull();
  });
});