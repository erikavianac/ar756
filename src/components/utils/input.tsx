import { capitalize } from '@/functions/capitalize';
import React, { InputHTMLAttributes } from 'react';
import {
  Path,
  PathValue,
  FieldValues,
  UseFormTrigger,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';


interface InputProps<T extends FieldValues> extends InputHTMLAttributes<any> {
  title: string;
  entity: string;
  errors: boolean;
  classNameInput?: string;
  classNameLable?: string;
  trigger: UseFormTrigger<T>;
  register: UseFormRegister<T>;
  errorsMsg: string | undefined;
  setValue?: UseFormSetValue<T>;
  errorInPlaceHolder?: boolean;
}

export default function InputComponent<T extends FieldValues>({
  entity,
  title,
  errors,
  trigger,
  register,
  setValue,
  errorsMsg,
  classNameInput,
  classNameLable,
  errorInPlaceHolder,
  ...rest
}: InputProps<T>) {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <label
        htmlFor="nome"
        className={`font-semibold  text-[12px] md:text-[15px] ${classNameLable}`}
      >
        {capitalize(title)}
      </label>
      <input
        {...rest}
        placeholder={errors && errorInPlaceHolder ? errorsMsg :capitalize(title)}
        {...register(`${entity}` as Path<T>, {
          onChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (setValue) {
              const value = rest.type === "number" ? Number(e.target.value) : e.target.value;
              setValue(`${entity}` as Path<T>, e.target.value as PathValue<T, Path<T>>);
            }
            await trigger(`${entity}` as Path<T>);
          },
        })}
        className={`
                w-full
                ${errors && errorInPlaceHolder && "placeholder-red-700" }
                p-3
                rounded-md
                font-light
                bg-white
                border-2
                outline-none
                transition
                text-[12px] md:text-[15px]
                ${errors && 'border-[1px] border-red-700 '}`}
      />
      {!errorInPlaceHolder && <span className="text-red-700 text-[11px] md:text-[15px] w-full">{errors && errorsMsg}</span>}
    </div>
  );
}
