// models/Order.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export type OrderStatus =
  | "created"
  | "assigned"
  | "picked"
  | "in_transit"
  | "completed"
  | "cancelled";

export interface IOrder {
  customerName?: string;
  phone?: string;
  address?: string;
  cleanerId?: string | null;
  status: OrderStatus;
  assignedTo?: string | null;
  items: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderDoc extends IOrder, Document {}

const OrderSchema = new Schema<OrderDoc>(
  {
    customerName: { type: String },
    phone: { type: String },
    address: { type: String },
    cleanerId: { type: String, default: null },
    status: {
      type: String,
      enum: [
        "created",
        "assigned",
        "picked",
        "in_transit",
        "completed",
        "cancelled",
      ],
      default: "created",
    },
    assignedTo: { type: String, default: null },
    items: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Avoid recompiling model in dev/hot-reload
const Order: Model<OrderDoc> =
  (mongoose.models.Order as Model<OrderDoc>) ||
  mongoose.model<OrderDoc>("Order", OrderSchema);

export default Order;
