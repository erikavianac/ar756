import React from "react";

export default function LoadingOrcamentoComponent() {
  return (
    <div className="flex flex-col flex-1 mt-10 gap-y-2">
      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Valor base:</p>
        <div className="bg-gray-400 width-[10rem] h-[5rem] ronded-md animate-pulse" />
      </div>

      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Horas extras (hrs):</p>
        <div className="bg-gray-400 width-[4rem] h-[2rem] ronded-md animate-pulse" />
      </div>

      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Seguranca</p>
        <div className="bg-gray-400 width-[4rem] h-[2rem] ronded-md animate-pulse " />
      </div>

      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Recepcionista</p>
        <div className="bg-gray-400 width-[4rem] h-[2rem] ronded-md animate-pulse" />
      </div>

      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Limpeza</p>
        <div className="bg-gray-400 width-[4rem] h-[2rem] ronded-md animate-pulse" />
      </div>
    </div>
  );
}
