import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export default function DataProvider(props) {
  const [specialties, setSpecialties] = useState([]);
  const [professional, setProfessional] = useState([]);
  const [specialtiesForProfessional, setSpecialtiesForProfessional] = useState([]);
  const [searchedProfessionals, setSearchedProfessionals] = useState([]);
  const [searchItem, setSearchItem] = useState({ Province: '', Language: '' });
  const [clientAppointments, setClientAppointments] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({ city: '', profession: '' });

  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllSpecialties();
  }, []);

  const getAllSpecialties = () => {
    axios.get(`/api/specialties`).then((res) => {
      setSpecialties(res.data);
    });
  };

  const getAppointmentsByUserId = (id) => {
    axios.get(`api/appointments/client/${id}`).then((res) => {
      setClientAppointments(res.data);
    });
  };

  const getProfessionalById = (id) => {
    axios.get(`/api/professionals/${id}`).then((res) => {
      setProfessional(res.data);
    });
  };

  const getSpecialtiesByProfessionalId = (id) => {
    axios.get(`/api/professionals/${id}/specialties`).then((res) => {
      setSpecialtiesForProfessional(res.data);
    });
  };

  const getProfessionalBySearch = (prov, lang) => {
    axios.get(`/api/professionals/search/${prov}/${lang}`).then((res) => {
      setSearchedProfessionals(res.data);
    });
  };

  const addSearchItem = (genre, item) => {
    setSearchItem((prev) => {
      return {
        ...prev,
        [genre]: item
      };
    });
  };

  const handleCheck = (event) => {
    if (event.target.checked) {
      setCheckedValues((prev) => [...prev, event.target.value]);
    } else {
      const newCheckedValues = checkedValues.filter((c) => c !== event.target.value);
      setCheckedValues(newCheckedValues);
    }
  };

  const getFilteredProf = (profs, specs) => {
    // if specs are empty, return all profs
    return (
      (specs.length &&
        profs.filter((p) => specs.every((id) => p.specialties.includes(parseInt(id))))) ||
      profs
    );
  };

  const handleRadio = (event, category) => {
    if (event.target.checked) {
      setCheckedCategories((prev) => {
        return { ...prev, [category]: event.target.value };
      });
    } else {
      setCheckedCategories((prev) => {
        return { ...prev, [category]: '' };
      });
    }
  };

  const getProfsByCategory = (profs, categories) => {
    let filteredData = profs;
    if (categories.city.length) {
      filteredData = filteredData.filter((p) => p.city === categories.city);
    }
    if (categories.profession.length) {
      filteredData = filteredData.filter((p) => p.profession === categories.profession);
    }
    return filteredData;
  };

  const providerData = {
    professional,
    specialties,
    specialtiesForProfessional,
    searchedProfessionals,
    searchItem,
    clientAppointments,
    checkedValues,
    checkedCategories,
    show,
    getAppointmentsByUserId,
    getAllSpecialties,
    getProfessionalById,
    getSpecialtiesByProfessionalId,
    getProfessionalBySearch,
    addSearchItem,
    getFilteredProf,
    getProfsByCategory,
    handleCheck,
    handleRadio,
    setShow
  };

  return <DataContext.Provider value={providerData}>{props.children}</DataContext.Provider>;
}
