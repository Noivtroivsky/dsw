

export function calcularMedia(notas) {
  let soma = 0;
  for (let nota of notas) {
    soma += nota;
  }

  let media = soma / notas.length;
  return media;
}

export function verificarSituacao(media) {
  let situacao = (media >= 6) ? 'Aprovado' : 'DP';
  return situacao;
}

