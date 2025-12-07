import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("HIIIII");
});

// routes
//routes import
import authRouter from './routes/auth/auth.routes.js';
import { ApiResponse } from './utils/ApiResponse.js';
import adminProductsRouter from './routes/admin/products.routes.js';
import shoppingProductRouter from './routes/shopping/products.routes.js';
import shoppingCartRouter from './routes/shopping/cart.routes.js';

//router deceleration
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shopping/products", shoppingProductRouter);
app.use("/api/shopping/cart", shoppingCartRouter)
// global Error Handler (middleware);

app.use((err, req, res, next) => {
    console.log(err, " error ----------------------------------------------------")
    res.status(err.statusCode || 500)
        .json(new ApiResponse(err.statusCode || 500, null, err.message || "Failed"))
})
export default app;