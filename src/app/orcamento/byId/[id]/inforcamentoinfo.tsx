import { BugdetType, ValueType } from "@/types";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { FcCheckmark } from "react-icons/fc";

interface InfoOrcamentoinfoProps {
  orcamentoById: BugdetType;
  valuesList: ValueType[];
}

export default function InfoOrcamentoinfo({
  orcamentoById,
  valuesList,
}: InfoOrcamentoinfoProps) {
  const valorHoraExtra =
    orcamentoById?.valorHoraExtra * orcamentoById?.qtdHorasExtras;
  return (
    <div className="flex flex-col flex-1 mt-10 gap-y-2">
      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Valor base:</p>
        <CurrencyFormat
              value={orcamentoById?.valorBase}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2} // Define o número de casas decimais
              fixedDecimalScale={true}
              prefix={"R$ "}
            />
      </div>
      {orcamentoById?.qtdHorasExtras ? (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">
            Horas extras ({orcamentoById?.qtdHorasExtras}hrs):
          </p>
          <CurrencyFormat
            value={valorHoraExtra}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2} // Define o número de casas decimais
            fixedDecimalScale={true}
            prefix={"R$ "}
          />
        </div>
      ) : null}
      {orcamentoById?.seguranca && (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">Seguranca</p>
          <CurrencyFormat
              value={ valuesList.find((item: ValueType) => item?.titulo === "Seguranca")
              ?.valor}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2} // Define o número de casas decimais
              fixedDecimalScale={true}
              prefix={"R$ "}
            />
        </div>
      )}
      {orcamentoById?.recepcionista && (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">Recepcionista</p>
          <CurrencyFormat
              value={ valuesList.find((item: ValueType) => item?.titulo === "Recepcionista")
              ?.valor}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2} // Define o número de casas decimais
              fixedDecimalScale={true}
              prefix={"R$ "}
            />
        </div>
      )}
      {orcamentoById?.limpeza && (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">Limpeza</p>
          <CurrencyFormat
              value={ valuesList.find((item: ValueType) => item?.titulo === "Limpeza")
              ?.valor}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2} // Define o número de casas decimais
              fixedDecimalScale={true}
              prefix={"R$ "}  
            />
        </div>
      )}
    </div>
  );
}
