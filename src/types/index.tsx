export interface ImageType {
  id?: string;
  tag: string;
  area: string;
  position: number;
  imageUrl: string;
  responsiveMode: string;
}

export interface TextType {
  id?: string;
  area: string;
  text: string;
  updatedAt?: Date;
  created_at?: Date;
  position: string;
  titulo: string | null;
}

export interface QuestionType{
  id: string;
  question: string;
  response: string;
}
export interface ValueType{
  id: string;
  valor: string;
  titulo: string;
}

export interface CreateOrcamentoReqBody {
  nome: string;
  tipo: string;
  data: string;
  email: string;
  texto: string;
  telefone: string;
  limpeza: boolean;
  convidados: number;
  seguranca: boolean;
  horarioFim: string;
  trafegoCanal: string;
  horarioInicio: string;
  conheceEspaco: boolean;
  recepcionista: boolean;
}

export interface IBase64Files {
  fileName: string;
  base64String: unknown;
}
export interface BugdetType {
  id?: string;
  nome: string;
  email: string;
  dataFim: Date;
  texto: string;
  total: number;
  telefone: string;
  feedback: string;
  dataInicio: Date;
  limpeza: boolean;
  contato: boolean;
  valorBase: number;
  convidados: number;
  seguranca: boolean;
  trafegoCanal: string;
  conheceEspaco: boolean;
  recepcionista: boolean;
  qtdHorasExtras: number;
  valorHoraExtra: number;
  aprovadoAr756: boolean;
  aprovadoCliente: boolean;
}
