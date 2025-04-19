"use client";
import { BeatLoader } from "react-spinners";
import InputComponent from "@/components/utils/input";
import {
  addPersonFormSchema,
  AddPersonFormSchema,
} from "@/formhook/schemas/list-guests-form-zod-schema";
import { ProposalType } from "@/types";
import { CiSearch } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import { shakeAnimation } from "@/constants";
import { stencilFont } from "@/fonts/constants";
import { IoMdSend } from "react-icons/io";
import { FaRegTrashAlt, FaSync } from "react-icons/fa";
import { ModalComponent } from "@/components/utils/modal";
import { updateGuestActionServer } from "@/action/update-guest";
import toast from "react-hot-toast";
import { deleteGuestActionServer } from "@/action/delete-guest";
import { createManyPersonActionServer } from "@/action/create-many-guest";

interface AddGuestFormProps {
  proposal: ProposalType;
}

export default function AddGuestFormComponent({ proposal }: AddGuestFormProps) {
  const {
    register,
    trigger,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddPersonFormSchema>({
    resolver: zodResolver(addPersonFormSchema),
    defaultValues: {
      type: "GUEST",
      rg: "",
      proposalId: proposal?.id,
    },
  });

  const [selectGuest, setselectGuest] = useState<AddPersonFormSchema | null>(
    null
  );
  const [filterList, setFilterList] = useState<string>("");

  const [guestList, setGuestList] = useState<AddPersonFormSchema[]>([
    ...proposal.personList,
  ]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLoadingCreateGuest, setIsLoadingCreateGuest] =
    useState<boolean>(false);

  const onSubmit = async (data: AddPersonFormSchema) => {
    if (!selectGuest && guestList.length >= proposal.guestNumber) {
      toast.error("Número máximo de convidados atingido.");
      return;
    }

    const isValid = await trigger();

    if (isValid) {
      if (selectGuest) {
        if (data.id) {
          try {
            await updateGuestActionServer({
              personId: data.id,
              data,
            });
            toast.success("Convidado atualizado com sucesso!");
          } catch (error) {
            toast.error("Houve um erro ao atualizar o convidado!");
          }
        }
        setGuestList((prev) =>
          prev.map((item) =>
            item.id === selectGuest.id ? { ...data, type: "GUEST" } : item
          )
        );
      } else {
        setGuestList((prev) => [...prev, { ...data, type: "GUEST" }]);
      }
      reset();
      setselectGuest(null);
    } else {
      controlsType.start(shakeAnimation);
    }
  };

  const controlsType = useAnimation();

  const handleSendList = async () => {
    setIsLoadingCreateGuest(true);
    const newItems = guestList.filter((item: AddPersonFormSchema) => !item.id);

    if (newItems.length > 0) {
      try {
        const newPersonList = await createManyPersonActionServer(newItems);
        console.log(newPersonList.data.personList);
        toast.success(`${newPersonList.message}`);
        setGuestList(() => newPersonList.data.personList);
      } catch (error) {
        console.log(error);
        toast.error("Houve um erro ao atualizar o convidado!");
      }
    } else {
      toast.error("Todos convidados da lista estao cadastrados");
    }
    setIsLoadingCreateGuest(false);
  };
  const formRef = React.useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (selectGuest) {
      setValue("name", selectGuest?.name);
      setValue("email", selectGuest?.email);
      setValue("rg", selectGuest?.rg || "");
      if (selectGuest.id) {
        setValue("id", selectGuest?.id);
      }
    }
  }, [selectGuest, setValue]);
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
          Adicionar Convidado
        </h2>
        <InputComponent
          title="Nome"
          entity="name"
          register={register}
          trigger={trigger}
          errors={!!errors.name}
          errorInPlaceHolder={true}
          errorsMsg={errors?.name?.message}
          classNameLable={`text-[14px]`}
        />
        <InputComponent
          title="Email (opcional)"
          entity="email"
          register={register}
          trigger={trigger}
          errorInPlaceHolder={true}
          errors={!!errors.email}
          errorsMsg={errors?.email?.message}
          classNameLable={`font-normal  text-[14px]`}
        />
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
            {selectGuest ? (
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
      </motion.form>

      {/* Lista cresce naturalmente agora */}
      <div className="mt-5 px-5 w-full bg-white rounded-md py-5 shadow-lg mb-10">
        <div className="flex justify-between items-center w-full">
          <h2
            className={`text-[13px] md:text-lg  mb-2 ${stencilFont.className}`}
          >
            Lista de Convidados:{" "}
            {`(${guestList.length}/${proposal.guestNumber})`}
          </h2>
          <button
            disabled={isLoadingCreateGuest}
            onClick={() => {
              handleSendList();
            }}
            className={`${stencilFont.className} text-white md:w-[150px] md:h-[40px] py-1 px-3 md:px-6 md:py-2 transition shadow-lg duration-[350ms] ease-in-out rounded-md bg-green-800 font-light  gap-x-2 hover:scale-105 active:scale-95 flex justify-center items-center`}
          >
            {isLoadingCreateGuest ? (
              <BeatLoader color="white" size={3} />
            ) : (
              <>
                <p className={`text-[13px] md:text-[15px] `}>SALVAR LISTA</p>
                <IoMdSend />
              </>
            )}
          </button>
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
          {guestList?.length > 0 ? (
            guestList?.map((item, index) => {
              if (
                filterList &&
                !item.name.toLowerCase().includes(filterList.toLowerCase())
              ) {
                return null;
              }
              return (
                <>
                  <div
                    key={index}
                    className="p-3 bg-gray-100 rounded  relative shadow-md hover:scale-[1.005] active:scale-[0.98] cursor-pointer transition duration-[350ms] ease-in-out"
                    onClick={() => {
                      setselectGuest(item);
                      scrollToForm();
                    }}
                  >
                    <div
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="absolute right-3 top-3 text-red-900 z-20"
                    >
                      <FaRegTrashAlt />
                    </div>
                    <p>{item.name}</p>
                  </div>
                  {isDeleteModalOpen && (
                    <ModalComponent onClose={() => setIsDeleteModalOpen(false)}>
                      <div className={`bg-white py-3 px-4 rounded-md mx-2 `}>
                        <div className="flex justify-center items-center text-[20px] gap-x-1">
                          <p
                            className={` ${stencilFont.className} text-center`}
                          >
                            Deseja Deletar {selectGuest?.name} da sua lista ?
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-x-4 mt-4">
                          <button
                            onClick={async () => {
                              if (selectGuest?.id) {
                                try {
                                  await deleteGuestActionServer(selectGuest.id);
                                  toast.success(
                                    "Convidado deletado com sucesso!"
                                  );
                                } catch (error) {
                                  toast.error(
                                    "Houve um erro ao deletar o convidado!"
                                  );
                                }
                                const updatedGuestList = guestList.filter(
                                  (guest: AddPersonFormSchema) =>
                                    guest.id !== selectGuest?.id
                                );
                                setGuestList(updatedGuestList);
                                setselectGuest(null);
                                reset();
                                setIsDeleteModalOpen(false);
                              } else {
                                const updatedGuestList = guestList.filter(
                                  (guest: AddPersonFormSchema) =>
                                    guest.name !== selectGuest?.name
                                );
                                setGuestList(updatedGuestList);
                                setselectGuest(null);
                                reset();
                                setIsDeleteModalOpen(false);
                              }
                            }}
                            className={`${stencilFont.className} text-white py-2 px-6 rounded-md bg-black font-light gap-x-2 hover:scale-105 active:scale-95 flex justify-center items-center`}
                          >
                            <p>Sim</p>
                          </button>{" "}
                          <button
                            onClick={() => {
                              setselectGuest(null);
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
