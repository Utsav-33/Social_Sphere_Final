const { Configuration, OpenAIApi } = require('openai-edge');

const configuration = new Configuration({
  apiKey:"sk-proj-DQOmTaqMZBjEEbf8GBFHT3BlbkFJ00EvweEF8QJg9C55satm",
});

const openai = new OpenAIApi(configuration);

(async () => {
  try {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo-instruct-0914',
      prompt: 'Test prompt',
      max_tokens: 150,
    });

    const completion = await response.json();
    console.log('API response:', completion);
  } catch (error) {
    console.error('Error generating content:', error);
  }
})();
