import axios from 'axios';
import { BACKEND_URL, EmailContent } from '../types';

function getLabs() {
  return axios.get(BACKEND_URL + '/api/labs');
}

function select(labName: string, loadRelations: string[], conditions: any) {
  console.log(labName, loadRelations, conditions);
  return axios.post(BACKEND_URL + '/api/select', {
    labName,
    loadRelations,
    conditions,
  });
}

function sendEmail(content: EmailContent) {
  return axios.post(BACKEND_URL + '/api/send-email', {
    ...content,
  });
}

export default {
  getLabs,
  select,
  sendEmail,
};
