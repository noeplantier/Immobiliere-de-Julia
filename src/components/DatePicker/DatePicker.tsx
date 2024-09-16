import * as React from 'react';
import 'dayjs/locale/en-gb';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface DatePickerCpnProps {
  onDateChange: (newDate: Dayjs | null) => void;
}
export default function DatePickerCpn({ onDateChange }: DatePickerCpnProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs('2022-04-17'));
  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    onDateChange(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        label="birthDate"
        value={date}
        onChange={(newValue) => handleChange(newValue)}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  );
}
