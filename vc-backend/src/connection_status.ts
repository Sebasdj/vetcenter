import { pool } from "./db"

pool.connect()
  .then(() => {
    console.log(" ✔ [DATABASE CONNECTION STATUS] Conexión realizada con éxito.")
  })
  .catch(err => {
    console.log(" ✘ [DATABASE CONNECTION STATUS] La conexión fue rechazada.")
    console.log(err)
  })