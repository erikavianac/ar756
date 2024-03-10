export function calcDiaria(
  convidados: number,
  ppessoaValue: number,
  tipo: string
) {
  if (tipo === "Festa") {
    let result = 0;

    result += convidados * ppessoaValue;

    return result;
  }

  if (tipo === "Filmagem") {
    let result = 2500;

    if(convidados > 16){
      const extra = 16 - convidados
      return result += extra *  ppessoaValue;
    }else{
      return result;
    }
  }

  return 0
}
