const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");
const { nanoid } = require("nanoid");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { username, text } = body;

    if (!username || !text) {
      return sendError(400, "Användarnamn och text är obligatoriskt");
    }
    if (/\s/.test(username)) {
      return sendError(400, "Användarnamn får inte innehålla mellanrum");
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

    // DB-parametrar för att spara meddelandet
    const params = {
      TableName: "messages",
      Item: newMessage,
    };

    // Spara meddelandet i DynamoDB
    await db.put(params);

    // Returnera svar beroende på utfall
    return sendResponse(newMessage);
  } catch (error) {
    return sendError(500, "Fel uppstod vid skapande av meddelandet");
  }
};
