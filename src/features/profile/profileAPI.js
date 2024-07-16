import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user'

/**
 * Get user profile from the API.
 * 
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} The user profile data.
 */
const getProfile = async (token) => {
  const response = await axios.post(`${API_URL}/profile`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}


/**
 * Update user profile on the API.
 * 
 * @param {string} token - The authentication token.
 * @param {Object} profileData - The profile data to update.
 * @returns {Promise<Object>} The updated user profile data.
 */
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

