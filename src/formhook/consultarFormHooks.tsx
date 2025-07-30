import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import sendOrcamentoEmail from "@/action/emailOrcamento";
import { ChangeEvent, useEffect, useState } from "react";
import { ConsultarFormData } from "./types/consultarFormZodType";
import { consultarFormSchema } from "./schemas/consultarFormZodSchema";
import { useRouter } from 'next/navigation';
import { ServiceType } from "@/types";
import { Service } from "@/types/venue";

export default function UseConsultaFormHooks(services: Service[]) {
  const [isSendMailSuccess, setIsSendMailSucess] = useState(false);
  const [isSendMailLoading, setIsSendMailLoading] = useState(false);
  const {
    watch,
    reset,
    trigger,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultarFormData>({
    resolver: zodResolver(consultarFormSchema),
    defaultValues: {
      termsAccepted: false,
      completeClientName: "",
      description: "",
      email: "",
      serviceIds: [],
      whatsapp: "",
      venueId: "8159e209-0057-4df3-ae72-855363c3b84e",
      guestNumber: 0,
      trafficSource: "OTHER",
      knowsVenue: false,
      endHour: "",
      startHour: "",
      date: "",
      type: "EVENT",
    },
  });
  const { push } = useRouter();
  const nomeWatch = watch("completeClientName");
  const emailWatch = watch("email");
  const telefoneWatch = watch("whatsapp");
  const convidadosWatch = watch("guestNumber");
  const horarioFimWatch = watch("endHour");
  const horarioInicioWatch = watch("startHour");
  const recepcionistaWatch = watch("trafficSource");

  async function handleOnSubmit(values: ConsultarFormData) {
    setIsSendMailLoading(true);

    const proposal: any = await sendOrcamentoEmail({
      ...values,
      guestNumber: String(values?.guestNumber),
      userId: "",
      totalAmountInput: "0",
    });

    if (proposal?.id) {
      setIsSendMailSucess(true);
      push(`/orcamento/byId/${proposal?.id}`);
    }
    setIsSendMailLoading(false);

    return proposal;
    console.log(values);
  }

  const handleStartHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, minutes] = e.target.value.split(":");

    setValue("startHour", e.target.value);
    trigger("startHour");

    const addHour = parseInt(hour) + 7;
    const hourToSet = addHour < 22 ? addHour : 22;
    const minutesToSet = addHour >= 22 ? "00" : minutes;
    setValue("endHour", `${hourToSet}:${minutesToSet}`);
  };

  const handleEndHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("endHour", e.target.value);
  };

  useEffect(() => {
    const limpeza = services.find((item: ServiceType) => item.name === "Limpeza")

    const currentServices = watch("serviceIds") || [];

    if (convidadosWatch >= 30 && limpeza) {
      if (!currentServices.includes(limpeza.id)) {
        setValue("serviceIds", [...currentServices, limpeza.id]);
      }
    }
  }, [convidadosWatch, setValue]);

  useEffect(() => {
    const seguranca = services.find((item: ServiceType) => item.name === "Seguranca")
    const recepcionista = services.find((item: ServiceType) => item.name === "Recepcionista")

    const currentServices = watch("serviceIds") || [];

    if (convidadosWatch >= 70) {
      console.log("jorge")
      if (seguranca && !currentServices.includes(seguranca.id)) {
        currentServices.push(seguranca.id);
      }
    
      if (recepcionista && !currentServices.includes(recepcionista.id)) {
        currentServices.push(recepcionista.id);
      }
    }
  }, [convidadosWatch, setValue]);

  return {
    watch,
    reset,
    errors,
    trigger,
    setValue,
    /*sendMail, */
    register,
    nomeWatch,
    emailWatch,
    handleSubmit,
    telefoneWatch,
    handleOnSubmit,
    convidadosWatch,
    horarioFimWatch,
    isSendMailSuccess,
    isSendMailLoading,
    horarioInicioWatch,
    recepcionistaWatch,
    handleEndHourChange,
    handleStartHourChange,
  };
}
