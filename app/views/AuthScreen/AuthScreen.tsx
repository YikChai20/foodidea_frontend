import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '../../../common/DatePicker/DatePicker'; // adjust path
import PhoneNumberInput from '../../../common/PhoneNumberInput/PhoneNumberInput'; // Adjust path
import styles from './AuthScreen.styles';
import AuthController from './AuthController';
import SplashScreen from '../../../common/SplashScreen/SplashScreen'

interface AuthScreenProps {
  onAuthSuccess?: () => void;
}

const AuthScreen = ({ onAuthSuccess }: AuthScreenProps) => {
  const {
    email,
    password,
    confirmPassword,
    username,
    gender,
    birthday,
    isLogin,
    passwordVisible,
    setEmail,
    setPassword,
    setConfirmPassword,
    setUsername,
    setGender,
    setBirthday,
    toggleMode,
    handleSubmit,
    setPasswordVisible,
    // isEmailValid,
    // emailTouched,
    // setEmailTouched,
    confirmPasswordTouched,
    isConfirmPasswordValid ,
    setConfirmPasswordTouched,
    countryList,
    selectedCountryCode,
    setSelectedCountryCode,
    phoneNumber,
    setPhoneNumber,
    loadingSplashVisible,   // ⭐ new
    splashMessage,          // ⭐ new
  } = AuthController(onAuthSuccess);

  if (loadingSplashVisible) {
    return <SplashScreen message={splashMessage} />;
  }

  const Content = (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>

      {isLogin && (
        <>
          <PhoneNumberInput
            countries={countryList}
            selectedCountryCode={selectedCountryCode}
            onCountryChange={setSelectedCountryCode}
            phoneNumber={phoneNumber}
            onPhoneNumberChange={setPhoneNumber}
          />

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              style={styles.inputWithIcon}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeButton}
            >
              <Text style={styles.eyeIcon}>
                {passwordVisible ? '👁️‍🗨️' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {!isLogin && (
        <>
          <View>
            <Text style={styles.label}>
              Username <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              placeholder="Please enter your username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
              maxLength={15}
            />
          </View>

          <>
            <Text style={styles.label}>
              Password <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Please enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={styles.inputWithIcon}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>
                  {passwordVisible ? '👁️‍🗨️' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </>

          <View>
            <Text style={styles.label}>
              Confirm Password <Text style={styles.required}>*</Text>
            </Text>

            <TextInput
              placeholder="Please enter your Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={() => setConfirmPasswordTouched(true)}
            />
          </View>
          {confirmPasswordTouched && !isConfirmPasswordValid && (
            <Text style={{ color: 'red', marginBottom: 12, marginTop: -10 }}>
              Passwords do not match.
            </Text>
          )}

          <View>
            <Text style={styles.label}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <PhoneNumberInput
              countries={countryList}
              selectedCountryCode={selectedCountryCode}
              onCountryChange={setSelectedCountryCode}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={setPhoneNumber}
            />
          </View>

          <View style={styles.genderContainer}>
            <Text style={styles.label}>Gender <Text style={styles.required}>*</Text></Text>
            <View style={styles.radioGroup}>
              {['M', 'F'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={styles.radioButton}
                  onPress={() => setGender(g)}
                >
                  <View style={styles.radioCircle}>
                    {gender === g && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>{g === 'M' ? 'Male' : 'Female'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Birthday <Text style={styles.required}>*</Text></Text>
            <DatePicker
              birthday={birthday}
              setBirthday={setBirthday}
            />
          </View>
        </>
      )}

      <Button
        title={isLogin ? 'Login' : 'Signup'}
        disabled={!phoneNumber.trim() || !selectedCountryCode.trim() || !password.trim() || (!isLogin && !isConfirmPasswordValid)}
        onPress={handleSubmit}
      />

      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.link}>
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return Platform.OS === 'web' ? (
    <View style={{ flex: 1 }}>{Content}</View>
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>{Content}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
