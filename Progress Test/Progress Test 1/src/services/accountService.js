import axios from 'axios'

const API_URL = 'http://localhost:3001/accounts'

const accountService = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  create: (data) => axios.post(API_URL, data),
}

export default accountService
