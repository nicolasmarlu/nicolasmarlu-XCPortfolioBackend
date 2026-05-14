import { Resend } from 'resend';

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  const responce =
  await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'nicolasmarluti18pro@outlook.com',
    subject: `Portfolio Contact - ${name}`,
    html: `
      <h2>New Contact Message</h2>
      <p>
        <strong>Name:</strong> ${name}
      </p>
      <p>
        <strong>Email:</strong> ${email}
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <p>${message}</p>
    `

  });

  console.log('Email sent:', responce);
};