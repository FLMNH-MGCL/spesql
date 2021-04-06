import { BACKEND_URL, EmailContent } from '../types';
import axios from 'axios';

export async function sendEmail(content: EmailContent) {
  return await axios.post(BACKEND_URL + '/api/send-email', {
    ...content,
  });
}
