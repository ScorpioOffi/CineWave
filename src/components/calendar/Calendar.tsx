import { useState } from 'react';
import Calendar from 'react-calendar';

const Calendrier = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar />
  );
}

export default Calendrier;