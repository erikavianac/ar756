import React from 'react';
import { BsCheckLg } from 'react-icons/bs';

interface SelectItemProps {
  setType: any;
  field: any;
  title?: string;
  flexRow?: boolean;
  listOptions: string[];
  handleHidden?: boolean;
  className?: string;
}

export default function SelectItemsComponent({ setType, listOptions, field }: SelectItemProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm font-light justify-center items-center">
      {listOptions?.map((item: string, i: number) => {
        return (
          <>
            <div
              className="flex items-center justify-center gap-2 text-white cursor-pointer min-w-[100px] "
              key={item}
              onClick={() => {
                if (item === field) {
                  setType('');
                } else {
                  setType(item);
                }
              }}
            >
              <div
                className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                tabIndex={0}
              >
                {field === item && <BsCheckLg />}
              </div>
              <p>{item[0]?.toUpperCase() + item?.substr(1)}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}
