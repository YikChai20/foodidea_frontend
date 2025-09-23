import axios from 'axios';
import { showAlert } from '../../common/alert';
import config from '../../config.json';
// import Country from '../models/CountryModels';
const API_URL = config.API_URL;

export const countries = async (): Promise<any> => {
  try {
    const res = await axios.get(`${API_URL}/common/countries`);
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||   // Error from backend
      err?.message ||                   // Axios error
      'Server error';                   // Fallback

    showAlert('Login Failed', errorMessage);
  }
};

export default {
  countries,
};
