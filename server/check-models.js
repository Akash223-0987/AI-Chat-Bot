require('dotenv').config();

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error("No API Key found!");
    return;
  }
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();
    
    if (data.models) {
      console.log("Available Models:");
      data.models.forEach(m => {
        if (m.name.includes("gemini")) {
          console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
        }
      });
    } else {
      console.log("Response:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();
