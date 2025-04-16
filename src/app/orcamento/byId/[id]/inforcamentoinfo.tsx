import { ProposalService, ProposalType, ValueType } from "@/types";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { FcCheckmark } from "react-icons/fc";

interface InfoOrcamentoinfoProps {
  orcamentoById: ProposalType;
  services: ProposalService[];
}

export default function InfoOrcamentoinfo({
  orcamentoById,
  services,
}: InfoOrcamentoinfoProps) {
  const valorHoraExtra =
    orcamentoById?.extraHourPrice * orcamentoById?.extraHoursQty;
  return (
    <div className="flex flex-col flex-1 mt-10 gap-y-2">
      <div className="flex items-center justify-between w-full gap-x-3 ">
        <p className="text-[14px] md:text-[18px] ">Valor base:</p>
        <CurrencyFormat
          value={orcamentoById?.basePrice}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          decimalScale={2} // Define o número de casas decimais
          fixedDecimalScale={true}
          prefix={"R$ "}
        />
      </div>
      {orcamentoById?.extraHoursQty ? (
        <div className="flex items-center justify-between w-full gap-x-3 ">
          <p className="text-[14px] md:text-[18px] ">
            Horas extras ({orcamentoById?.extraHoursQty}hrs):
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
      {services.map((item: ProposalService) => {
        return (
          <div
            key={item.id}
            className="flex items-center justify-between w-full gap-x-3 "
          >
            <p className="text-[14px] md:text-[18px] ">{item?.service.name}</p>
            <CurrencyFormat
              value={item?.service?.price}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2} // Define o número de casas decimais
              fixedDecimalScale={true}
              prefix={"R$ "}
            />
          </div>
        );
      })}
      {/*  {orcamentoById?.seguranca && (
        <div >
          
        </div>
      )} */}
    </div>
  );
}
