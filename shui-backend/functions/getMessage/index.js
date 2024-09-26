const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return sendError(400, "Meddelande ID krävs");
    }

    // DB-parametrar för att hämta meddelandet
    const params = {
      TableName: "messages",
      Key: {
        id: id,
      },
    };

    // Försök att hämta meddelandet
    const result = await db.get(params);

    // Returnera svar beroende på utfall
    if (!result.Item) {
      return sendError(404, "Meddelandet hittades inte");
    }
    return sendResponse(result.Item);
  } catch (error) {
    return sendError(500, "Ett fel uppstod vid hämtning av meddelandet");
  }
};
