const db = require("../../lib/db");

const getAllProfessionals = () => {
  const queryString = `
    SELECT
      professionals.*,
      array_agg(DISTINCT specialties.id) AS specialties
    FROM professionals
    JOIN professionals_specialties ON professional_id = professionals.id
    JOIN specialties ON specialties.id = specialty_id
    GROUP BY professionals.id;
  `;
  return db
    .query(queryString)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};

const getProfessionalById = id => {
  const queryString = `SELECT * FROM professionals WHERE id = $1`;
  const queryValue = [id];

  return db
    .query(queryString, queryValue)
    .then(res => res.rows[0])
    .catch(err => console.log(err.message));
};

module.exports = {
  getAllProfessionals,
  getProfessionalById
};