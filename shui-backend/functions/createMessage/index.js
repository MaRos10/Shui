const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");
const { nanoid } = require("nanoid");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Validering av inkommande data
    const { username, text } = body;
    if (!username || !text) {
      return sendError(
        400,
        "Användarnamn och text är obligatoriskt att fylla i"
      );
    }

    // Skapa ett nytt meddelande
    const newMessage = {
      id: nanoid(),
      username,
      text,
      createdAt: new Date().toLocaleString("sv-SE", {
        timeZone: "Europe/Stockholm",
      }),
    };

    // Sätter upp DynamoDB-parametrar för att spara meddelandet
    const params = {
      TableName: "messages",
      Item: newMessage,
    };

    // Spara meddelandet i DynamoDB
    await db.put(params);

    // Returnera ett lyckat svar
    return sendResponse(newMessage);
  } catch (error) {
    console.error("Fel vid hämtning av meddelanden:", error);
    return sendError(500, "Fel uppstod vid skapande av meddelandet");
  }
};
