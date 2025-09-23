import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
  passwordContainer: { // ✅ NEW
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  inputWrapper: {
    position: 'relative',      // Allows positioning the icon
    justifyContent: 'center',
    marginBottom: 12,
  },

  inputWithIcon: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingRight: 35, // Add right padding to avoid text under icon
  },

  eyeButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: { // ✅ NEW
    marginLeft: 10,
    fontSize: 18,
  },  
  // For gender radio button
  genderContainer: {
    marginBottom: 16,
  },

  // label: {
  //   fontSize: 16,
  //   fontWeight: '500',
  //   marginBottom: 8,
  // },

  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },

  radioLabel: {
    fontSize: 14,
  },

  datePickerContainer: {
    marginBottom: 16,
  },

  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 4,
  },

    // label: {
  //   fontSize: 16,
  //   fontWeight: '500',
  //   marginBottom: 8,
  // },
  label: {
  fontSize: 16,
  marginBottom: 4,
  color: '#333',
  fontWeight: '500',
},

required: {
  color: 'red',
},
});

export default styles;
