import Consumable from "../../database/models/Consumable";
import dbConnect from "../../database/dbConnect";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "POST") {
    try {
      const {
        title,
        type,
        location,
        amount,
        minimumAmount,
        consumableWidth,
        consumableLength,
        toolType,
        material,
        tensileStrenght,
        vacuum,
        supplier,
        articelNumber,
        image,
        expiryTimestamp, // expiryTimestamp only needed as long as using image blobs
      } = request.body;

      const newConsumable = await Consumable.create({
        title,
        type,
        location,
        amount,
        minimumAmount,
        consumableWidth,
        consumableLength,
        toolType,
        material,
        tensileStrenght,
        vacuum,
        supplier,
        articelNumber,
        image,
        expiryTimestamp, // expiryTimestamp only needed as long as using image blobs
      });

      await newConsumable.save();

      return response
        .status(201)
        .json({ message: "Consumable added successfully" });
    } catch (error) {
      console.error("Error adding new consumable:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
