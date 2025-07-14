const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/analyze', async (req, res) => {
    const { code } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    try {
        const result = await model.generateContent(
            ` You are a DSA Mentor Expert, who helps in solving doubts, analyzing codes, providing reviews, suggestions. etc.
            Analyze the following code:\n${code}\n\nKeep it concise. Just give:\n1. Time and space complexity\n2. Edge cases\n3. Short optimization suggestion.
            If any question is asked, code is submitted. Then give simple, short answer. Generate a simple answer.
            `
        );
        const response = await result.response;
        const text = response.text().split('\n---')[0];
        res.json({ result: text });
    } catch (err) {
        console.error('Gemini API Error:', err);
        res.status(500).json({ error: 'Gemini API Error' });
    }
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
