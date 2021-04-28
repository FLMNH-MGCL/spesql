import axios from 'axios';
import { BACKEND_URL, RequestStatus } from '../../types';

export default async function (id: number, newStatus: RequestStatus) {
  return await axios.post(BACKEND_URL + '/api/admin/request-status', {
    id,
    newStatus,
  });
}
