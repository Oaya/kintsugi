import React, { useContext, useEffect } from 'react';

import AppointmentList from '../components/Appointment/AppointmentList';
import { DataContext } from '../providers/DataProvider';

export default function AppointmentPage() {
  const { getAppointmentsByUserId, clientAppointments } = useContext(DataContext);

  useEffect(() => {
    getAppointmentsByUserId(1);
  }, []);

  return (
    <div className="components_container">
      <AppointmentList appointments={clientAppointments} />
    </div>
  );
}
