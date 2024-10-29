import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import sendOrcamentoEmail from "@/action/emailOrcamento";
import { ChangeEvent, useEffect, useState } from "react";
import { ConsultarFormData } from "./types/consultarFormZodType";
import { consultarFormSchema } from "./schemas/consultarFormZodSchema";

export default function UseConsultaFormHooks(orcamento?: any | undefined) {
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
      termosAceito: false,
      nome: orcamento?.nome,
      texto: orcamento?.texto,
      email: orcamento?.email,
      limpeza: orcamento?.limpeza,
      telefone: orcamento?.telefone,
      seguranca: orcamento?.seguranca,
      convidados: orcamento?.convidados.toString(),
      trafegoCanal: orcamento?.trafegoCanal,
      recepcionista: orcamento?.recepcionista,
      conheceEspaco: orcamento?.conheceEspaco,
      data: orcamento?.dataInicio.toLocaleString().split("T")[0],
      horarioFim: orcamento?.dataFim.toLocaleString().split("T")[1].slice(0, 5),
      horarioInicio: orcamento?.dataInicio
        .toLocaleString()
        .split("T")[1]
        .slice(0, 5),
    },
  });

  const nomeWatch = watch("nome");
  const emailWatch = watch("email");
  const limpezaWatch = watch("limpeza");
  const telefoneWatch = watch("telefone");
  const segurancaWatch = watch("seguranca");
  const convidadosWatch = watch("convidados");
  const horarioFimWatch = watch("horarioFim");
  const horarioInicioWatch = watch("horarioInicio");
  const recepcionistaWatch = watch("recepcionista");

  async function handleOnSubmit(values: ConsultarFormData) {
    setIsSendMailLoading(true);

    const orcamento = await sendOrcamentoEmail(values);

    if (orcamento.id) {
      setIsSendMailSucess(true);
    }
    setIsSendMailLoading(false);

    return orcamento;
  }

  const handleStartHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, minutes] = e.target.value.split(":");

    setValue("horarioInicio", e.target.value);
    trigger("horarioInicio");

    const addHour = parseInt(hour) + 7;
    const hourToSet = addHour < 22 ? addHour : 22;
    const minutesToSet = addHour >= 22 ? "00" : minutes;
    setValue("horarioFim", `${hourToSet}:${minutesToSet}`);
  };

  const handleEndHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("horarioFim", e.target.value);
  };

  useEffect(() => {
    if (convidadosWatch >= 30) {
      setValue("limpeza", true);
      setValue("recepcionista", true);
    }
    if (convidadosWatch >= 70) {
      setValue("limpeza", true);
      setValue("seguranca", true);
      setValue("recepcionista", true);
    }

    return () => {
      if (convidadosWatch > 30) {
        setValue("limpeza", true);
        setValue("recepcionista", true);
      }
      if (convidadosWatch > 70) {
        setValue("limpeza", true);
        setValue("seguranca", true);
        setValue("recepcionista", true);
      }
    };
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
    limpezaWatch,
    handleSubmit,
    telefoneWatch,
    handleOnSubmit,
    segurancaWatch,
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
