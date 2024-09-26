const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return sendError(400, "Meddelande ID krävs");
    }

    // DB-parametrar för att hämta meddelandet
    const getParams = {
      TableName: "messages",
      Key: {
        id: id,
      },
    };

    // Hämta befintligt meddelande
    const existingMessage = await db.get(getParams);

    // Om meddelandet inte existerar
    if (!existingMessage.Item) {
      return sendError(404, "Meddelandet hittades inte");
    }

    // DB-parametrar för borttagning
    const deleteParams = {
      TableName: "messages",
      Key: {
        id: id,
      },
      ConditionExpression: "attribute_exists(id)",
    };

    // Ta bort meddelandet
    await db.delete(deleteParams);

    // Returnera svar beroende på utfall
    return sendResponse({ message: "Meddelandet är borttaget" });
  } catch (error) {
    return sendError(500, "Ett fel uppstod vid radering av meddelande");
  }
};
