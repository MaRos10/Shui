const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async (event) => {
  try {
    const { username } = event.pathParameters;

    if (!username) {
      return sendError(400, "Användarnamn krävs");
    }

    // DB-parametrar för att hämta alla meddelanden
    const params = {
      TableName: "messages",
    };

    // Hämta meddelanden
    const result = await db.scan(params);

    // Filtrera meddelanden
    const userMessages = result.Items.filter((message) =>
      message.username.toLowerCase().includes(username.toLowerCase())
    );

    // Returnera svar beroende på utfall
    if (userMessages.length === 0) {
      return sendError(
        404,
        "Inga meddelanden hittades för det angivna användarnamnet"
      );
    }
    return sendResponse(userMessages);
  } catch (error) {
    return sendError(500, "Ett fel uppstod vid hämtning av meddelanden");
  }
};
