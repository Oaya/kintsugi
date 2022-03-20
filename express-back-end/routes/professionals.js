const router = require("express").Router();
const { getAllProfessionals, getProfessionalById } = require('../db/helper/professional-queries');

// routes for professionals API //

const professionalRoutes = () => {

  router.get('/', (req, res) => {
    getAllProfessionals()
      .then(response => res.json(response))
      .catch(e => console.log(e))
  });

  router.get('/:id', (req, res) => {
    getProfessionalById(req.params.id)
      .then(response => res.json(response))
      .catch(e => console.log(e))
  })

  return router;
};

module.exports = professionalRoutes;