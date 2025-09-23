import { useState, useEffect } from "react";
import User from "../../models/UserModels";
import { login, signup } from "../../controllers/AuthController";
import commonController from "../../controllers/CommonController"; // Added import to fetch countries

interface AuthState {
  isLogin: boolean;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  confirmPasswordTouched: boolean;
  gender: string;
  birthday: string;
  passwordVisible: boolean;
  emailTouched: boolean;
  selectedCountryCode: string;  // NEW
  phoneNumber: string;          // NEW
  countryList: any[];           // NEW
}

const useAuthController = (onAuthSuccess?: () => void) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLogin: true,
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    confirmPasswordTouched: false,
    gender: '',
    birthday: '',
    passwordVisible: false,
    emailTouched: false,
    selectedCountryCode: '',  // NEW
    phoneNumber: '',          // NEW
    countryList: [],          // NEW
  });

  const toggleMode = () => {
    setAuthState(prev => ({
      ...prev,
      isLogin: !prev.isLogin,
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordTouched: false,
      gender: '',
      username: '',
      birthday: '',
      passwordVisible: false,
      emailTouched: false,
      selectedCountryCode: '',  // NEW
      phoneNumber: '',          // NEW
    }));
  };

  const setEmail = (email: string) =>
    setAuthState(prev => ({ ...prev, email }));

  const setPassword = (password: string) =>
    setAuthState(prev => ({ ...prev, password }));

  const setConfirmPassword = (confirmPassword: string) =>
    setAuthState(prev => ({ ...prev, confirmPassword }));

  const setConfirmPasswordTouched = (confirmPasswordTouched: boolean) =>
    setAuthState(prev => ({ ...prev, confirmPasswordTouched }));
  
  // const setEmailTouched = (emailTouched: boolean) =>
  //   setAuthState(prev => ({ ...prev, emailTouched }));

  const setGender = (gender: string) =>
    setAuthState(prev => ({ ...prev, gender }));
  
  const setUsername = (username: string) =>
    setAuthState(prev => ({ ...prev, username }));

  const setBirthday = (birthday: string) =>
    setAuthState(prev => ({ ...prev, birthday }));

  const setPasswordVisible = (visible: boolean) =>
    setAuthState(prev => ({ ...prev, passwordVisible: visible }));

  const handleSubmit = async () => {
    const phone_code = authState.selectedCountryCode;
    const contact_number = phone_code + authState.phoneNumber;
    const user = new User(
      phone_code,
      contact_number,
      authState.password,
      authState.username,
      authState.gender,
      authState.birthday
    );
// console.log("authsatte",authState)
console.log(111, user)
    const result = authState.isLogin
      ? await login(user)
      : await signup(user);

    // if (result && onAuthSuccess) {
    //   onAuthSuccess();
    // }
  };

  // const isEmailValid = /\S+@\S+\.\S+/.test(authState.email);

  const isConfirmPasswordValid = authState.password === authState.confirmPassword;

  const setSelectedCountryCode = (code: string) =>
    setAuthState(prev => ({ ...prev, selectedCountryCode: code }));

  const setPhoneNumber = (phone: string) =>
    setAuthState(prev => ({ ...prev, phoneNumber: phone }));

  useEffect(() => {
    async function fetchCountries() {
      const res = await commonController.countries();
      if (res && res.data) {
        setAuthState(prev => ({ ...prev, countryList: res.data }));
      }
    }
    fetchCountries();
  }, []);

  return {
    ...authState,
    setEmail,
    setPassword,
    setConfirmPassword,
    setGender,
    setUsername,
    setBirthday,
    toggleMode,
    handleSubmit,
    setPasswordVisible,
    // isEmailValid,
    // emailTouched,
    // setEmailTouched,
    isConfirmPasswordValid,
    setConfirmPasswordTouched,
    setSelectedCountryCode, // NEW
    setPhoneNumber,         // NEW
  };
};

export default useAuthController;
