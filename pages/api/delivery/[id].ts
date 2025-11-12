// pages/api/delivery/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import DeliveryPartner from "@/models/DeliveryPartner";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { id } = req.query;
  if (!id || Array.isArray(id))
    return res.status(400).json({ error: "Invalid id" });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid id format" });

  try {
    if (req.method === "GET") {
      const partner = await DeliveryPartner.findById(id);
      if (!partner) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(partner);
    }

    if (req.method === "PATCH") {
      const updates = req.body;
      const partner = await DeliveryPartner.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!partner) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(partner);
    }

    if (req.method === "DELETE") {
      const partner = await DeliveryPartner.findByIdAndDelete(id);
      if (!partner) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error("delivery/[id] error", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
