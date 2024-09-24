const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    // Kontrollera att id finns med i requesten
    if (!id) {
      return sendError(400, "Meddelande ID krävs.");
    }

    // Sätter upp DynamoDB-parametrar för att hämta meddelandet
    const params = {
      TableName: "messages",
      Key: {
        id: id, // Nyckeln för det meddelande som ska hämtas
      },
    };

    // Försök att hämta meddelandet
    const result = await db.get(params);

    // Om meddelandet inte hittades, returnera ett fel
    if (!result.Item) {
      return sendError(404, "Meddelandet hittades inte");
    }

    // Returnera det hämtade meddelandet
    return sendResponse(result.Item);
  } catch (error) {
    console.error("Fel vid hämtning av meddelande:", error);
    return sendError(500, "Ett fel uppstod vid hämtning av meddelandet");
  }
};
