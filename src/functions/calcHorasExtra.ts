export function calcHorasExtras(diaria: number) {
  if (diaria) {
    const valorHoraExtra = diaria / 6;
    return valorHoraExtra;
  }
  return 0;
}
