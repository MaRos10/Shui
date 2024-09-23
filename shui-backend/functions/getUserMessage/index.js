const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { username } = event.pathParameters;

    // Kontrollera att username finns med i requesten
    if (!username) {
      return sendError(400, "Användarnamn krävs");
    }

    // Sätter upp DynamoDB-parametrar för att hämta alla meddelanden
    const params = {
      TableName: "messages",
    };

    // Hämta meddelanden från DynamoDB
    const result = await db.scan(params);

    // Filtrera meddelanden baserat på användarnamn
    const userMessages = result.Items.filter(
      (message) => message.username === username
    );

    // Kontrollera om några meddelanden hittades
    if (userMessages.length === 0) {
      return sendError(
        404,
        "Inga meddelanden hittades för det angivna användarnamnet"
      );
    }

    // Returnera de hittade meddelandena
    return sendResponse(userMessages);
  } catch (error) {
    console.error("Fel vid hämtning av meddelanden:", error);
    return sendError(500, "Ett fel uppstod vid hämtning av meddelanden");
  }
};
