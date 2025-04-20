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
import React, { useEffect, useState } from "react";
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

interface AddGuestFormProps {
  proposal: ProposalType;
  scheduleList: Schedule[];
}

export default function ScheduleFormComponent({ proposal,scheduleList }: AddGuestFormProps) {

  return (
    <div className="w-full bg-transparent px-10 flex flex-col">
      
    </div>
  );
}
