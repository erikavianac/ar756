export function calcDiaria(
  convidados: number,
  ppessoaValue: number,
  tipo: string
) {
  if (tipo === "Festa") {
    let result = 0;

    if(convidados < 25){
      return 2500
    }else{
      const pessoasMais25 = (convidados - 25) * 50

      return 2500 + pessoasMais25
    }
  }

  if (tipo === "Filmagem") {
    if(convidados < 15){
      return 1500
    }else{
      const pessoasMais25 = (convidados - 15) * 50

      return 1500 + pessoasMais25
    }
  }

  return 0
}
