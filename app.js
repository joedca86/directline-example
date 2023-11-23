const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;
const authToken = "59p7F2s9ggY.6x5ICROi5VJFocVS7n-LW5Msz3iggrR4wb4YRYm0rIc";

// Definir una ruta en Express que llame al método fetchData
app.get("/api/data", async (req, res) => {
  try {
    const conversation = await setConversation();
    const messageCreate = await setMessage(conversation.conversationId);
    const message = await getMessage(conversation.conversationId);
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

async function setConversation() {
  const conversatioUrl =
    "https://directline.botframework.com/v3/directline/conversations";
  const conversationData = {};

  const headers = {
    "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
    Authorization: `Bearer ${authToken}`, // Agrega el token Bearer al encabezado de autorización
  };

  return axios
    .post(conversatioUrl, conversationData, { headers })
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error en la solicitud POST:", error.message);
      return error.message;
    });
}

async function setMessage(conversationId) {
  const authToken = "59p7F2s9ggY.6x5ICROi5VJFocVS7n-LW5Msz3iggrR4wb4YRYm0rIc";
  const messageUrl =
    `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;
  const messageData = {
    "locale": "en-EN",
    "type": "message",
    "from": {
        "id": "user1"
    },
    "text": "adelanto"
};

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  return axios
    .post(messageUrl, messageData, { headers })
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error en la solicitud POST:", error.message);
      return error.message;
    });
}

async function getMessage(conversationId) {
  const authToken = "59p7F2s9ggY.6x5ICROi5VJFocVS7n-LW5Msz3iggrR4wb4YRYm0rIc";
  const messageUrl =
    `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;

  const headers = {
    "Content-Type": "application/json", 
    Authorization: `Bearer ${authToken}`,
  };

  return axios
    .get(messageUrl, { headers })
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error en la solicitud GET:", error.message);
      return error.message;
    });
}


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
