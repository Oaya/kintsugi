import { useEffect, useState } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [professionalInfo, setProfessionalInfo] =
    useState({});
  const [specialties, setSpecialties] = useState(
    []
  );

  useEffect(() => {
    getProfessionalSpecialties();
    getProfessionalInfo();
  }, []);

  const getProfessionalSpecialties = () => {
    axios.get(`/api/specialties`).then((res) => {
      console.log(res.data);
      setSpecialties(res.data);
    });
  };

  const getProfessionalInfo = () => {
    axios
      .get(`/api/professionals`)
      .then((res) => {
        setProfessionalInfo(res.data);
      });
  };

  return {
    professionalInfo,
    specialties,
    getProfessionalInfo,
    getProfessionalSpecialties,
  };
};

export default useApplicationData;
