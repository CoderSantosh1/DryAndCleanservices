// pages/api/delivery/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import DeliveryPartner from "@/models/DeliveryPartner";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  try {
    if (req.method === "GET") {
      const partners = await DeliveryPartner.find()
        .sort({ createdAt: -1 })
        .lean();
      return res.status(200).json(partners);
    }

    if (req.method === "POST") {
      const { name, phone, vehicle, active } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });
      const p = await DeliveryPartner.create({
        name,
        phone,
        vehicle,
        active: active ?? true,
      });
      return res.status(201).json(p);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error("delivery api error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
