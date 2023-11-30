function mostrarEntradas() {
    const forma = document.getElementById('forma').value;
    const containerEntrada = document.getElementById('containerEntrada');

    // Limpa os campos de entrada existentes
    containerEntrada.innerHTML = '';

    // Adiciona campos de entrada específicos para a forma escolhida
    switch (forma) {
      case 'circulo':
        containerEntrada.innerHTML = '<label for="raio">Raio:</label><input type="number" id="raio" step="any" required>';
        break;

      case 'troncoPiramide':
        containerEntrada.innerHTML = '<label for="raioInferior">Raio Inferior:</label><input type="number" id="raioInferior" step="any" required>' +
                                      '<br><label for="raioSuperior">Raio Superior:</label><input type="number" id="raioSuperior" step="any" required>' +
                                      '<br><label for="altura">Altura(CM):</label><input type="number" id="altura" step="any" required>';
        break;

      case 'retangulo':
        containerEntrada.innerHTML = '<label for="comprimento">Comprimento:</label><input type="number" id="comprimento" step="any" required>' +
                                      '<br><label for="largura">Largura:</label><input type="number" id="largura" step="any" required>';
        break;

      case 'coroaCirculo':
        containerEntrada.innerHTML = '<label for="raioInterno">Raio Interno:</label><input type="number" id="raioInterno" step="any" required>' +
                                      '<br><label for="raioExterno">Raio Externo:</label><input type="number" id="raioExterno" step="any" required>';
        break;

      case 'trapezioIrregular':
        containerEntrada.innerHTML = '<label for="base1">Base 1:</label><input type="number" id="base1" step="any" required>' +
                                      '<br><label for="base2">Base 2:</label><input type="number" id="base2" step="any" required>' +
                                      '<br><label for="altura">Altura(CM):</label><input type="number" id="altura" step="any" required>';
        break;

      case 'poligonoRegular':
        containerEntrada.innerHTML = '<label for="comprimentoLado">Comprimento do Lado:</label><input type="number" id="comprimentoLado" step="any" required>' +
                                      '<br><label for="numLados">Número de Lados (N):</label><input type="number" id="numLados" step="1" required>';
        break;

      case 'quadrado':
        containerEntrada.innerHTML = '<label for="lado">Lado:</label><input type="number" id="lado" step="any" required>';
        break;

      case 'setorCircular':
        containerEntrada.innerHTML = '<label for="raio">Raio:</label><input type="number" id="raio" step="any" required>' +
                                      '<br><label for="angulo">Ângulo (em graus):</label><input type="number" id="angulo" step="any" required>';
        break;
    }
  }

  function calcularArea() {
    const forma = document.getElementById('forma').value;
    let resultado;

    // Lógica para calcular a área com base na forma escolhida
    switch (forma) {
      case 'circulo':
        const raio = parseFloat(document.getElementById('raio').value);
        resultado = Math.PI * Math.pow(raio, 2);
        break;

      case 'troncoPiramide':
        const raioInferior = parseFloat(document.getElementById('raioInferior').value);
        const raioSuperior = parseFloat(document.getElementById('raioSuperior').value);
        const alturaTroncoPiramide = parseFloat(document.getElementById('altura').value);
        resultado = Math.PI * (Math.pow(raioInferior, 2) + Math.pow(raioSuperior, 2) + (raioInferior * raioSuperior)) * alturaTroncoPiramide / 3;
        break;

      case 'retangulo':
        const comprimento = parseFloat(document.getElementById('comprimento').value);
        const largura = parseFloat(document.getElementById('largura').value);
        resultado = comprimento * largura;
        break;

      case 'coroaCirculo':
        const raioInterno = parseFloat(document.getElementById('raioInterno').value);
        const raioExterno = parseFloat(document.getElementById('raioExterno').value);
        resultado = Math.PI * (Math.pow(raioExterno, 2) - Math.pow(raioInterno, 2));
        break;

      case 'trapezioIrregular':
        const base1 = parseFloat(document.getElementById('base1').value);
        const base2 = parseFloat(document.getElementById('base2').value);
        const alturaTrapezio = parseFloat(document.getElementById('altura').value);
        resultado = ((base1 + base2) / 2) * alturaTrapezio;
        break;

      case 'poligonoRegular':
        const comprimentoLado = parseFloat(document.getElementById('comprimentoLado').value);
        const numLados = parseFloat(document.getElementById('numLados').value);
        resultado = (numLados * Math.pow(comprimentoLado, 2)) / (4 * Math.tan(Math.PI / numLados));
        break;

      case 'quadrado':
        const lado = parseFloat(document.getElementById('lado').value);
        resultado = Math.pow(lado, 2);
        break;

      case 'setorCircular':
        const raioSetor = parseFloat(document.getElementById('raio').value);
        const angulo = parseFloat(document.getElementById('angulo').value);
        resultado = (Math.PI * Math.pow(raioSetor, 2) * (angulo / 360));
        break;

      default:
        resultado = 'Escolha uma forma válida.';
    }

    document.getElementById('resultado').innerHTML = `Área: ${resultado.toFixed(2)}`;
  }