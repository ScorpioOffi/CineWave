import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import Navbar from '../navbar/Navbar';

const Calendrier = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
    <Navbar />
    <Calendar />
    </>
  );
}

export default Calendrier;