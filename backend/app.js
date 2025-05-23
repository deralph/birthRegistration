import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/birthRecordRouter.js";

const app = express();
config({ path: "./.env" });
// app.use(cors());

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
//     method: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173", // your React dev server
  "http://localhost:5174",
  "https://birth-registration-virid.vercel.app/",
  "https://birth-registration-dashboard.vercel.app/",
  // "https://your-production-site.com"  // add production URL when deployed
];

app.use(
  cors({
    origin: (origin, callback) => {
      // If no origin (e.g. server‐to‐server, Postman), allow
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        // echo back the authenticated origin
        return callback(null, origin);
      }
      // otherwise, block
      return callback(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // <-- this sends Access-Control-Allow-Credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/birth-records", appointmentRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
