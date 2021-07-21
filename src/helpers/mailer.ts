import nodemailer from 'nodemailer';
import '../helpers/env';

const transport = nodemailer.createTransport({
  service: String(process.env.MAIL_SERVICE),
  auth: {
    type: 'OAuth2',
    user: String(process.env.MAIL_USER),
    clientId: String(process.env.MAIL_CLIENTID),
    clientSecret: String(process.env.MAIL_SECRET),
    refreshToken: String(process.env.MAIL_REFRESHTOKEN)
  },
  tls: { rejectUnauthorized: false }
});

export function emailMessage (dir: string, studentName: string): any {
  return {
    to: process.env.MAIL_TEACHER,
    from: 'simulador@computacao.com',
    subject: `${studentName} - Simulação de manutenção`,
    text: `Olá, relatório do aluno(a) ${studentName}.`,
    attachments: [{
      filename: `${studentName}.pdf`,
      path: dir
    }]
  };
}

export default transport;
