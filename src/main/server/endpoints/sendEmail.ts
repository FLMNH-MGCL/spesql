import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import { RequestStatus } from '../../../renderer/types';

const acceptedUserAccountMessage =
  'You may now log in with the credentials you requested. If you have forgotten your credentials, you must reach out directly to a SpeSQL admin for account assistance.';
const acceptedUpdateMessage =
  'Thank you for taking the time to help us better our data!';
const acceptedDeleteMessage =
  'Thank you for taking the time to help us better our data!';
const rejectedMessage =
  'If you have questions or concerns, please reach out to a SpeSQL admin for assistance.';
const receivedMessage = '';
const signature = 'Kawahara Lab';

function getCorrespondingMessage(status: string, _type: string) {
  if (status === 'ACCEPTED') {
    if (_type === 'UPDATE') {
      return acceptedUpdateMessage;
    } else if (_type === 'DELETE') {
      return acceptedDeleteMessage;
    } else {
      return acceptedUserAccountMessage;
    }
  } else if (status === 'PENDING') {
    return receivedMessage;
  } else {
    return rejectedMessage;
  }
}

function getStatusMessage(status: string) {
  if (status === 'ACCEPTED') {
    return 'has been accepted.';
  } else if (status === 'PENDING') {
    return 'has been received.';
  } else {
    return 'has been rejected.';
  }
}

function getReqTypeMessage(_type: string) {
  if (_type === 'UPDATE') {
    return 'an entry update';
  } else if (_type === 'DELETE') {
    return 'an entry deletion';
  } else {
    return 'a SpeSQL user account';
  }
}

function getSubjectLine(status: string) {
  if (status === 'PENDING') {
    return 'Request Received - SpeSQL';
  } else {
    return 'Request Response - SpeSQL';
  }
}

export async function sendEmail(req: Request, res: Response) {
  if (!req.body) {
    res.status(400).send('This request was missing a body.');
  } else {
    const { from, toName, toEmail, userRequest } = req.body;

    if (!from || !toName || !toEmail || !userRequest) {
      res
        .status(400)
        .send(
          'This request was missing essential information from the request body.'
        );
    } else {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ELECTRON_WEBPACK_APP_EMAIL_USER,
          pass: process.env.ELECTRON_WEBPACK_APP_EMAIL_PASS,
        },
      });

      const { _type, status } = userRequest;

      let requestString = getReqTypeMessage(_type);
      let statusString = getStatusMessage(status);
      let message = getCorrespondingMessage(status, _type);

      const html = `Hello ${toName},<br /><br />Your request for ${requestString} <b>${statusString}</b><br /><br />${message}<br /><br />${signature}`;
      const textMessage = `Hello ${toName}, Your request for ${requestString} ${statusString}. ${message}.`;

      const mailOptions = {
        from: process.env.ELECTRON_WEBPACK_APP_EMAIL_USER!, // sender address (AKA MUSEUM EMAIL)
        to: toEmail,
        subject: getSubjectLine(status),
        text: textMessage,
        html,
      };

      const logOptions = {
        ...mailOptions,
        to: mailOptions.from,
        text: `MESSAGE SENT TO ${toEmail}: ${textMessage}`,
        html: `MESSAGE SENT TO ${toEmail}:<br /><br />${html}`,
      };

      try {
        await transporter
          .sendMail(mailOptions)
          .catch((err) => console.log(err));

        if (status === RequestStatus.PENDING) {
          await transporter
            .sendMail(logOptions)
            .catch((err) => console.log(err));
        }

        res.sendStatus(200);
      } catch {
        res.sendStatus(500);
      }
    }
  }
}
