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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://store-api-three-iota.vercel.app",
    ], // Allow all origins
    credentials: true,
    methods: "*",
    allowedHeaders: "*",
  })
);

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount all routes under a single handler
app.use("/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
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
