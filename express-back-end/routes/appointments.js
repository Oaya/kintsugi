const router = require("express").Router();
const { getAppointments, getSingleAppointment } = require('../db/helper/appointment-queries');
// import { newAppointment } from "./db/helper/appointment-queries.js"

//all the appointment routes come here//

const appointmentRoutes = () => {
  router.get("/", (req, res) => {
    console.log("JSON Statham")
    getAppointments() 
      .then(response => res.json(response))
      .catch(e => console.log(e))
    });
    

  // router.post("/", (req, res) => {
  //   // console.log(req.body)
  //   const client_id = req.body.client_id
  //   const prof_id = req.body.prof_id
  //   const appointment_data = req.body.appointment_data
  //   newAppointment(client_id, prof_id, appointment_data)
  // });

  return router;
};

module.exports = appointmentRoutes;
