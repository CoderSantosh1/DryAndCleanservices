// pages/api/delivery/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import DeliveryPartner from "@/models/DeliveryPartner";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method not allowed");
  }

  try {
    const { phone, createIfNotFound = false } = req.body as {
      phone?: string;
      createIfNotFound?: boolean;
    };
    if (!phone) return res.status(400).json({ error: "phone is required" });

    // normalise the phone string a bit (trim)
    const normalized = phone.trim();

    // try to find existing partner
    let partner = await DeliveryPartner.findOne({ phone: normalized });

    if (!partner && createIfNotFound) {
      // create a minimal partner record for quick test logins
      partner = await DeliveryPartner.create({
        name: `Delivery ${normalized.slice(-4)}`,
        phone: normalized,
        vehicle: "Unknown",
        active: true,
      });
    }

    if (!partner) {
      return res
        .status(404)
        .json({ error: "No delivery partner found with this number" });
    }

    return res
      .status(200)
      .json({ id: partner._id, name: partner.name, phone: partner.phone });
  } catch (err: any) {
    console.error("delivery login error", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
