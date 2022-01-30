const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const adminLoginRouter = require("./routes/admin/login")
const adminProductsRouter = require("./routes/admin/products");
const adminCreateRouter = require("./routes/admin/create");
const adminUpdateRouter = require("./routes/admin/update");
const productsRouter = require("./routes/products");
const contactRouter = require("./routes/contact");
const usersRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/payment");
const shipmentRouter = require("./routes/shipment");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

app.listen(process.env.PORT, function () {
  console.log("Server Running...");
});

//allows for different domains to communicate
//allows for different domains to communicate
app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.REACT_APP_ARTSTORE_API],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "user",
    secret: [process.env.COOKIE_KEY],
    resave: false,
    saveUninitialized: false,
  })
);

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

//Middleware: Logging
app.use(morgan("dev"));

// app.use(
//   cookieSession({
//     keys: [process.env.COOKIE_SESSION],
//   })
// );

app.use(adminLoginRouter);
app.use(adminProductsRouter);
app.use(adminCreateRouter);
app.use(adminUpdateRouter);
app.use(productsRouter);
app.use(contactRouter);
app.use(usersRouter);
app.use(cartRouter);
app.use(paymentRouter);
app.use(shipmentRouter);
