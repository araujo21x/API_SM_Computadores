import nodemailer from 'nodemailer';
import '../helpers/env';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_AUTH_USER as string,
    pass: process.env.SMTP_AUTH_PASS as string
  }
});

export function emailMessage (dir: string, studentName: string, mailTeacher:string): any {
  return {
    to: mailTeacher,
    from: process.env.EMAIL_SENDGRID,
    subject: `${studentName} - Simulação de manutenção`,
    text: `Olá, relatório do aluno(a) ${studentName}.`,
    attachments: [{
      filename: `${studentName}.pdf`,
      path: dir
    }]
  };
}

export default transport;
