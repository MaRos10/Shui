const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return sendError(400, "Vänligen ange ID för meddelandet");
    }

    // Sätta upp DynamoDB-parametrar för att ta bort meddelandet
    const params = {
      TableName: "messages",
      Key: {
        id: id, // Nyckeln för det meddelande som ska tas bort
      },
      ConditionExpression: "attribute_exists(id)", // Kontrollera om meddelandet finns
    };

    // Ta bort meddelandet
    await db.delete(params);

    // Returnera ett lyckat svar om meddelandet har tagits bort
    return sendResponse({ message: "Meddelandet är borttaget" });
  } catch (error) {
    console.error("Fel vid hämtning av meddelanden:", error);

    // Kontrollera om felet beror på att meddelandet inte fanns
    if (error.code === "ConditionalCheckFailedException") {
      return sendError(404, "Meddelandet hittades inte");
    }

    // Om ett annat fel uppstod
    return sendError(500, "Ett fel uppstod vid radering av meddelande");
  }
};
