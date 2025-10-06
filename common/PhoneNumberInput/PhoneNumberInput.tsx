import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface Country {
  code: string;
  name: string;
  phone_code: string;
}

interface PhoneNumberInputProps {
  countries: Country[];
  selectedCountryCode: string;
  onCountryChange: (countryCode: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}

const PhoneNumberInput = ({
  countries,
  selectedCountryCode,
  onCountryChange,
  phoneNumber,
  onPhoneNumberChange,
}: PhoneNumberInputProps) => {
  // const selectedCountry = countries.find(c => c.code === selectedCountryCode);
  // const phoneCode = selectedCountry?.phone_code || '';

  return (
    <View style={styles.container}>      
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCountryCode}
            onValueChange={onCountryChange}
            style={styles.picker}
          >
            <Picker.Item label="Country" value="" />
            {countries.map(country => (
              <Picker.Item
                key={country.phone_code}
                label={`${country.phone_code} (${country.name || 'N/A'})`}
                value={country.phone_code}
              />
            ))}
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
        />
      </View>
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  required: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1.2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    flex: 2,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});
