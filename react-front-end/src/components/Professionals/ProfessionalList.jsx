import React from "react";

import ProfessionalListItem from "./ProfessionalListItem";

export default function ProfessionalList() {
  // rendering 4 repeats for now //

  return (
    <div className="professionals__container">
      <h2 className="display-info">Displaying professionals who speak Japanese in BC</h2>
      <ul className="professionals__list">
      <ProfessionalListItem />
      <ProfessionalListItem />
      <ProfessionalListItem />
      <ProfessionalListItem />
      </ul>
    </div>
  );
}
