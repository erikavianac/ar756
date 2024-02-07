import { BugdetType } from "@/types";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { FcCheckmark } from "react-icons/fc";

interface InfoOrcamentoinfoProps{
  orcamentoById: BugdetType;
}

export default function InfoOrcamentoinfo({orcamentoById}: InfoOrcamentoinfoProps) {
  return (
    <div className="flex flex-col flex-1 mt-10 gap-y-2">
      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Valor base:</p>
        <CurrencyFormat
          value={orcamentoById?.valorBase}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$ "}
        />
      </div>
      {orcamentoById?.qtdHorasExtras ? (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">
            Horas extras ({orcamentoById?.qtdHorasExtras}hrs):
          </p>
          <CurrencyFormat
            value={
              orcamentoById?.valorHoraExtra * orcamentoById?.qtdHorasExtras
            }
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"R$ "}
          />
        </div>
      ) : null}
      {orcamentoById?.seguranca && (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">Seguranca</p>
          <FcCheckmark />
        </div>
      )}
      {orcamentoById?.recepcionista && (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">Recepcionista</p>
          <FcCheckmark />
        </div>
      )}
      {orcamentoById?.limpeza && (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">Limpeza</p>
          <FcCheckmark />
        </div>
      )}
    </div>
  );
}
