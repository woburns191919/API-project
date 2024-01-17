import React, { useState } from 'react';

const DateRangePicker = ({ onSelectDates }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    onSelectDates({ startDate, endDate });
  };

  return (
    <div className="date-range-picker">
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default DateRangePicker;
