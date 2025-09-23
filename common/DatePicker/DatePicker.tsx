import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface DatePickerProps {
  birthday: string;
  setBirthday: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ birthday, setBirthday }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 130 }, (_, i) => `${currentYear - i}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    if (birthday) {
      const [y, m, d] = birthday.split('-');
      setSelectedYear(y);
      setSelectedMonth(m);
      setSelectedDay(d);
    }
  }, [birthday]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      setBirthday(`${selectedYear}-${selectedMonth}-${selectedDay}`);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = selectedYear && selectedMonth
    ? Array.from(
        { length: getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth)) },
        (_, i) => `${i + 1}`.padStart(2, '0')
      )
    : [];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Birthday</Text> */}
      <View style={styles.pickerRow}>
        {/* Year Picker */}
        <Picker
          selectedValue={selectedYear}
          onValueChange={setSelectedYear}
          style={styles.picker}
        >
          <Picker.Item label="Year" value="" />
          {years.map(year => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>

        {/* Month Picker */}
        <Picker
          selectedValue={selectedMonth}
          onValueChange={setSelectedMonth}
          style={styles.picker}
        >
          <Picker.Item label="Month" value="" />
          {months.map(month => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>

        {/* Day Picker */}
        <Picker
          selectedValue={selectedDay}
          onValueChange={setSelectedDay}
          style={styles.picker}
        >
          <Picker.Item label="Day" value="" />
          {days.map(day => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

export default DatePicker;
