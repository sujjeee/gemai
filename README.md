# GemAI - Free ChatBot CLI 🤖
Introducing GemAI, a command-line interface (CLI) AI ChatBot powered by Google's Gemini API. Engage in natural language conversations with ease and convenience.

## Quick Demo
https://github.com/sujjeee/gemai/assets/101963203/f9947789-4859-4a18-9cda-9cfb121290ac

## Installation:
Installing GemAI is simple. For global access, execute one of the commands below:

* **Using Node Package Manager (NPM):**
```bash
npm install -g gemai
```

* **or if you are using (PNPM):**
```bash
pnpm install -g gemai
```

## Usage:
### Logging In:
Before using GemAI, you'll need to log in with your Google Gemini API token. To do this, run the following command:

```bash
gemai login [token]
```

**Example:**
```bash
gemai login Flqw9TUeaSkRfRii3lmgZLid
```

This command sends a request to the Gemini endpoint for authentication. Upon receiving a successful response, your API key will be verified. 

If you encounter any issues, try running `gemai login <token>` again to refresh your credentials.

### Viewing Configuration:
To view your current GemAI configuration, simply type:

```bash
gemai config
```

This will display the contents of the `gemai.json` file stored on your machine.

### Engaging in a Chat:
Ready to start chatting with the GemAI chatbot? Run the following command:

```bash
gemai chat
```

Once authenticated, you can dive right into a conversation with the chatbot.

## Credits:
GemAI utilizes `Google's Gemini` API for its chatbot capabilities. To obtain your free API key, head over to [Google Gemini API Key](https://makersuite.google.com/app/apikey).