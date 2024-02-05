export function calcQtdHoraExtra(mediaHoras: number, duracaoFesta: number) {
  const horasExtras = duracaoFesta > 8 ? duracaoFesta - 8 : 0;
  return horasExtras;
}
