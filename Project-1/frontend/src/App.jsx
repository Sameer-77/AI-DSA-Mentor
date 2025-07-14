import CodeAnalyzer from './components/CodeAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-2">
        CodeMentor AI
      </h1>
      <p className="text-center text-gray-700 text-lg font-medium mb-8">
        Instantly analyze code, clear doubts, and boost your DSA skills.
      </p>
      <CodeAnalyzer />
    </div>
  );
}

export default App;
