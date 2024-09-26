const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/db");

exports.handler = async () => {
  try {
    const { Items } = await db.scan({
      TableName: "messages",
    });
    return sendResponse(Items);
  } catch (error) {
    return sendError(500, "Kunde ej hämta meddelanden");
  }
};
