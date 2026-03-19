import api from './api';

export async function predictReport(imageUrl) {
  const response = await api.post('/api/predict', { image_url: imageUrl });
  return response.data;
}

export async function fetchHistory() {
  const response = await api.get('/api/history');
  return response.data;
}

export async function fetchReport(reportId) {
  const response = await api.get(`/api/history/${reportId}`);
  return response.data;
}

export async function fetchUsers() {
  const response = await api.get('/api/users');
  return response.data;
}

export async function fetchReports(filters = {}) {
  const response = await api.get('/api/reports', { params: filters });
  return response.data;
}
