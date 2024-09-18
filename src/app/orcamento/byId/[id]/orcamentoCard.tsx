"use client";

import React, { useEffect, useState } from "react";
import { BugdetType, ValueType } from "@/types";
import moment from "moment-timezone";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { BiMailSend, BiTrash } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnimation, motion } from "framer-motion";
import { CreateAprovaOrcamentoFormData } from "@/formhook/types/orcamentoFormZodType";
import { creatOrcamentoFormSchema } from "@/formhook/schemas/orcamentoFormZodSchema";
import { IBase64Files } from "@/types";
import CurrencyFormat from "react-currency-format";
import { convertFileToBase64 } from "@/functions/covertBase64";
import { SelectBooleansItemsCompoenent } from "@/components/utils/selectBooleansItems";
import { ButtonComponent } from "@/components/utils/button";
import { opacityHidde, opacityShow, shakeAnimation } from "@/constants";
import { ImageComponent } from "@/components/utils/image";
import Link from "next/link";
import { updateOrcamentoActionServer } from "@/action/updateOrcamento";
import InfoOrcamentoinfo from "./inforcamentoinfo";
import LoadingOrcamentoComponent from "./loadingOrcamento";

interface OrcamentoCardProps {
  orcamentoByid: BugdetType | undefined;
  valuesList: ValueType[];
}

export default function OrcamentoCardComponent({
  orcamentoByid,
  valuesList
}: OrcamentoCardProps) {
  const [duracaoFesta, setduracaoFesta] = useState<number>(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [
    isSendEmailOrcamentoAprovadoClienteSuccess,
    seIsSendEmailOrcamentoAprovadoClienteSuccess,
  ] = useState(false);
  const [isSendFeedbackEmailSuccess, seIsSendFeedbackEmailSuccess] =
    useState(false);
  const [formMode, setformMode] = useState<
    "DESCRITIVO" | "DOCUMENTO" | "SUCCESS" | "FEEDBACK"
  >("DESCRITIVO");

  const feedbackForm = formMode?.includes("FEEDBACK");
  const documentoForm = formMode?.includes("DOCUMENTO");
  const decsritivoForm = formMode?.includes("DESCRITIVO");

  const controlsSuccess = useAnimation();
  const controlsFeedback = useAnimation();
  const controlsDescritivo = useAnimation();
  const controlsDocuemntos = useAnimation();

  const {
    watch,
    trigger,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAprovaOrcamentoFormData>({
    resolver: zodResolver(creatOrcamentoFormSchema),
  });

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const updatedFiles = Array.from(files) as File[];
      setUploadedFiles((prevFiles: File[]) => [...prevFiles, ...updatedFiles]);
      const base64Files: IBase64Files[] = [];

      for (let i = 0; i < updatedFiles.length; i++) {
        // Usar updatedFiles em vez de uploadedFiles
        const file = updatedFiles[i]; // Usar updatedFiles em vez de uploadedFiles
        const base64String = await convertFileToBase64(file);
        base64Files.push({ base64String: base64String, fileName: file.name });
      }

      // Adicionar os arquivos em base64 ao campo "documentos" usando setValue
      setValue("documentos", base64Files);
      trigger("documentos");
    }
  }

  function handleFileRemove(index: number) {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  }

  async function handleOnSubmit(data: CreateAprovaOrcamentoFormData) {
    setIsLoading(true);
    if (data.aprovadoCliente && orcamentoByid) {
      const aprovarOrcamneto: BugdetType = await updateOrcamentoActionServer({
        ...orcamentoByid,
        aprovadoCliente: true,
      });
      if (aprovarOrcamneto.id) {
   
        seIsSendEmailOrcamentoAprovadoClienteSuccess(true);
      }
    }
    if (data.feedback && orcamentoByid) {
      const updateFeedbackOrcamento: BugdetType =
        await updateOrcamentoActionServer({
          ...orcamentoByid,
          feedback: data.feedback,
        });
      if (updateFeedbackOrcamento.id) {
     
        seIsSendFeedbackEmailSuccess(true);
      }
    }
    setIsLoading(false);
  }

  const aprovadoWatch = watch("aprovadoCliente");

  useEffect(() => {
    setIsLoading(true)
    if (orcamentoByid?.id) {
      setValue("orcamentoId", orcamentoByid?.id);
    }
    setIsLoading(false)
  }, [orcamentoByid?.id, setValue]);

  useEffect(() => {
    setValue("documentos", undefined);
    setValue("feedback", undefined);
  }, [orcamentoByid?.id, setValue]);

  useEffect(() => {
    if (
      isSendEmailOrcamentoAprovadoClienteSuccess ||
      isSendFeedbackEmailSuccess
    ) {
      setformMode("SUCCESS");
      controlsFeedback.start(opacityHidde);
      controlsDocuemntos.start(opacityHidde);
      controlsSuccess.start(opacityShow);
    }
  }, [
    setformMode,
    isSendEmailOrcamentoAprovadoClienteSuccess,
    isSendFeedbackEmailSuccess,
    controlsFeedback,
    controlsDocuemntos,
    controlsSuccess,
  ]);

  useEffect(() => {
    if (orcamentoByid) {
      const date1 = moment(orcamentoByid?.dataInicio);
      const date2 = moment(orcamentoByid.dataFim);
      setduracaoFesta(() => date2.diff(date1, "hours"));
    }
  }, [orcamentoByid]);


  return (
    <motion.div
      initial={{
        x: 0,
      }}
      animate={{
        x: decsritivoForm
          ? 0
          : documentoForm
          ? "-100%"
          : feedbackForm
          ? "-200%"
          : "-300%",
        transition: {
          duration: feedbackForm ? 0.3 : 0.5,
        },
      }}
      className="flex flex-1"
    >
      <motion.div
        initial={{
          x: 0,
        }}
        animate={controlsDescritivo}
        className="flex flex-col w-full min-w-full"
      >
        <p className="flex items-center justify-center w-full text-2xl font-semibold">
          SIMULACAO
        </p>
        <div className="flex items-center justify-center w-full mt-10 gap-x-5">
          <div className="flex items-center justify-center gap-x-2">
            <SlPeople size={20} />
            <p className="text-[12px] md:text-sm">
              ({orcamentoByid?.convidados})
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <AiOutlineClockCircle size={20} />
            <p className="text-[12px] md:text-sm">{`${
              orcamentoByid?.dataInicio &&
              moment.utc(orcamentoByid?.dataInicio).format("HH:mm")
            } - ${
              orcamentoByid?.dataFim && moment.utc(orcamentoByid?.dataFim).format("HH:mm")
            } (${duracaoFesta}hrs)`}</p>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <AiOutlineCalendar size={20} />
            <p className="text-[12px] md:text-sm">
              ({moment.utc(orcamentoByid?.dataInicio).format("DD/MM/YYYY")})
            </p>
          </div>
        </div>
        {
          orcamentoByid ? 
          <InfoOrcamentoinfo valuesList={valuesList} orcamentoById={orcamentoByid} /> :
          <LoadingOrcamentoComponent />
        }
        <div className="flex items-center justify-between w-full mt-10 gap-x-3 ">
          <p>Total:</p>
          <div className="flex space-x-1">
            <CurrencyFormat
              value={orcamentoByid?.total}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2} // Define o número de casas decimais
              fixedDecimalScale={true}
              prefix={"R$ "}
              className="font-semibold text-[25px]"
            />
            <p className="text-[30px]">*</p>
          </div>
        </div>
        <p className="text-[14px] mb-5">
          {" "}
          <span className="text-[12px]">*</span> Valor sujeito a alteração.
        </p>
        {orcamentoByid?.aprovadoCliente ? (
          <div className="text-[12px] md:text-sm">
            <p className="py-10">
              Maravilha! Estamos analisando o seu interesse, entraremos em
              contato.Obrigado!
            </p>
          </div>
        ) : (
          <>
          <div className="text-sm flex justify-start items-center gap-x-3 py-10">
            <p>Tem alguma dúvida ou gostaria de conversar com a gente?</p>
          

          <a href="https://api.whatsapp.com/send/?phone=351933679073&text&type=phone_number&app_absent=0" target="_blank" className="rounded-md animate-bounce hover:scale-105 duration-200 text-[#128C7E] font-semibold flex justify-start items-center gap-x-1"> <p>Falar no WhatsApp</p> <FaWhatsapp/></a>

          </div>
       {/*      <SelectBooleansItemsCompoenent
              title="Aprovar?"
              setValue={setValue}
              field={"aprovadoCliente"}
              trigger={trigger}
              watch={watch}
              listOptions={["Sim", "Nao"]}
              errors={!!errors.aprovadoCliente}
              errorsMsg={errors?.aprovadoCliente?.message}
            />
            <motion.div className="flex items-center justify-end">
              <ButtonComponent
                icon={<HiArrowRight size={20} />}
                onClick={async () => {
                  const isAprovadoValid = await trigger("aprovadoCliente");
                  if (isAprovadoValid && aprovadoWatch === true) {
                    setformMode("DOCUMENTO");
                    controlsDescritivo.start(opacityHidde);
                    controlsDocuemntos.start(opacityShow);
                  } else if (isAprovadoValid && aprovadoWatch === false) {
                    setformMode("FEEDBACK");
                    controlsDescritivo.start(opacityHidde);
                    controlsFeedback.start(opacityShow);
                  } else {
                    controlsDescritivo.start(shakeAnimation);
                  }
                }}
                type="button"
                className={`
                  z-30
                  text-[15px]
                  tracking-[3px] text-black
                  transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                  flex justify-center items-center flex-row-reverse  gap-x-2 mb-5
                  `}
              />
            </motion.div> */}
          </>
        )}
      </motion.div>
      <motion.form
        initial={{
          x: 0,
          opacity: 0,
        }}
        animate={controlsDocuemntos}
        className="flex flex-col w-full min-w-full "
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex gap-x-4">
          <label htmlFor="rgPhotos" className="font-semibold text-[15px]">
            Documentos (RG):
          </label>
        </div>
        <div className="flex flex-col space-y-2 overflow-y-auto max-h-[550px] relative flex-1">
          <input
            type="file"
            id="rgPhotos"
            className="absolute opacity-0 cursor-pointer top-4"
            onChange={handleFileChange}
            multiple
          />
          <div className="h-16 w-full border-gray-400 border-dotted border-spacing-3 border-[2px] flex justify-start items-center px-5 gap-x-5 cursor-pointer hover:bg-gray-100 transition duration-300">
            <MdOutlineAddPhotoAlternate className="text-gray-600" size={25} />
            <p className="text-[12px] md:text-sm font-semibold text-gray-600 ">
              ADICIONE DOCUMENTO
            </p>
          </div>
          <span className="text-red-700 text-[15px] w-full">
            {errors && errors.documentos?.message}
          </span>
          <div className="max-h-[150px] flex  gap-y-2 flex-col">
            {uploadedFiles?.map((file: File, index: number) => (
              <div
                key={index}
                className="px-2 py-2 rounded-sm border-gray-400 border-[2px] flex w-full justify-between items-center"
              >
                {file.type.startsWith("image/") && ( // Verifica se o arquivo é uma imagem
                  <ImageComponent
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    h="h-10"
                    w="w-10"
                    containerClassname="mr-2"
                  />
                )}
                <p className="tex-sm">{file.name} </p>
                <ButtonComponent
                  icon={<BiTrash className="text-gray-400" />}
                  type="button"
                  className="flex items-center justify-center rounded-full hover:bg-gray-200 "
                  onClick={() => handleFileRemove(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <motion.div className="flex items-end justify-between w-full mb-5">
          <ButtonComponent
            icon={<HiArrowLeft size={20} />}
            onClick={async () => {
              setformMode("DESCRITIVO");
              controlsDescritivo.start(opacityShow);
              controlsDocuemntos.start(opacityHidde);
            }}
            type="button"
            className={`
                        z-30
                        text-[15px]
                        tracking-[3px] text-black
                        transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                        flex justify-center items-center flex-row-reverse  gap-x-2 mb-5
                        `}
          />
          <ButtonComponent
            title={isLoading ? "ENVIANDO" : "ENVIAR"}
            icon={<BiMailSend size={20} />}
            type="submit"
            onClick={async () => {
              const isValid = await trigger("documentos");

              // Dispara a validação dos campos
              if (!isValid) {
                controlsDocuemntos.start(shakeAnimation);
              }
            }}
            className={`
                       ${isLoading && "animate-pulse"} 
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
        </motion.div>
      </motion.form>
      <motion.form
        initial={{
          x: 0,
          opacity: 0,
        }}
        animate={controlsFeedback}
        className="flex flex-col w-full min-w-full"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex flex-col flex-1 mt-3 gap-y-2">
          <label htmlFor="nome" className="font-semibold text-[15px]">
            Deixe-nos seu feedback :
          </label>
          <textarea
            className={`bg-gray-50 outline-none rounded-md w-full h-[350px] p-2 ${
              errors.feedback && "border-[1px] border-red-700"
            }`}
            {...register("feedback", {
              onChange: () => trigger("feedback"),
            })}
          ></textarea>
          <span className="text-red-700 text-[15px] w-full">
            {errors.feedback && errors.feedback.message}
          </span>
        </div>
        <motion.div className="flex items-end justify-between w-full mb-5">
          <ButtonComponent
            icon={<HiArrowLeft size={20} />}
            onClick={async () => {
              setValue("feedback", undefined);
              setformMode("DESCRITIVO");
              controlsDescritivo.start(opacityShow);
              controlsFeedback.start(opacityHidde);
            }}
            type="button"
            className={`
            ${isLoading && "animate-pulse"}
                    z-30
                    text-[15px]
                    tracking-[3px] text-black
                    transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                    flex justify-center items-center flex-row-reverse  gap-x-2 mb-5
                    `}
          />
          <ButtonComponent
            title={isLoading ? "ENVIANDO" : "ENVIAR"}
            icon={<BiMailSend size={20} />}
            type="submit"
            onClick={async () => {
              const isValid = await trigger("feedback");
              // Dispara a validação dos campos
              if (!isValid) {
                controlsFeedback.start(shakeAnimation);
              }
            }}
            className={`
                   ${isLoading && "animate-pulse"}
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
        </motion.div>
      </motion.form>
      <motion.div
        initial={{
          x: 0,
          opacity: 0,
        }}
        animate={controlsSuccess}
        className="relative flex flex-col items-center justify-center min-w-full gap-y-2"
      >
        <Link
          href={"/"}
          className="absolute transition duration-300 rounded-full cursor-pointer top-3 left-3"
        >
          <HiArrowLeft size={20} />
        </Link>
        <ImageComponent
          alt={"logo"}
          h={"h-[130px] md:h-[300px] "}
          w={"w-[180px] md:w-[400px]"}
          src={
            "https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png"
          }
          containerClassname={"z-20"}
        />
        <p className="text-[14px] md:text-[20px] font-semibold text-center w-[430px] ">
          Obrigado {orcamentoByid?.nome} !
        </p>
        <p className="text-[14px] md:text-[16px] font-semibold text-center w-[430px]">
          {isSendEmailOrcamentoAprovadoClienteSuccess
            ? " Em breve nossa equipe entrara em contato."
            : " Agradecemos pelo feedback."}
        </p>
      </motion.div>
    </motion.div>
  );
}
