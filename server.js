const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const app = express();
const adminCreateRouter = require("./routes/admin/create");
const adminLoginRouter = require("./routes/admin/login");
const adminProductsRouter = require("./routes/admin/products");
const adminUpdateRouter = require("./routes/admin/update");
const cartRouter = require("./routes/users/cart");
const collectionRouter = require("./routes/users/collection");
const communityRouter = require("./routes/users/community");
const contactRouter = require("./routes/users/contact");
const coursesRouter = require("./routes/users/courses");
const eventsRouter = require("./routes/users/events");
const userRouter = require("./routes/users/user");
const mediaRouter = require("./routes/users/media");
const notificationsRouter = require("./routes/users/notifications");
const paymentRouter = require("./routes/users/payment");
const productsRouter = require("./routes/users/products");
const shipmentRouter = require("./routes/users/shipment");

//allows for different domains to communicate
app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.NEXT_PUBLIC_ARTSTORE_API],
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

//admin routes
app.use(adminLoginRouter);
app.use(adminProductsRouter);
app.use(adminCreateRouter);
app.use(adminUpdateRouter);

//users routes
app.use(cartRouter);
app.use(collectionRouter);
app.use(communityRouter);
app.use(contactRouter);
app.use(coursesRouter);
app.use(eventsRouter);
app.use(userRouter);
app.use(mediaRouter);
app.use(notificationsRouter);
app.use(paymentRouter);
app.use(productsRouter);
app.use(shipmentRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  require("dotenv").config();

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, function () {
  console.log("Server Running on port: " + process.env.PORT);
});
