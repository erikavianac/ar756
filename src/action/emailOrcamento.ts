"use server";
import nodemailer  from "nodemailer";
import { CreateOrcamentoReqBody } from "@/types";

export default async function sendOrcamentoEmail(
  data: CreateOrcamentoReqBody
) {
  const novoOrcamento = await fetch(
    `${process.env.SERVER_URL}/orcamento/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: "contato@ar756.com", // Seu endereço de e-mail
      pass: process.env.EMAIL_PASSWORD, // Sua senha de e-mail
    },
  });

  const mailOptions = {
    from: '"AR756" <contato@ar756.com>',
    to: data.email,
    subject: "Proposta AR756",
    html: `
           <div style="font-family: Arial, sans-serif; height: 990px;">
              <table style="width: 100%; height: 100%; background-image: url('https://res.cloudinary.com/dzwboczzd/image/upload/v1727109726/piscina-cima_ga2yep.jpg'); background-size: cover;">
                  <tr>
                      <td>
                      <table style="background-color: white; margin: auto; padding: 20px; width: 50%; height: 690px; border-radius: 10px;">
                          <tr>
                          <td style="text-align: center;">
                              <img style="width: 200px; height: 120px; margin: 0 auto;" src="https://res.cloudinary.com/dzwboczzd/image/upload/v1727111537/WhatsApp_Image_2024-09-23_at_18.11.28_rbl0mo.jpg" alt="logo AR756" />
                              <h1 style="color: #333; width: 100%; text-align: center; margin-top: 10px;">Olá ${data.nome}, recebemos a sua mensagem!</h1>
                              <p style="font-size: 14px; width: 60%; margin: 10px auto; text-align: center;">Agradecemos o seu interesse em conhecer a AR756. Simulamos um orçamento para seu evento, por gentileza clique no botão abaixo para ver a proposta.</p>
                              <div style="width: 100%; text-align: center;margin-top: 40px;">
                              <a href="https://ar756.com/orcamento/byId/${novoOrcamento.id}" style="text-decoration: none;">
                                  <button style="background-color: black; color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; display: inline-block;">Orçamento</button>
                              </a>
                              </div>
                              <h2 style="font-size: 14px; width: 60%; margin: 10px auto; text-align: center; margin-top: 40px;">SIGA-NOS</h2>
                              <div style="text-align: center;">
                              <a href="https://www.tiktok.com/@ar756_" style="text-decoration: none; margin-right: 10px;"><img src="https://res.cloudinary.com/dzwboczzd/image/upload/v1727110723/icons8-tiktok-48_eopzfz.png" alt="Logo TiTok" /></a>
                              <a href="https://www.instagram.com/ar756_/" style="text-decoration: none; margin-right: 10px;"><img src="https://res.cloudinary.com/dzwboczzd/image/upload/v1727110723/icons8-instagram-48_x5ndr2.png" alt="Logo Instagram" /></a>
                              <a href="https://www.facebook.com/profile.php?id=100085832906065" style="text-decoration: none;"><img src="https://res.cloudinary.com/dzwboczzd/image/upload/v1727110723/icons8-facebook-48_veyzdw.png" alt="Logo Facebook" /></a>
                              </div>
                          </td>
                          </tr>
                      </table>
                      </td>
                  </tr>
              </table>
          </div>
          `,
    /*   attachments: base64Files.map((item:any) => {
              return {
              filename: item.fileName,
              content: item.base64String,
              encoding: 'base64'
              }
          })  */
  };
  await transporter.sendMail(mailOptions);

  return novoOrcamento;
}
