import Consumable from "../../database/models/Consumable";

export default async function handler(request, response) {
  if (request.method === "PUT") {
    const { id, category, value, changes } = request.body;

    try {
      const updatedConsumable = await Consumable.findByIdAndUpdate(
        id,
        { [category]: value },
        { new: true }
      );
      changes.forEach((change) => {
        updatedConsumable.changes.push({
          category: category,
          oldValue: change.oldValue,
          newValue: change.newValue,
          timestamp: new Date(change.timestamp),
        });
      });

      await updatedConsumable.save();

      return response.status(200).json({ updatedConsumable });
    } catch (error) {
      console.error("Error updating consumable:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
