import mongoose from "mongoose";

const { Schema } = mongoose;

const ChangeSchema = new Schema({
  category: { type: String },
  oldValue: Schema.Types.Mixed,
  newValue: Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now },
});

const ConsumableSchema = new Schema(
  {
    amount: { type: Number },
    articelNumber: { type: String },
    consumableLength: { type: String },
    consumableWidth: { type: String },
    image: { type: String },
    material: { type: String },
    tensileStrenght: { type: String },
    vacuum: { type: String },
    location: { type: String },
    minimumAmount: { type: Number },
    supplier: { type: String },
    title: { type: String },
    toolType: { type: String },
    type: { type: String },
    changes: [ChangeSchema],
    timestamp: { type: Date, default: Date.now },
    expiryTimestamp: { type: Date, expireAfterSeconds: 0 }, // expiryTimestamp only needed as long as using image blobs
  },
  { collection: "consumables" }
);

const Consumable =
  mongoose.models.Consumable || mongoose.model("Consumable", ConsumableSchema);

export default Consumable;
