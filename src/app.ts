import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.enable("trust proxy");
app.use(morgan("combined"));
app.use(express.json());

// Define your TURN server configuration here
const fallbackTurnServer = {
  iceServers: [
    {
      urls: 'stun:openrelay.metered.ca:80',
    },
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
    {
      urls: 'turn:openrelay.metered.ca:443',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
    {
      urls: 'turn:openrelay.metered.ca:443?transport=tcp',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
  ],
};

app.get("/api/turn-server", async (req: Request, res: Response) => {
  // Return the TURN server configuration
  return res.status(200).json({ data: fallbackTurnServer });
});

app.get("/api/get-avatar", async (req: Request, res: Response) => {
  const { category } = req.query;
  const baseUrl = `${req.protocol}://${req.headers.host}`;
  if (category !== "male" && category !== "female") {
    return res.status(400).json({
      error: `${category} is not a valid category. Input either male or female`,
    });
  }
  // Generate a random image URL based on the category (you'll need to implement this function)
  const randomImage = ""; // Implement this function to generate a random image URL
  return res.status(200).json({ data: `${baseUrl}/${randomImage}` });
});

// const frontEndUrl = "http://localhost:3000"; // Replace with your frontend URL for production

// // Serve the front-end application.
// app.get('/*', (req: Request, res: Response) => {
//   res.redirect(frontEndUrl);
// });

app.get('/*', (req: Request, res: Response) => {
  res.send('working')
})

// Serve static files from directories
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/sounds", express.static("sounds"));

export default app;
