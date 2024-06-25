import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user'

const getProfile = async (token) => {
  const response = await axios.post(`${API_URL}/profile`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

const updateProfile = async (token, profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export default {
  getProfile,
  updateProfile
}

