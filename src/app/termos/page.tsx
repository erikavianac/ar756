import { FooterComponent } from "@/components/footer";
import { HomeHeaderComponent } from "@/components/header";

const PoliticaPrivacidade = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
          <h1 className="text-[20px] font-bold mb-4 text-center">
            Política de Privacidade e Consentimento para Recebimento de E-mails
          </h1>

          <p className="mb-4">
            A AR756 está comprometida em proteger sua privacidade. Ao fornecer
            seu e-mail, você concorda em receber informações sobre novidades,
            promoções e eventos relacionados ao nosso espaço.
          </p>

          <h2 className="text-xl font-semibold mb-2">Dados Coletados:</h2>
          <p className="mb-4">
            Coletamos seu nome e e-mail para o envio de orçamentos, atualizações
            e promoções.
          </p>

          <h2 className="text-xl font-semibold mb-2">Uso das Informações:</h2>
          <p className="mb-4">
            Suas informações serão utilizadas apenas para o envio de e-mails
            promocionais. Não compartilharemos seus dados com terceiros sem sua
            permissão.
          </p>

          <h2 className="text-xl font-semibold mb-2">Cancelamento:</h2>
          <p className="mb-4">
            Você pode cancelar sua inscrição a qualquer momento clicando no link
            de cancelamento presente em nossos e-mails.
          </p>

          <h2 className="text-xl font-semibold mb-2">Segurança:</h2>
          <p className="mb-4">
            Adotamos medidas de segurança para proteger suas informações.
          </p>

          <h2 className="text-xl font-semibold mb-2">Alterações:</h2>
          <p className="mb-4">
            Reservamo-nos o direito de alterar esta política. Notificaremos você
            sobre quaisquer mudanças.
          </p>

          <h2 className="text-xl font-semibold mb-2">Contato:</h2>
          <p className="mb-4">
            Para dúvidas, entre em contato conosco através de contato@ar756.com.
          </p>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default PoliticaPrivacidade;
