// pages/api/orders.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import Order, { OrderDoc, OrderStatus } from "@/models/Order";

type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderDoc[] | ErrorResponse | OrderDoc>
) {
  await connectDB();

  const method = req.method;

  try {
    if (method === "GET") {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    }

    if (method === "POST") {
      const body = req.body as Partial<OrderDoc>;
      if (!body.customerName || !body.phone || !body.address) {
        return res
          .status(400)
          .json({ error: "customerName, phone and address are required" });
      }
      const newOrder = await Order.create({
        customerName: body.customerName,
        phone: body.phone,
        address: body.address,
        cleanerId: body.cleanerId ?? null,
        items: body.items ?? [],
      } as Partial<OrderDoc>);
      return res.status(201).json(newOrder);
    }

    if (method === "PATCH") {
      const { id, action, assignedTo, status } = req.body as any;
      if (!id)
        return res
          .status(400)
          .json({ error: "Order id is required for PATCH" });

      const order = await Order.findById(id);
      if (!order) return res.status(404).json({ error: "Order not found" });

      if (action === "assign") {
        order.assignedTo = assignedTo ?? null;
        if (assignedTo) order.status = "assigned";
      } else if (action === "status" && status) {
        const allowed: OrderStatus[] = [
          "created",
          "assigned",
          "picked",
          "in_transit",
          "completed",
          "cancelled",
        ];
        if (!allowed.includes(status)) {
          return res.status(400).json({ error: "Invalid status value" });
        }
        order.status = status;
      } else {
        return res.status(400).json({ error: "Invalid action for PATCH" });
      }

      await order.save();
      return res.status(200).json(order);
    }

    res.setHeader("Allow", ["GET", "POST", "PATCH"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err: any) {
    console.error("orders api error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
