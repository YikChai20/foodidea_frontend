import axios from 'axios';
import { showAlert } from '../../common/alert';
import config from '../../config.json';
import User from '../models/UserModels';
const API_URL = config.API_URL;

export const login = async (user: User): Promise<any> => {
  if (!user.isValid()) {
    // Alert.alert('Validation Error', 'All fields are required');
    showAlert('Validation Error', 'All fields are required');
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      contact_number: user.contact_number,
      password: user.password,
    });
    // Alert.alert('Login Successful!');
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||   // Error from backend
      err?.message ||                   // Axios error
      'Server error';                   // Fallback

    showAlert('Login Failed', errorMessage);
  }
};

export const signup = async (user: User): Promise<any> => {
  if (!user.isSignupValid()) {
    showAlert('Validation Error', 'All fields are required');
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      phone_code: user.phone_code,
      contact_number: user.contact_number,
      password: user.password,
      gender: user.gender,
      birthday: user.birthday,
      username: user.username
    });
    // showAlert('Signup Successful!', "Please proceeed to login");
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||   // Error from backend
      err?.message ||                   // Axios error
      'Signup Failed';                   // Fallback

    showAlert('Signup Failed', errorMessage);
  }
};

export default {
  login,
  signup,
};
