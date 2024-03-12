import { ValueType } from "@/types";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { calcExtras } from "@/functions/calcExtra";
import { calcDiaria } from "@/functions/calcDiaria";
import { zodResolver } from "@hookform/resolvers/zod";
import { transformDate } from "@/functions/transformData";
import { calcHorasExtras } from "@/functions/calcHorasExtra";
import { calcDuracaoFesta } from "@/functions/calcDuracaoFesta";
import { calcQtdHoraExtra } from "@/functions/calcQtdHoraExtra";
import { ConsultarFormData } from "./types/consultarFormZodType";
import { consultarFormSchema } from "./schemas/consultarFormZodSchema";
import sendOrcamentoEmail from "@/action/emailOrcamento";
import moment from "moment-timezone";

export default function UseConsultaFormHooks(orcamento?: any | undefined) {
  const [isSendMailSuccess, setIsSendMailSucess] = useState(false)
  const [isSendMailLoading, setIsSendMailLoading] = useState(false)
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
      dataInicio: orcamento?.dataInicio.toLocaleString().split("T")[0],
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

  async function handleOnSubmit({
    nome,
    tipo,
    email,
    texto,
    limpeza,
    telefone,
    seguranca,
    convidados,
    dataInicio,
    horarioFim,
    trafegoCanal,
    horarioInicio,
    recepcionista,
    conheceEspaco,
  }: ConsultarFormData) {
    setIsSendMailLoading(true)
    const { dataFim, dataInicial } = transformDate({
      dataInicio: dataInicio,
      horarioFim: horarioFim,
      horarioInicio: horarioInicio,
    });
  
    const final = new Date (dataFim.toDate())
    const inicial = new Date (dataInicial.toDate())
    
    const duracaoFesta = calcDuracaoFesta(inicial, final);

    const valueList = await fetch(
      `https://art56-server-v2.vercel.app/value/list/`,
      {
        method: "GET",
      }
    ).then(async (resp) => {
      return await resp.json();
    });

    const dataExtra = valueList.map((item: ValueType) => {
      return { titulo: item.titulo, valor: item?.valor };
    });

    const extras = calcExtras(
      {
        limpeza,
        recepcionista,
        seguranca,
      },
      dataExtra.find((item: ValueType) => item?.titulo === "Limpeza")?.valor,
      dataExtra.find((item: ValueType) => item?.titulo === "Seguranca")?.valor,
      dataExtra.find((item: ValueType) => item?.titulo === "Recepcionista")
        ?.valor
    );

    const diaria = calcDiaria(
      convidados,
      dataExtra.find((item: ValueType) => item.titulo === "Por Pessoa")?.valor,
      tipo,
    );

    const qtdHorasExtras = calcQtdHoraExtra(diaria, duracaoFesta);
    const valorHoraExtra = calcHorasExtras(diaria);
    const total = diaria + extras + valorHoraExtra * qtdHorasExtras;
    
    const orcamento =  await sendOrcamentoEmail({
      nome,
      texto,
      email,
      tipo,
      total,
      dataFim: final,
      limpeza,
      telefone,
      seguranca,
      convidados,
      trafegoCanal,
      recepcionista,
      conheceEspaco,
      qtdHorasExtras,
      valorHoraExtra,
      valorBase: diaria,
      dataInicio: inicial,
    });
    console.log(orcamento)
    if(orcamento.id){
      setIsSendMailSucess(true)
    }
    setIsSendMailLoading(false)

    return orcamento;
  }

  const handleStartHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, minutes] = e.target.value.split(":");

    setValue("horarioInicio", e.target.value);
    trigger("horarioInicio");

    const addHour = parseInt(hour) + 6;
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
