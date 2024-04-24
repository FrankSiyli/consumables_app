import dbConnect from "../lib/dbConnect";
import Consumable from "../../database/models/Consumable";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const consumables = await Consumable.find();
      return response.status(200).json({ consumables });
    } catch (error) {
      console.error("Error fetching consumables:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
