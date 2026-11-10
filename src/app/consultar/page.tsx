import { redirect } from "next/navigation";
import { EVENTHUB_FORM_URL } from "@/constants";

export default function ConsultarPage() {
  redirect(EVENTHUB_FORM_URL);
}
