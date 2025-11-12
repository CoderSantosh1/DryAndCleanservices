// pages/api/delivery.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import DeliveryPartner from "@/models/DeliveryPartner";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    const list = await DeliveryPartner.find().sort({ name: 1 });
    return res.status(200).json(list);
  }

  if (req.method === "POST") {
    const dp = await DeliveryPartner.create(req.body);
    return res.status(201).json(dp);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
