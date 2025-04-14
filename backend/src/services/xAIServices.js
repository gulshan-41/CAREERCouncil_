const axios = require('axios');
const getXaiResponse = async (query) => {
  try {
    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-beta',
        messages: [{ role: 'user', content: query }],
        stream: false,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer xai-fKLM2uSJ4iWtiRhZUJqEKuKYhe7anL35OXztACuL2G1kbM4q3EqedDRAlLKW7LjJhhFu8slo7FZgdUOk`
        }
      }
    );
    return { response: response.data.choices[0].message.content };
  } catch (error) {
    console.error('xAI API Error:', error.response?.data || error.message);
    return { response: 'Sorry, I couldn’t connect to the xAI API. Let’s try a mock response: Mock AI answer for: ' + query };
  }
};
module.exports = { getXaiResponse };