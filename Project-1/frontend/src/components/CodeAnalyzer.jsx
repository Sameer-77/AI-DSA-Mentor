import { useState } from 'react';
import axios from 'axios';

const CodeAnalyzer = () => {
    const [code, setCode] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        setLoading(true);
        setAnalysis('Thinking...');
        try {
            const response = await axios.post('http://localhost:3000/analyze', { code });
            const result = response.data.result.trim();
            setAnalysis(result || 'No response from Gemini');
        } catch (err) {
            console.error(err);
            setAnalysis('Error processing input');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-blue-200 transition-all duration-300">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
                Ask a DSA Question or Paste Your Code
            </h2>

            <textarea
                className="w-full h-52 p-4 font-mono text-sm rounded-xl resize-y border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200"
                placeholder="Example: What is binary search? Or paste your code for analysis..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button
                onClick={handleAnalyze}
                className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
                {loading ? 'Submitting...' : '🚀 Submit'}
            </button>

            {analysis && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-center text-blue-700 mb-3">🧠 Response</h3>
                    <div className="whitespace-pre-wrap bg-blue-50 border border-blue-200 text-gray-800 p-5 rounded-xl text-sm leading-relaxed shadow-inner">
                        {analysis}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeAnalyzer;
