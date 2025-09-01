//Theory Initial Basic: https://chat.deepseek.com/a/chat/s/a9ee9d86-360d-48f3-a0d7-aaee790ace0c
//Theory Detailed Advanced : https://chat.deepseek.com/a/chat/s/1bfecf04-75e1-4f24-b5c7-1807175596f9

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

// store history per user (in-memory for now, replace with Redis/DB for production)
let userHistories = {};
const MAX_CONTEXT = 10;

const aiAgent = async (req, res) => {
  try {
  
    const userName = req.body.query.userName === undefined ? 'guest' : req.body.query.userName ;
    const problem = req.body.query.problem;
    if (!userHistories[userName]) {
      userHistories[userName] = [];
    }

    if(problem.length > 1000){
         return res.status(200).send({
        success: true,
        finalText: "Your Text should be less than 150 words"
      });
    }


    if (problem && ['clear', 'new', 'reset'].includes(problem.toLowerCase())) {
      userHistories[userName] = [];
      return res.status(200).send({
        success: true,
        finalText: " Chat history cleared for this session."
      });
    }

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: userHistories[userName],
      config: {
        systemInstruction: `
          You are easFarm-AgriBot, an intelligent AI assistant created by easFarm.
          Your mission is to support farmers and agronomists by providing accurate, real-time insights 
          on crop health, weather forecasts, soil conditions, and yield predictions.
          You communicate clearly, respectfully, and in a helpful tone, using agricultural terminology 
          when appropriate. Always prioritize sustainability, precision farming, and local relevance.

          Always provide answer in less than 1-2 line
        `,
      },
    });

    const stream = await chat.sendMessageStream({
      message: problem,
    });

    let finalText = "";
    for await (const chunk of stream) {
      if (chunk.text) {
        finalText += chunk.text;
      }
    }

    // push conversation into user-specific history
    userHistories[userName].push({ role: "user", parts: [{ text: problem }] });
    userHistories[userName].push({ role: "model", parts: [{ text: finalText }] });

    // trim history to max context
    if (userHistories[userName].length > MAX_CONTEXT * 2) {
      userHistories[userName] = userHistories[userName].slice(-MAX_CONTEXT * 2);
    }

    return res.status(200).send({
      success: true,
      finalText,
    });
  } catch (err) {
    console.error("❌ Error communicating with EasFarm:", err.message);
    return res.status(500).send({
      success: false,
      message: "Error communicating with EasFarm",
      error: err.message,
    });
  }
};

module.exports = aiAgent;


// If you want history to clear only when frontend tab closes, 
// add navigator.sendBeacon('/api/endSession', {userName}) 
// in frontend to notify backend.



//Replace in-memory userHistories with a database or Redis with expiry.

// Example: store history with userId + sessionId.

// Auto-expire after X mins inactivity.