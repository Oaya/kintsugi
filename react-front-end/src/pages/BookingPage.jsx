import React, {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/BookingForm";

import ProfessionalDetail from "../components/ProfessionalDetail";

export default function BookingPage() {
  let { id } = useParams();
  const [professionalInfo, setProfessionalInfo] =
    useState({});
  const [specialties, setSpecialties] = useState(
    []
  );

  useEffect(() => {
    getProfessionalInfo();
    getProfessionalSpecialties();
  }, []);

  const getProfessionalInfo = () => {
    axios
      .get(`/api/professionals/${id}`)
      .then((res) => {
        setProfessionalInfo(res.data);
      });
  };

  const getProfessionalSpecialties = () => {
    axios
      .get(`/api/specialties/${id}`)
      .then((res) => {
        setSpecialties(res.data);
      });
  };

  return (
    <div className="components_container">
      <ProfessionalDetail
        professional={professionalInfo}
        specialties={specialties}
      />
      <BookingForm />
    </div>
  );
}
