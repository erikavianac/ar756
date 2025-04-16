"use server";
import nodemailer from "nodemailer";
import { CreateOrcamentoReqBody, ProposalRequestResponse } from "@/types";

export default async function sendOrcamentoEmail(
  values: CreateOrcamentoReqBody
) {
  console.log("jorge")
  try {
    const novoOrcamento = await fetch(
      `${process.env.SERVER_URL}/proposal/createPerPerson`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      }
    ).then(async (resp) => {
      const response: ProposalRequestResponse = await resp.json();
      return response?.data;
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
      to: values.email,
      subject: "Proposta AR756",
      html: `
               <div style="font-family: Arial, sans-serif; height: 990px;">
                  <table style="width: 100%; height: 100%; background-image: url('https://app-house-keeper-bucket.s3.eu-north-1.amazonaws.com/1744731323169-0bae4784-3fb2-4d9b-ae7c-56c42eb3ac78.webp'); background-size: cover;">
                      <tr>
                          <td>
                          <table style="background-color: white; margin: auto; padding: 20px; width: 50%; height: 690px; border-radius: 10px;">
                              <tr>
                              <td style="text-align: center;">
                                  <img style="width: 200px; height: 120px; margin: 0 auto;" src="https://app-house-keeper-bucket.s3.eu-north-1.amazonaws.com/WhatsApp_Image_2024-09-23_at_18.11.28-removebg-preview+-+Copy.png" alt="logo AR756" />
                                  <h1 style="color: #333; width: 100%; text-align: center; margin-top: 10px;">Olá ${values.completeClientName}, recebemos a sua mensagem!</h1>
                                  <p style="font-size: 14px; width: 60%; margin: 10px auto; text-align: center;">Agradecemos o seu interesse em conhecer a AR756. Simulamos um orçamento para seu evento, por gentileza clique no botão abaixo para ver a proposta.</p>
                                  <div style="width: 100%; text-align: center;margin-top: 40px;">
                                  <a href="https://www.ar756.com/orcamento/byId/${novoOrcamento.id}" style="text-decoration: none;">
                                      <button style="background-color: black; color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; display: inline-block;">Orçamento</button>
                                  </a>
                                  </div>
                                  <h2 style="font-size: 14px; width: 60%; margin: 10px auto; text-align: center; margin-top: 40px;">SIGA-NOS</h2>
                                  <div style="text-align: center;">
                                  <a href="https://www.tiktok.com/@ar756_" style="text-decoration: none; margin-right: 10px;"><img src="https://app-house-keeper-bucket.s3.eu-north-1.amazonaws.com/icons8-tiktok-48.png" alt="Logo TiTok" /></a>
                                  <a href="https://www.instagram.com/ar756_/" style="text-decoration: none; margin-right: 10px;"><img src="https://app-house-keeper-bucket.s3.eu-north-1.amazonaws.com/icons8-instagram-48.png" alt="Logo Instagram" /></a>
                                  <a href="https://www.facebook.com/profile.php?id=100085832906065" style="text-decoration: none;"><img src="https://res.cloudinary.com/dzvyh5r33/image/upload/v1729510932/icons8-facebook-48_x31mos.png" alt="Logo Facebook" /></a>
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
           })   */
    };
    await transporter.sendMail(mailOptions);

    return novoOrcamento;
  } catch (error) {
    console.log(error)
  }
}
