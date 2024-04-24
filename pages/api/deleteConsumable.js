import Consumable from "../../database/models/Consumable";

export default async function handler(request, response) {
  if (request.method === "DELETE") {
    const { id } = request.body;
    try {
      const deletedConsumable = await Consumable.findByIdAndDelete(id);
      if (!deletedConsumable) {
        return response.status(404).json({ message: "Consumable not found" });
      }
      return response
        .status(200)
        .json({ message: "Consumable deleted successfully" });
    } catch (error) {
      console.error("Error deleting consumable:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
