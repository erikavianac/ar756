import React, { useEffect } from 'react';
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
  listOptions: string[];
  watch: UseFormWatch<T>;
  trigger: UseFormTrigger<T>;
  setValue: UseFormSetValue<T>;
  errorsMsg: string | undefined;
}

export function SelectItemsZodComponent<T extends FieldValues>({
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

  useEffect(() => {
    if (filedWatch) {
      trigger(field as PathGeneric<T>);
    }
  }, [filedWatch, trigger, field]);

  return (
    <div
      className={`w-full flex flex-col gap-y-2  text-[12px] md:text-[15px] animate-openOpacity justify-center items-start  flex-wrap"`}
    >
      <p className="font-semibold ">{title}</p>
      <div className="flex flex-wrap gap-4 text-sm font-light text-veryDarkGraishCyan">
        {listOptions.map((item: string, i: number) => {
          return (
            <div
              className="flex items-center justify-center gap-2 cursor-pointer  text-[12px] md:text-[15px]"
              key={i}
              onClick={() => {
                if (field) {
                  setValue(field as PathGeneric<T>, item as PathValueGeneric<T, PathGeneric<T>>);
                } else {
                  if (fieldList) {
                    const newValue = !filedWatch; // Inverte o valor atual do campo

                    setValue(
                      fieldList[item as keyof typeof fieldList] as PathGeneric<T>,
                      newValue as PathValueGeneric<T, PathGeneric<T>>,
                    );
                  }
                }
              }}
            >
              <div
                className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                tabIndex={0}
              >
                {filedWatch === item && <BsCheckLg />}
              </div>
              <p>{item[0].toUpperCase() + item.substr(1)}</p>
            </div>
          );
        })}
      </div>
      <span className="text-red-700 text-[11px] md:text-[15px] w-full">{errors && errorsMsg}</span>
    </div>
  );
}
