import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user'

// Fonction de connexion
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Invalid email or password')
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export default {
  login
}
