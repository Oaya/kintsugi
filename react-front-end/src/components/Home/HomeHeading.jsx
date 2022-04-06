import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Selection from './Selection';
import { provinceData, languageData } from '../../searchData';
import { DataContext } from '../../providers/DataProvider';

export default function HomeHeading() {
  const navigate = useNavigate();
  const { searchItem } = useContext(DataContext);
  const { Province, Language } = searchItem;
  const [error, setError] = useState("");

  const handleClick = () => {
    if (Language === "") {
      setError("Please pick a Language");
      setTimeout(() => {
        setError('')
      }, 5000);
      return;
    } else if (Province === "") {
      setError("Please pick a province");
      setTimeout(() => {
        setError('')
      }, 5000);
      return;
    } else {
      navigate(`/professionals/search/${Province}/${Language}`);
      setError("");
    }

  };

  return (
    <div>
      <div className="heading">
        <br />
        <h2>Find a mental health professional that meets your needs.</h2>
        <p>
          Start by selecting a <span>language</span> and a<span> location.</span>
        </p>
      </div>
      <p className='selection__error'> {error}</p>
      <div className="selection__container">
        <Selection genre="Language" data={languageData} />
        <Selection genre="Province" data={provinceData} />
        <div onClick={handleClick} className="btn-search">
          Search
        </div>
      </div>
    </div>
  );
}
