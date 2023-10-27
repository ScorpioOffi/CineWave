import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'

const Calendrier = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar />
  );
}

export default Calendrier;