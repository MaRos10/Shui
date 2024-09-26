const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return sendError(400, "Meddelande ID krävs");
    }

    const body = JSON.parse(event.body);
    const { text } = body;

    if (!text) {
      return sendError(400, "Text krävs för att uppdatera meddelandet");
    }

    // Kontrollera om meddelande med angivet ID existerar
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

    // DB-parametrar för att uppdatera meddelandet
    const updateParams = {
      TableName: "messages",
      Key: {
        id: id,
      },
      UpdateExpression: "set #text = :text",
      ExpressionAttributeNames: {
        "#text": "text",
      },
      ExpressionAttributeValues: {
        ":text": text,
      },
      ConditionExpression: "attribute_exists(id)",
      ReturnValues: "UPDATED_NEW", // Returnera de nya värdena efter uppdatering
    };

    // Försök att uppdatera meddelandet
    const result = await db.update(updateParams);

    // Returnera svar beroende på utfall
    return sendResponse(result.Attributes);
  } catch (error) {
    return sendError(500, "Ett fel uppstod vid uppdatering av meddelandet");
  }
};
