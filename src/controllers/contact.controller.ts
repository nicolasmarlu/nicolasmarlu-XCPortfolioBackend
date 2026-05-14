import { Request, Response } from 'express';
import validator from 'validator';

import {
  sendEmail
} from '../services/email.service';

export const sendContactEmail = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      subject,
      message
    } = req.body;

    if (!name || !email ||  !subject ||  !message)
    {
        return res.status(400).json({
            success: false,
            message:
            'Missing required fields.'
        });
    }

    if (!validator.isEmail(email)) 
    {
        return res.status(400).json({
            success: false,
            message:
            'Invalid email address.'
        });
    }

    if (name.length > 100) 
    {
        return res.status(400).json({
            success: false,
            message:
            'Name is too long.'
        });
    }

    if (subject.length > 200) 
    {
        return res.status(400).json({
        success: false,
        message:
        'Subject is too long.'
        });
    }

    if (message.length > 2000) 
    {
        return res.status(400).json({
            success: false,
            message:
            'Message is too long.'
            });
    }

    const safeName = validator.escape(name);
    const safeEmail = validator.normalizeEmail(email) || email;
    const safeMessage = validator.escape(message);

    await sendEmail(
      safeName,
      safeEmail ?? email,
      safeMessage
    );

    return res.status(200).json({
      success: true,
      message:
        'Message sent successfully'
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        'Internal server error'
    });
  }
};