import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

export const DataContext = createContext();

export default function DataProvider(props) {
  const [professionals, setProfessionals] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [professional, setProfessional] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [specialtiesForProfessional, setSpecialtiesForProfessional] = useState([]);
  const [searchedProfessionals, setSearchedProfessionals] = useState([]);
  const [searchItem, setSearchItem] = useState({ Province: "", Language: "" });
  const [clientAppointments, setClientAppointments] = useState([]);

  const [checkedValues, setCheckedValues] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({ city: "", profession: "" });

  useEffect(() => {
    getAllSpecialties();
    getAllProfessionals();
    getAllAppointments();
  }, []);

  const getAllSpecialties = () => {
    axios.get(`/api/specialties`).then((res) => {
      setSpecialties(res.data);
    });
  };

  const getAllProfessionals = () => {
    axios
      .get(`/api/professionals`)
      .then((res) => {
        setProfessionals(res.data);
      });
  };

  const getAllAppointments = () => {
    axios.get(`/api/appointments`).then((res) => {
      setAppointments(res.data);
    });
  };

  const getAppointmentsByUserId = (id) => {
    axios.get(`api/appointments/client/${id}`)
      .then((res) => {
        setClientAppointments(res.data);
      })
  }

  // // //fetch professional by id//
  // const findProfessionalById = (id) => {
  //   console.log("inside", id, professionals);
  //   const professional = professionals.filter(
  //     (item) => item.id === parseInt(id)
  //   );
  //   console.log(professional[0]);
  //   setProfessional(professional[0]);

  // };

  const getProfessionalById = (id) => {
    axios
      .get(`/api/professionals/${id}`)
      .then((res) => {
        setProfessional(res.data);
      });
  };

  const getSpecialtiesByProfessionalId = (id) => {
    axios
      .get(`/api/professionals/${id}/specialties`)
      .then((res) => {
        setSpecialtiesForProfessional(res.data);
      });
  };



  // const getProfessionalBySearch = (prov, lang) => {
  //   axios.get(`/api/professional/search?prov=${prov}&lang=${lang}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setSearchedProfessionals(res.data)
  //     })
  // }

  const getProfessionalBySearch = (prov, lang) => {
    axios.get(`/api/professionals/search/${prov}/${lang}`)
      .then((res) => {
        setSearchedProfessionals(res.data);
      })
  }

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
      setCheckedValues(prev => [...prev, event.target.value]);
    } else {
      const newCheckedValues = checkedValues.filter(c => c !== event.target.value)
      setCheckedValues(newCheckedValues);
    }
  };

  const getFilteredProf = (profs, specs) => {
    // if specs are empty, return all profs
    return (
      (specs.length
        && profs.filter(p => specs.every(id => p.specialties.includes(parseInt(id)))))
      || profs
      )
  };

  const handleRadio = (event, category) => {
    if (event.target.checked) {
      setCheckedCategories(prev => {
        return { ...prev,  [category]: event.target.value }
      })
    } else {
      setCheckedCategories(prev => {
        return { ...prev, [category]: "" }
      })
    }
  }

  const getProfsByCategory = (profs, categories) => {
    let filteredData = profs;
    if (categories.city.length) {
      filteredData = filteredData.filter(p => p.city === categories.city )
    }
    if (categories.profession.length) {
      filteredData = filteredData.filter(p => p.profession === categories.profession )
    }
    return filteredData;
  };


  const providerData = {
    professional,
    professionals,
    specialties,
    specialtiesForProfessional,
    appointments,
    searchedProfessionals,
    searchItem,
    clientAppointments,
    checkedValues,
    checkedCategories,
    getAppointmentsByUserId,
    getAllProfessionals,
    getAllSpecialties,
    getAllAppointments,
    getProfessionalById,
    getSpecialtiesByProfessionalId,
    getProfessionalBySearch,
    addSearchItem,
    getFilteredProf,
    getProfsByCategory,
    handleCheck,
    handleRadio,
  };

  return (
    <DataContext.Provider value={providerData}>
      {props.children}
    </DataContext.Provider>
  );
}
