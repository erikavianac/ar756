export interface ImageType {
  id?: string;
  tag: string;
  area: string;
  position: number;
  imageUrl: string;
  responsiveMode: string;
}

export interface ImageRequestResponse {
  success: boolean,
  message: string,
  data: { imagesByTag: ImageType[] },
  count: number,
  type: string
}

export interface ServiceType {
  id: string;
  name: string;
  price: number;
  venueId: string;
}

export interface ServiceRequestResponse {
  success: boolean,
  message: string,
  data: { serviceList: ServiceType[] },
  count: number,
  type: string
}

export interface TextType {
  id?: string;
  area: string;
  title: string | null;
  text: string;
  updatedAt?: Date;
  created_at?: Date;
  position: string;
}

export interface TextRequestResponse {
  success: boolean,
  message: string,
  data: { textList: TextType[] },
  count: number,
  type: string
}
export interface QuestionRequestResponse {
  success: boolean,
  message: string,
  data: { questionList: QuestionType[] },
  count: number,
  type: string
}
export interface ProposalRequestResponse {
  success: boolean,
  message: string,
  data: ProposalType,
  count: number,
  type: string
}

export interface ProposalService {
  id?: string;
  serviceId: string;
  proposalId: string;
  service: ServiceType;
  proposal: ProposalType;
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
    date: string,
    completeClientName:string,
    venueId: string,
    endHour: string,
    whatsapp: string,
    startHour: string,
    guestNumber: string,
    description: string,
    knowsVenue: boolean,
    email: string,
    userId: string,
    serviceIds: string[],
    totalAmountInput: string,
    type: "PRODUCTION" | "BARTER"| "OTHER"| "EVENT", 
    trafficSource: "AIRBNB"| "GOOGLE"| "INSTAGRAM"| "TIKTOK"| "OTHER"| "FRIEND"| "FACEBOOK"
}

export interface IBase64Files {
  fileName: string;
  base64String: unknown;
}
export interface ProposalType {
  id?: string;
  cep?: string;
  cpf?: string;
  rg?: string;
  cnpj?: string;
  completeClientName: string;
  completeCompanyName: string;
  city?: string;
  endDate: Date;
  email: string;
  paid: boolean;
  state?: string;
  street?: string;
  streetNumber?: string;
  startDate: Date;
  venueId: string;
  updatedAt: Date;
  createdAt: Date;
  whatsapp: string;
  contact: boolean;
  approved: Boolean;
  basePrice: number;
  amountPaid: number;
  description: string;
  totalAmount: number;
  knowsVenue: boolean;
  guestNumber: number;
  completeName: string;
  streetnumber?: string;
  neighborhood?: string;
  extraHoursQty: number;
  extraHourPrice: number;
  termsAccepted: boolean;
  proposalServices: ProposalService[]
  type: "EVENT" | "OTHER" | "BARTER" | "PRODUCTION"
  trafficSource: "AIRBNB" | "GOOGLE" | "INSTAGRAM" | "TIKTOK" | "OTHER" | "FRIEND" | "FACEBOOK"
}