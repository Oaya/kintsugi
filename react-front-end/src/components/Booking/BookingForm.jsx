import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdWorkOutline } from 'react-icons/md';
import { AiOutlineTag } from 'react-icons/ai';

import InputForm from './InputForm';

export default function BookingForm(props) {
  const { professional, specialties } = props;
  const navigate = useNavigate();
  const specialtiesListItem =
    //get the name value //
    specialties &&
    specialties
      .map((item) => {
        return item.name;
      })
      .join();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      {professional && (
        <div className="form_container">
          <p className="go_back" onClick={handleClick}>
            Go back & view more professionals.
          </p>
          <p />

          <div className="profile_header">
            <div>
              <img src={professional.icon_url} style={{ width: 160 }} alt="icon"></img>
            </div>

            <div className="proff_name">
              <h2>
                {professional.first_name}&nbsp;
                {professional.last_name}
              </h2>
              <br />
              <table>
                <tr>
                  <MdWorkOutline />
                  <td>{professional.profession}</td>
                </tr>
                <tr>
                  <AiOutlineTag />
                  <td>{specialtiesListItem}</td>
                </tr>
                <tr>
                  <HiOutlineLocationMarker />
                  <td>
                    {professional.city},&nbsp;
                    {professional.province}&nbsp;
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <p />
          <InputForm professional={professional} />
        </div>
      )}
    </>
  );
}
