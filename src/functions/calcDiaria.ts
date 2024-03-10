export function calcDiaria(
  convidados: number,
  ppessoaValue: number,
  tipo: string
) {
  if (tipo === "Festa") {
    let result = 0;

    result += convidados * ppessoaValue;

    return result < 2500 ? 2500 : result;
  }

  if (tipo === "Filmagem") {
    let result = 0;

    result += convidados * 50;

    return result < 2500 ? 2500 : result;
  }

  return 0
}
