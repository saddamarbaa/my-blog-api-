import { environmentConfig, resend } from '@src/configs';

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const getFromEmail = () =>
  environmentConfig.NODE_ENV === 'development' ? 'onboarding@resend.dev' : environmentConfig.EMAIL_SENDER;

const getToEmail = (to: string) => (environmentConfig.NODE_ENV === 'development' ? 'delivered@resend.dev' : to);

export const sendMail = async ({ to, subject, text, html }: Params) =>
  resend.emails.send({
    from: getFromEmail() as string,
    to: getToEmail(to),
    subject,
    text,
    html
  });
