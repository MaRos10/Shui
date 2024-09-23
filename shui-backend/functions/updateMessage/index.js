const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    // Kontrollera att id finns med i requesten
    if (!id) {
      return sendError(400, "Meddelande ID krävs.");
    }

    const body = JSON.parse(event.body);
    const { text } = body;

    // Validering av inkommande data
    if (!text) {
      return sendError(400, "Text krävs för att uppdatera meddelandet");
    }

    // Sätta upp DynamoDB-parametrar för att uppdatera meddelandet
    const params = {
      TableName: "messages",
      Key: {
        id: id, // Nyckeln för det meddelande som ska uppdateras
      },
      UpdateExpression: "set #text = :text",
      ExpressionAttributeNames: {
        "#text": "text",
      },
      ExpressionAttributeValues: {
        ":text": text, // Den nya texten som ska sättas
      },
      ConditionExpression: "attribute_exists(id)", // Kontrollera om meddelandet finns
      ReturnValues: "UPDATED_NEW", // Returnera de nya värdena efter uppdatering
    };

    // Försök att uppdatera meddelandet
    const result = await db.update(params);

    // Om inget fält uppdaterades, returnera ett fel
    if (!result.Attributes) {
      return sendError(404, "Meddelandet hittades inte");
    }

    // Returnera det uppdaterade meddelandet
    return sendResponse(result.Attributes);
  } catch (error) {
    console.error("Fel vid uppdatering av meddelande:", error);

    // Om meddelandet inte finns
    if (error.code === "ConditionalCheckFailedException") {
      return sendError(404, "Meddelandet hittades inte");
    }

    // Om ett annat fel uppstod
    return sendError(500, "Ett fel uppstod vid uppdatering av meddelandet");
  }
};
