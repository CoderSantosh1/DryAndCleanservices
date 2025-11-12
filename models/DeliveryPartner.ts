// models/DeliveryPartner.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeliveryPartner extends Document {
  name: string;
  phone?: string;
  vehicle?: string;
  active?: boolean;
}

const DeliveryPartnerSchema = new Schema<IDeliveryPartner>(
  {
    name: { type: String, required: true },
    phone: { type: String },
    vehicle: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const DeliveryPartner: Model<IDeliveryPartner> =
  mongoose.models.DeliveryPartner ||
  mongoose.model<IDeliveryPartner>("DeliveryPartner", DeliveryPartnerSchema);

export default DeliveryPartner;
