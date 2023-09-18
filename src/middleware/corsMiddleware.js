exports.corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log("middleware check!");
  next();
};

/* 
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  // Ausgabe der Uhrzeit, des Datums und der Middleware-Meldung
  const message = `Middleware check! Aktuelle Uhrzeit und Datum: ${formattedDate}`;
  console.log(message); */
