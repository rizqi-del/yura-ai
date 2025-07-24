
import React, { useState } from 'react';

function YuraAI() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || 'No response');
    } catch (err) {
      setResponse('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>YURA AI 💬</h1>
      <textarea
        placeholder="Tanya apa aja ke Yura AI..."
        rows="5"
        style={{ width: '100%', padding: '0.5rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSend} style={{ marginTop: '1rem' }}>
        Kirim
      </button>
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-line' }}>
        <strong>Jawaban:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default YuraAI;
