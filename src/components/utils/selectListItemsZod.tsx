import React, { useEffect, useState } from 'react';
import {
  FieldValues,
  Path as PathGeneric,
  PathValue as PathValueGeneric,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { BsCheckLg } from 'react-icons/bs';
interface SelectItemProps<T extends FieldValues> {
  title: string;
  field?: string;
  errors: boolean;
  fieldList?: string[];
  listOptions: { dia: string; id: number }[];
  watch: UseFormWatch<T>;
  trigger: UseFormTrigger<T>;
  setValue: UseFormSetValue<T>;
  errorsMsg: string | undefined;
}

export function SelectListItemsZod<T extends FieldValues>({
  title,
  field,
  watch,
  errors,
  trigger,
  setValue,
  fieldList,
  errorsMsg,
  listOptions,
}: SelectItemProps<T>) {
  const filedWatch = watch(field as PathGeneric<T>);

  const [weekDays, setWeekDays] = useState<{ dia: string; id: number }[]>([]);

  useEffect(() => {
    if (filedWatch) {
      trigger(field as PathGeneric<T>);
    }
  }, [filedWatch, trigger, field]);

  useEffect(() => {
    setValue(field as PathGeneric<T>, weekDays as PathValueGeneric<T, PathGeneric<T>>);
  }, [weekDays]);

  return (
    <div
      className={`w-full flex flex-col gap-y-2 text-[15px] animate-openOpacity justify-center items-start  flex-wrap"`}
    >
      <p className="font-semibold ">{title}</p>
      <div className="flex flex-wrap gap-4 text-sm font-light text-veryDarkGraishCyan">
        {listOptions.map((item, i: number) => {
          return (
            <div
              className="flex items-center justify-center gap-2 cursor-pointer "
              key={i}
              onClick={() => {
                if (
                  weekDays.find((object: { id: number; dia: string }) => {
                    return item.id === object.id;
                  })
                ) {
                  setWeekDays((prev) => prev.filter((day) => day.id !== item.id));
                } else {
                  setWeekDays((prev) => {
                    const updatedWeekDays = [...prev, { dia: item.dia, id: item.id }];
                    return updatedWeekDays;
                  });
                }
              }}
            >
              <div
                className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                tabIndex={0}
              >
                {weekDays?.find((data: { id: number; dia: string }) => {
                  return data.id === item.id;
                }) && <BsCheckLg />}
              </div>
              <p>{item.dia[0].toUpperCase() + item.dia.substr(1)}</p>
            </div>
          );
        })}
      </div>
      <span className="text-red-700 text-[15px] w-full">{errors && errorsMsg}</span>
    </div>
  );
}
