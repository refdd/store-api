// api/index.js
import express from "express";
import cors from "cors"; // Make sure to import this
import { connectDB } from "../lib/db.js";
import authRoutes from "../routes/auth.route.js";
import productsRoutes from "../routes/product.route.js";
import cartRoutes from "../routes/cartRoutes.route.js";
import couponsRoutes from "../routes/coupons.route.js";
import paymentRoutes from "../routes/payment.route.js";
import analyticsRoutes from "../routes/analytics.route.js";
import cookieParser from "cookie-parser";
const app = express();
// Database Connection
connectDB();
// Configure CORS properly
// Configure CORS properly
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://store-api-three-iota.vercel.app",
        "https://store-frontend-drab.vercel.app/",
        "https://store-frontend-rdd8zpd24-refdds-projects.vercel.app", // <-- Add this line
      ];
      // Allow requests with no origin (like mobile apps, curl requests, Postman)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

// Mount all routes under a single handler
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/coupons", couponsRoutes);
app.use("/payments", paymentRoutes);
app.use("/analytics", analyticsRoutes);
// Default route for testing API health
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
}

export default app;
