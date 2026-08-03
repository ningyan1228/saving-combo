import "dotenv/config";
import cors from "cors";
import express from "express";
import { z } from "zod";

const app = express();
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000").split(",").map((value) => value.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => response.json({ status: "ok", service: "saving-combo-api" }));

const costInput = z.object({
  listPrice: z.number().nonnegative(),
  exchangeRate: z.number().positive(),
  paymentFee: z.number().nonnegative().default(0),
  cashback: z.number().nonnegative().default(0)
});

app.post("/api/v1/calculations/cost", (request, response) => {
  const parsed = costInput.safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ error: "Invalid cost calculation input" });
  const { listPrice, exchangeRate, paymentFee, cashback } = parsed.data;
  const estimatedCost = listPrice * exchangeRate + paymentFee - cashback;
  return response.json({ estimatedCost: Math.max(0, estimatedCost), formula: "list_price * exchange_rate + payment_fee - confirmed_cashback" });
});

app.use((_request, response) => response.status(404).json({ error: "Not found" }));

const port = Number(process.env.PORT ?? 8787);
app.listen(port, () => console.log(`saving-combo-api listening on ${port}`));
