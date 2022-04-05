import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDateRange, MdAccessTime } from 'react-icons/md'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import useSpeechToText from 'react-hook-speech-to-text';
import axios from "axios";


export default function InputForm(props) {

  const [time, setTime] = useState("09:00:00");
  const [formState, setFormState] = useState(false)
  const { professional } = props;
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    setFormState(values.description)
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const addNewAppointmentData = () => {
    const dateData = ` ${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`;
    const myData =
    {
      professional: professional.id,
      date: dateData,
      time,
      info: formState
    };
    axios.post('/api/appointments', myData, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myData)
    })
      .then(() => {
        navigate('/thankyou')
      })
      .catch((error) => {
        console.error('Error posting new appointment. Error:', error);
      });

  }

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="Select Date"
      value={selectedDay ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}` : ''}
      className="my-custom-input-class" // a styling class
    />)

  useEffect(() => {
    if (!formState === false) addNewAppointmentData();
  }, [formState]);

  const {
    error,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      lang: 'ja',
      interimResults: true
    }
  });

  if (error) return <p>Web Speech API is not available in this browser</p>
  return (
    <div className="bottomhalf">
      <form onSubmit={handleSubmit}>
        <div className="timeslots">
          <div>
            <div> <MdDateRange /><br />
              <DatePicker
                className="my-custom-input-class"
                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Select a day"
                renderInput={renderCustomInput}
                colorPrimary="#cba96d"
                shouldHighlightWeekends
              />
            </div>
          </div>
          <div><MdAccessTime /><br />
            <select
              name="time"
              value={time}
              type="time"
              onChange={(event) =>
                handleTimeChange(
                  event.target.value
                )
              }
            >
              <option id="0" value="09:00:00">Select Time</option>
              <option id="1" value="09:00:00">09:00am</option>
              <option id="2" value="10:00:00">10:00am</option>
              <option id="3" value="11:00:00">11:00am</option>
              <option id="4" value="12:00:00">12:00pm</option>
              <option id="5" value="13:00:00">1:00pm</option>
              <option id="6" value="14:00:00">2:00pm</option>
              <option id="7" value="15:00:00">3:00pm</option>
            </select>
          </div>
        </div>
        <p />

        <div>
          <textarea
            name="description"
            id="appointment_request"
            class="request"
            type="text"
            placeholder="Please provide the mental health worker with some additional details about your appointment request. If you’d prefer, select the microphone to record your message. It will translate your request from your primary language to English. "
            value={interimResult}
          />
          <br />
          <div className="mic">
            <button type="button" onClick={isRecording ? stopSpeechToText : startSpeechToText}>{isRecording ? '🛑' : '🎤'}</button>
            &nbsp; Click the microphone to record your message in Japanese.
          </div>
          <button type="submit" className="submit">Submit</button>
        </div>
      </form>
    </div>

  )
};