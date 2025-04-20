"use client";
import { BeatLoader } from "react-spinners";
import InputComponent from "@/components/utils/input";
import {
  addPersonFormSchema,
  AddPersonFormSchema,
} from "@/formhook/schemas/list-guests-form-zod-schema";
import { PersonType, ProposalType, Schedule } from "@/types";
import { CiSearch } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import { shakeAnimation } from "@/constants";
import { stencilFont } from "@/fonts/constants";
import { IoMdSend } from "react-icons/io";
import { FaRegTrashAlt, FaSync } from "react-icons/fa";
import { ModalComponent } from "@/components/utils/modal";
import { updatePersonActionServer } from "@/action/update-person";
import toast from "react-hot-toast";
import { deletePersonActionServer } from "@/action/delete-person";
import { createManyPersonActionServer } from "@/action/create-many-guest";
import {
  createScheduleFormSchema,
  CreateScheduleFormSchema,
} from "@/formhook/schemas/create-schedule-form-zod-schema";
import { timesVisitAvailabel } from "@/constants/horarioLista";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from "moment";
import { SlPeople } from "react-icons/sl";
import { createScheduleActionServer } from "@/action/create-schedule";
import { deleteScheduleActionServer } from "@/action/delete-schedule";

interface AddGuestFormProps {
  proposal: ProposalType;
  scheduleList: Schedule[];
}

export default function ScheduleFormComponent({
  proposal,
  scheduleList,
}: AddGuestFormProps) {
  const {
    reset,
    watch,
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateScheduleFormSchema>({
    resolver: zodResolver(createScheduleFormSchema),
    defaultValues: {
      name: "",
      endHour: "",
      startHour: "",
      workerNumber: "0",
      description: "",
      proposalId: proposal?.id,
    },
  });
  const [selectSchedule, setselectSchedule] = useState<Schedule | null>(null);
  const [filterList, setFilterList] = useState<string>("");

  const [scheduleListState, setScheduleListState] = useState<Schedule[]>([
    ...scheduleList,
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLoadingCreateGuest, setIsLoadingCreateGuest] =
    useState<boolean>(false);

  const controlsType = useAnimation();

  const formRef = React.useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (data: CreateScheduleFormSchema) => {
    const isValid = await trigger();

    if (isValid) {
      try {
        const newSchedule = await createScheduleActionServer({
          ...data,
          workerNumber: Number(data.workerNumber),
        });
        toast.success("Atracao criada com sucesso!");
        setScheduleListState((prev) => [...prev, newSchedule.data]);
      } catch (error) {
        toast.error("Houve um erro ao atualizar o convidado!");
      }
    }
  };

  const handleStartHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, minutes] = e.target.value.split(":");

    setValue("startHour", e.target.value);
    trigger("startHour");
  };

  const handleEndHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("endHour", e.target.value);
  };

  const endHourWatch = watch("endHour");
  const startHourWacth = watch("startHour");

  useEffect(() => {
    if (selectSchedule) {
      setValue("name", selectSchedule?.name);
      setValue("endHour", moment.utc(selectSchedule.endHour).format("HH:mm"));
      setValue(
        "startHour",
        moment.utc(selectSchedule.startHour).format("HH:mm")
      );
      setValue("description", selectSchedule?.description);
      setValue("workerNumber", selectSchedule?.workerNumber.toString());
      if (selectSchedule.id) {
        setValue("id", selectSchedule?.id);
      }
    }
  }, [selectSchedule, setValue]);

  return (
    <div className="w-full bg-transparent px-10 flex flex-col">
      <motion.form
        ref={formRef}
        animate={controlsType}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-2 md:py-5 max-w-full mx-auto px-5  items-end w-full bg-white text-lg pt-8 rounded-md shadow-lg py-4"
      >
        <h2
          className={`${stencilFont.className} font-normal text-[25px] text-center w-full mb-3`}
        >
          Adicionar ATRACAO
        </h2>
        <div className="flex flex-col mb-3 w-full">
          <div className="flex flex-col items-center justify-start md:flex-row gap-x-3 gap-y-2">
            <InputComponent
              title="Titulo"
              entity="name"
              register={register}
              trigger={trigger}
              errors={!!errors.name}
              errorInPlaceHolder={true}
              errorsMsg={errors?.name?.message}
              classNameLable={``}
            />
            <InputComponent<CreateScheduleFormSchema>
              title={"Numero de colaboradores"}
              entity="workerNumber"
              type="number"
              max={100}
              min={0}
              register={register}
              trigger={trigger}
              errors={!!errors.workerNumber}
              errorsMsg={errors?.workerNumber?.message}
            />
            <div className="w-full md:w-[50%] flex flex-col gap-x-3">
              <p className="font-semibold text-[12px] md:text-[15px]">
                Horario de inicio
              </p>
              <select
                onChange={(e) => handleStartHourChange(e)}
                className="w-full px-4 py-[23px] transition bg-white border-2 rounded-md outline-none text-[12px] md:text-[15px]"
              >
                <option>{startHourWacth ? startHourWacth : "--:--"}</option>
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
              {errors?.startHour && (
                <p className="text-red-700 text-[11px] md:text-[15px] w-full">
                  {errors?.startHour?.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-[50%] flex flex-col gap-y-2 mt-2">
              <p className="font-semibold text-[12px] md:text-[15px]">
                Horario Fim
              </p>
              <select
                onChange={(e) => handleEndHourChange(e)}
                disabled={parseInt(endHourWatch) >= 22 ? true : false}
                className="w-full px-4 py-[23px] transition bg-white border-2 rounded-md outline-none text-[12px] md:text-[15px]"
              >
                <option>{endHourWatch ? endHourWatch : "--:--"}</option>
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
              {errors?.endHour && (
                <p className="text-red-700 text-[11px] md:text-[15px] w-full">
                  {errors?.startHour?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-3 gap-y-2 w-full">
              <label
                htmlFor="nome"
                className="font-semibold text-[12px] md:text-[15px]"
              >
                Discorra sobre o evento
              </label>
              <textarea
                className={`bg-gray-50 outline-none rounded-md w-full h-[100px] md:h-[200px] p-2 text-[12px] md:text-[15px] ${
                  errors.description && "border-[1px] border-red-700"
                }`}
                {...register("description", {
                  onChange: () => trigger("description"),
                })}
              ></textarea>
              <span className="text-red-700 text-[11px] md:text-[15px] w-full">
                {errors.description && errors.description.message}
              </span>
            </div>
          </div>
          <div className="md:w-[200px] flex justify-end items-end">
            <button
              onClick={async () => {
                const isValid = await trigger();
                if (!isValid) {
                  console.log(errors);
                  controlsType.start(shakeAnimation);
                }

                
              }}
              type="submit"
              className=""
            >
              {selectSchedule ? (
                <div
                  className={`px-4 py-1 rounded-md shadow-md bg-black text-white  md:rounded-md  md:h-[55px] 
                        flex items-center justify-center hover:scale-[1.05] active:scale-[0.90] mt-3 md:mt-0 
                        cursor-pointer transition duration-[350ms] ease-in-out ${stencilFont.className}`}
                >
                  Atualizar
                </div>
              ) : (
                <div
                  className=" rounded-full h-[3rem] w-[3rem] bg-black text-white  md:rounded-md  md:h-[55px] 
                        flex items-center justify-center hover:scale-[1.05] active:scale-[0.90] mt-3 md:mt-0 
                        cursor-pointer transition duration-[350ms] ease-in-out shadow-md"
                >
                  <FaPlus />
                </div>
              )}
            </button>
          </div>
        </div>
      </motion.form>
      <div className="mt-5 px-5 w-full bg-white rounded-md py-5 shadow-lg mb-10">
        <div className="flex justify-between items-center w-full">
          <h2
            className={`text-[13px] md:text-lg  mb-2 ${stencilFont.className}`}
          >
            Lista de Atracoes:{" "}
          </h2>
        </div>
        <div className="rounded-md w-full py-1 mt-3 ">
          <div
            className={`
                w-full
                flex
               justify-start items-center
                p-3
                rounded-md
                font-light
                bg-white
                border-2
                outline-none
                transition
                text-[12px] md:text-[15px]
                gap-x-2
               `}
          >
            <CiSearch size={25} />
            <input
              type="text"
              className="flex-1  outline-none  text-[12px] md:text-[15px]"
              onChange={(e) => setFilterList(e.target.value)}
              value={filterList}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-3 mt-3">
          {scheduleListState?.length > 0 ? (
            scheduleListState?.map((item: Schedule, index: number) => {
              if (
                filterList &&
                !item.name.toLowerCase().includes(filterList.toLowerCase())
              ) {
                return null;
              }
              const date1 = moment(item?.startHour);
              const date2 = moment(item?.endHour);
              const durantion = date2.diff(date1, "hours");

              return (
                <>
                  <div
                    key={index}
                    className="p-3 bg-gray-100 rounded  relative shadow-md hover:scale-[1.005] active:scale-[0.98] cursor-pointer transition duration-[350ms] ease-in-out"
                    onClick={() => {
                      setselectSchedule(item);
                      scrollToForm();
                    }}
                  >
                    <div
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="absolute right-3 top-3 text-red-900 z-20"
                    >
                      <FaRegTrashAlt />
                    </div>
                    <h2 className="w-full text-center text-[18px] font-semibold mt-5">
                      {item.name}
                    </h2>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center justify-center gap-x-2">
                        <AiOutlineClockCircle size={20} />
                        <p className="text-[12px] md:text-sm">{`${
                          item?.startHour &&
                          moment.utc(item?.startHour).format("HH:mm")
                        } - ${
                          item?.endHour &&
                          moment.utc(item?.endHour).format("HH:mm")
                        } (${durantion}hrs)`}</p>
                      </div>
                      <div className="flex items-center justify-center gap-x-2">
                        <SlPeople size={20} />
                        <p className="text-[12px] md:text-sm">
                          ({item.workerNumber})
                        </p>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <p>{item.description}</p>
                    </div>
                  </div>
                  {isDeleteModalOpen && (
                    <ModalComponent onClose={() => setIsDeleteModalOpen(false)}>
                      <div className={`bg-white py-3 px-4 rounded-md mx-2 `}>
                        <div className="flex justify-center items-center text-[20px] gap-x-1">
                          <p
                            className={` ${stencilFont.className} text-center text-[18px]`}
                          >
                            Deseja Deletar {selectSchedule?.name} da sua lista ?
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-x-4 mt-4">
                          <button
                            onClick={async () => {
                              if (selectSchedule?.id) {
                                try {
                                  const deletedSchedule =
                                    await deleteScheduleActionServer(
                                      selectSchedule.id
                                    );
                                  toast.success(
                                    "Atracao deletada com sucesso!"
                                  );
                                  const newScheduleList =
                                    scheduleListState.filter(
                                      (schedule: Schedule) =>
                                        schedule.id !== deletedSchedule?.data.id
                                    );
                                  setScheduleListState(newScheduleList);
                                  setselectSchedule(null);
                                  reset();
                                  setIsDeleteModalOpen(false);
                                } catch (error) {
                                  toast.error(
                                    "Houve um erro ao deletar o convidado!"
                                  );
                                }
                              }
                            }}
                            className={`${stencilFont.className} text-white py-2 px-6 rounded-md bg-black font-light gap-x-2 hover:scale-105 active:scale-95 flex justify-center items-center`}
                          >
                            <p>Sim</p>
                          </button>{" "}
                          <button
                            onClick={() => {
                              /*   setselectGuest(null); */
                              setIsDeleteModalOpen(false);
                            }}
                            className={`${stencilFont.className} text-white  py-2 px-6 rounded-md bg-black font-light gap-x-2 hover:scale-105 active:scale-95 flex justify-center items-center`}
                          >
                            <p>Nao</p>
                          </button>
                        </div>
                      </div>
                    </ModalComponent>
                  )}
                </>
              );
            })
          ) : (
            <p
              className={`w-full flex justify-center items-center ${stencilFont.className} py-5 text-center`}
            >
              {" "}
              Adicione seus convidados!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
