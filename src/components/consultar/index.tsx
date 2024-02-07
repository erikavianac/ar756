import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import CloseButtonComponent from "../utils/closeButton";
import UseConsultaFormHooks from "@/formhook/consultarFormHooks";
import InputComponent from "../utils/input";
import { SelectBooleansItemsCompoenent } from "../utils/selectBooleansItems";
import { SelectItemsZodComponent } from "../utils/selectItemsZod";
import { ButtonComponent } from "../utils/button";
import { opacityHidde, opacityShow, shakeAnimation } from "@/constants";
import { ConsultarFormData } from "../../formhook/types/consultarFormZodType";
import { InputMask } from "primereact/inputmask";
import { BsCheckLg } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { BiMailSend } from "react-icons/bi";
import { timesVisitAvailabel } from "@/constants/horarioLista";
import { ImageComponent } from "../utils/image";
import { ImageType } from "@/types";

interface ConsultarFromProps {
  handleCloseReservaModal: () => void;
}

export function ConsultarFormComponent({
  handleCloseReservaModal,
}: ConsultarFromProps) {
  const {
    watch,
    reset,
    errors,
    trigger,
    register,
    setValue,
    nomeWatch,
    emailWatch,
    handleSubmit,
    limpezaWatch,
    segurancaWatch,
    handleOnSubmit,
    convidadosWatch,
    horarioFimWatch,
    isSendMailSuccess,
    isSendMailLoading,
    horarioInicioWatch,
    recepcionistaWatch,
    handleEndHourChange,
    handleStartHourChange,
  } = UseConsultaFormHooks();

  const [formMode, setformMode] = useState<"Pessoais" | "Evento" | "Success">(
    "Pessoais"
  );
  const [imageList, setImageList] = useState<ImageType[] | null>(null);
  const eventoForm = formMode.includes("Evento");
  const pessoaisForm = formMode.includes("Pessoais");

  const controlsEventos = useAnimation();
  const controlsSuccess = useAnimation();
  const controlsPessoais = useAnimation();

  const handleCheckBoxClick = (
    name: "seguranca" | "limpeza" | "recepcionista",
    status: boolean
  ) => {
    setValue(name, !status);
  };

  useEffect(() => {
    if (isSendMailSuccess) {
      controlsEventos.start(opacityHidde);
      controlsSuccess.start(opacityShow);
      setformMode("Success");
    }
  }, [isSendMailSuccess, controlsSuccess]);

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      encType="multipart/form-data"
      className="overflow-hidden min-w-[97%] min-h-[97%] rounded-md md:max-w-[600px] max-w-[390px] w-full   md:max-h-[95%] md:min-h-[95%]
        relative md:rounded-md py-5 px-5 flex flex-col gap-y-5 md:shadow-lg md:mt-2 
        bg-white z-40"
    >
      <CloseButtonComponent handleCloseModal={handleCloseReservaModal} />
      <h1 className="md:text-[21px] w-full  text-[18px] text-center py-5 ">
        {isSendMailSuccess ? "" : "CONSULTAR ORCAMENTO"}
      </h1>
      <motion.div
        initial={{
          x: 0,
        }}
        animate={{
          x: pessoaisForm ? 0 : eventoForm ? "-100%" : "-200%",
          transition: {
            duration: 0.5,
          },
        }}
        className="flex w-full h-full"
      >
        <motion.div
          initial={{
            x: 0,
          }}
          animate={controlsPessoais}
          className="z-50 flex flex-col min-w-full  h-full"
        >
          <div className="flex flex-col flex-1 h-full w-full gap-y-6 ">
            <InputComponent<ConsultarFormData>
              title="nome"
              entity="nome"
              register={register}
              trigger={trigger}
              errors={!!errors.nome}
              errorsMsg={errors?.nome?.message}
            />
            <InputComponent<ConsultarFormData>
              title="email"
              entity="email"
              register={register}
              trigger={trigger}
              errors={!!errors.email}
              errorsMsg={errors?.email?.message}
            />

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="nome"
                className={`font-semibold  text-[12px] md:text-[15px]`}
              >
                Whatsapp
              </label>
              <InputMask
                onChange={(e) => {
                  setValue("telefone", e.target.value as string);
                  trigger("telefone");
                }}
                mask="(99) 99999-9999"
                placeholder="(99) 99999-9999"
                className={`
                w-full
                p-3
                rounded-md
                font-light
                bg-white
                border-2
                outline-none
                transition
                text-[12px] md:text-[15px]
                ${errors.telefone && "border-[1px] border-red-700 "}`}
              />

              <span className="text-red-700 text-[11px] md:text-[15px] w-full">
                {errors && errors.telefone?.message}
              </span>
            </div>
            <SelectBooleansItemsCompoenent
              title="Ja conhece o espaco?"
              setValue={setValue}
              field={"conheceEspaco"}
              trigger={trigger}
              watch={watch}
              listOptions={["Sim", "Nao"]}
              errors={!!errors.conheceEspaco}
              errorsMsg={errors?.conheceEspaco?.message}
            />
            <SelectItemsZodComponent
              title="Onde nos achou?"
              setValue={setValue}
              field={"trafegoCanal"}
              trigger={trigger}
              watch={watch}
              listOptions={[
                "Facebook",
                "TiTok",
                "Instagram",
                "Google",
                "Amigos",
                "Outros",
              ]}
              errors={!!errors.trafegoCanal}
              errorsMsg={errors?.trafegoCanal?.message}
            />
          </div>
          <motion.div className="flex items-end justify-end">
            <ButtonComponent
              title="PROXIMO"
              onClick={async () => {
                const isEmailValid = await trigger("email");
                const isNameValid = await trigger("nome");
                const isTelefoneValid = await trigger("telefone");
                const isTrafegoValid = await trigger("trafegoCanal");
                const isConheceEspacoValid = await trigger("conheceEspaco");
                // Dispara a validação dos campos
                if (
                  isEmailValid &&
                  isNameValid &&
                  isTelefoneValid &&
                  isTrafegoValid &&
                  isConheceEspacoValid
                ) {
                  setformMode("Evento");
                  controlsPessoais.start(opacityHidde);
                  controlsEventos.start(opacityShow);
                  // Define o modo como "DOCS"
                } else {
                  controlsPessoais.start(shakeAnimation);
                }
              }}
              type="button"
              className={`
                mt-5
                z-30
                  w-[200px]
                  h-[55px]
                  text-[15px]
                  tracking-[3px] text-white rounded-md bg-black
                  
                  flex justify-center items-center flex-row-reverse  gap-x-2
                  `}
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{
            x: 0,
            opacity: 0,
          }}
          animate={controlsEventos}
          className="flex flex-col min-w-full gap-y-5"
        >
          <div className="flex-1 w-full">
            <InputComponent<ConsultarFormData>
              title="Data do Evento"
              entity="dataInicio"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              register={register}
              trigger={trigger}
              onKeyDown={(e) => e.preventDefault()}
              errors={!!errors.dataInicio}
              errorsMsg={errors?.dataInicio?.message}
            />
            <div className="flex flex-col mb-2">
              <div className="flex flex-col items-center justify-start md:flex-row gap-x-3">
                <div className="w-full md:w-[50%] flex flex-col gap-y-2 gap-x-3">
                  <p className="font-semibold text-[12px] md:text-[15px]">
                    Horario inicio
                  </p>
                  <select
                    onChange={(e) => handleStartHourChange(e)}
                    className="w-full px-4 py-[23px] transition bg-white border-2 rounded-md outline-none text-[12px] md:text-[15px]"
                  >
                    <option>
                      {horarioInicioWatch ? horarioInicioWatch : "--:--"}
                    </option>
                    {timesVisitAvailabel.map((item: string, index: number) => {
                      const [hour, minutes] = item.split(":");
                      if (parseInt(hour) < 8 || parseInt(hour) > 22) {
                        return;
                      }
                      return (
                        <option
                          key={index}
                          value={item}
                          className="text-[12px] md:text-[15px]"
                        >
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  {errors?.horarioInicio && (
                    <p className="text-red-700 text-[11px] md:text-[15px] w-full">
                      {errors?.horarioInicio?.message}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-y-2 mt-2">
                  <p className="font-semibold text-[12px] md:text-[15px]">
                    Horario fim
                  </p>
                  <select
                    onChange={(e) => handleEndHourChange(e)}
                    disabled={parseInt(horarioFimWatch) >= 22 ? true : false}
                    className="w-full px-4 py-[23px] transition bg-white border-2 rounded-md outline-none text-[12px] md:text-[15px]"
                  >
                    <option>
                      {horarioFimWatch ? horarioFimWatch : "--:--"}
                    </option>
                    {timesVisitAvailabel.map((item: string, index: number) => {
                      const [hour] = item.split(":");
                      if (parseInt(hour) < 8 || parseInt(hour) > 22) {
                        return;
                      }
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  {errors?.horarioFim && (
                    <p className="text-red-700 text-[11px] md:text-[15px] w-full">
                      {errors?.horarioFim?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <InputComponent<ConsultarFormData>
              title="Convidados"
              entity="convidados"
              type="number"
              max={100}
              min={0}
              register={register}
              trigger={trigger}
              errors={!!errors.convidados}
              errorsMsg={errors?.convidados?.message}
            />
            <div className="flex items-center justify-start w-full my-5 gap-x-7 text-[12px] md:text-[15px]">
              <div className="flex items-center justify-center gap-x-3 ">
                <div
                  className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                  onClick={() => {
                    if (convidadosWatch < 30) {
                      handleCheckBoxClick("recepcionista", recepcionistaWatch);
                    }
                  }}
                >
                  {recepcionistaWatch && <BsCheckLg />}
                </div>
                <p className="font-semibold">Recepcionista</p>
              </div>
              <div className="flex items-center justify-center gap-x-3 ">
                <div
                  className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                  onClick={() => {
                    if (convidadosWatch < 30) {
                      handleCheckBoxClick("limpeza", limpezaWatch);
                    }
                  }}
                >
                  {limpezaWatch && <BsCheckLg />}
                </div>
                <p className="font-semibold ">Limpeza</p>
              </div>
              <div className="flex items-center justify-center gap-x-3 ">
                <div
                  className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                  onClick={() => {
                    if (convidadosWatch < 70) {
                      handleCheckBoxClick("seguranca", segurancaWatch);
                    }
                  }}
                >
                  {segurancaWatch && <BsCheckLg />}
                </div>
                <p className="font-semibold ">Seguranca</p>
              </div>
            </div>
            <div className="flex flex-col mt-3 gap-y-2">
              <label
                htmlFor="nome"
                className="font-semibold text-[12px] md:text-[15px]"
              >
                Discorra sobre o evento
              </label>
              <textarea
                className={`bg-gray-50 outline-none rounded-md w-full h-[100px] md:h-[200px] p-2 text-[12px] md:text-[15px] ${
                  errors.texto && "border-[1px] border-red-700"
                }`}
                {...register("texto", { onChange: () => trigger("texto") })}
              ></textarea>
              <span className="text-red-700 text-[11px] md:text-[15px] w-full">
                {errors.texto && errors.texto.message}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-end justify-between">
              <ButtonComponent
                icon={<HiArrowLeft size={20} />}
                onClick={() => {
                  setformMode("Pessoais");
                  controlsEventos.start(opacityHidde);
                  controlsPessoais.start(opacityShow);
                }}
                type="button"
                className={`
                  z-30
                  text-[15px]
                  tracking-[3px] text-black
                  transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                  flex justify-center items-center flex-row-reverse  gap-x-2
                    `}
              />

              <ButtonComponent
                title={isSendMailLoading ? "ENVIANDO" : "ENVIAR"}
                icon={<BiMailSend size={20} />}
                type="submit"
                onClick={async () => {
                  const isValid = await trigger();
                  // Dispara a validação dos campos
                  if (!isValid) {
                    controlsEventos.start(shakeAnimation);
                  }
                }}
                className={`
                    ${isSendMailLoading && "animate-pulse"}
                    z-30
                    w-[200px]
                    h-[55px]
                    text-[15px]
                    tracking-[3px] text-white rounded-md bg-black
                    mt-6
                    transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                    flex justify-center items-center flex-row-reverse  gap-x-2
                  `}
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{
            x: 0,
            opacity: 0,
          }}
          animate={controlsSuccess}
          className="flex flex-col items-center justify-start min-w-full gap-y-2"
        >
          <ImageComponent
            alt={"logo"}
            h={"h-[200px] md:h-[300px] "}
            w={"w-[200px] md:w-[400px]"}
            src={
              "https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png"
            }
            containerClassname={"z-20"}
          />
          <p className="text-[15px] md:text-[20px] font-semibold text-center md:w-[430px] mx-auto ">
            Obrigado {nomeWatch} !
          </p>
          <div className="w-[80%] mx-auto text-center flex flex-col gap-y-5">
            <p className="text-[13px] md:text-[16px] font-semibold text-center md:w-[430px] mx-auto ">
              Encaminhamos para seu email {emailWatch} uma simulacao do
              orcamento do seu evento.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </form>
  );
}
