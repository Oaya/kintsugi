import React from "react";

import ProfessionalListItem from "./ProfessionalListItem";

export default function ProfessionalList() {
  // rendering 4 repeats for now //

  return (
    <ul className="professionals__container">
      <ProfessionalListItem />
      <ProfessionalListItem />
      <ProfessionalListItem />
      <ProfessionalListItem />
    </ul>
  );
}
