import { ConsultarFormComponent } from "@/components/consultar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultar Orcamento"
};

export default function ConsultarPage() {
  return (
    <div className="flex justify-center items-center pt-28">
        <ConsultarFormComponent />
    </div>
  )
}
