import { useEffect, useState } from "react";
import { showAlert } from '../../../common/alert';
import { login, signup } from "../../controllers/AuthController";
import commonController from "../../controllers/CommonController"; // Added import to fetch countries
import User from "../../models/UserModels";
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

  // ⭐ Splash screen state
  const [loadingSplashVisible, setLoadingSplashVisible] = useState(false);
  const [splashMessage, setSplashMessage] = useState('Loading...');

  // ⭐ Trigger splash screen and optional callback after duration
  const triggerSplash = (message = 'Loading your account...', duration = 2000, callback?: () => void) => {
    setSplashMessage(message);
    setLoadingSplashVisible(true);

    setTimeout(() => {
      setLoadingSplashVisible(false);
      if (callback) callback();
    }, duration);
  };

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

    // 🔁 Show splash
    setSplashMessage(authState.isLogin ? 'Logging in...' : 'Creating account...');
    setLoadingSplashVisible(true);

    try {
      const result = authState.isLogin
        ? await login(user)
        : await signup(user);

      if (result) {
        if (authState.isLogin && onAuthSuccess) {
          onAuthSuccess(); // Go to home
        } else {
          setLoadingSplashVisible(false);
          showAlert('Signup Successful!', "Please proceed to login");
          toggleMode();
          return;
        }
      } else {
        console.warn('Signup returned undefined');
      }
    } catch (error) {
      console.error('Login/signup error:', error);
      // Optionally show a toast or UI error
    } finally {
      setLoadingSplashVisible(false); // 🔁 Hide splash
    }
  };


  // const handleSubmit = async () => {
  //   const phone_code = authState.selectedCountryCode;
  //   const contact_number = phone_code + authState.phoneNumber;

  //   const user = new User(
  //     phone_code,
  //     contact_number,
  //     authState.password,
  //     authState.username,
  //     authState.gender,
  //     authState.birthday
  //   );

  //   // 🔁 Start splash
  //   setSplashMessage('Loading your account...');
  //   setLoadingSplashVisible(true);

  //   try {
  //     const result = authState.isLogin
  //       ? await login(user)
  //       : await signup(user);

  //     if (result && onAuthSuccess) {
  //       onAuthSuccess(); // ✅ Navigate or update auth state
  //     }
  //   } catch (error) {
  //     console.error('Login/signup error:', error);
  //     // Optionally: show toast or error message here
  //   } finally {
  //     setLoadingSplashVisible(false); // 🔁 Stop splash
  //   }
  // };

//   const handleSubmit = async () => {
//     const phone_code = authState.selectedCountryCode;
//     const contact_number = phone_code + authState.phoneNumber;
//     const user = new User(
//       phone_code,
//       contact_number,
//       authState.password,
//       authState.username,
//       authState.gender,
//       authState.birthday
//     );
// // console.log("authsatte",authState)
//     const result = authState.isLogin
//       ? await login(user)
//       : await signup(user);

//     // if (result && onAuthSuccess) {
//     //   onAuthSuccess();
//     // }
//     if (result && onAuthSuccess) {
//       triggerSplash('Loading your account...', 2000, onAuthSuccess);
//     }
//   };

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
    loadingSplashVisible,   // ⭐ export to UI
    splashMessage,          // ⭐ export to UI
  };
};

export default useAuthController;
