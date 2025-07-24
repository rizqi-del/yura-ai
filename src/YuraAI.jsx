
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function YuraAI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `https://platform.openai.com/api-keys`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are YURA AI, a powerful assistant that helps with programming, especially coding-related questions. Format responses with code blocks when needed." },
            { role: "user", content: input },
          ],
        }),
      });
      const json = await res.json();
      const message = json.choices?.[0]?.message?.content || "No response.";
      setOutput(message);
    } catch (e) {
      setOutput("Gagal mengambil balasan. Cek API Key kamu atau koneksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black p-6 text-white">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-center text-purple-400"
      >
        YURA AI — Developer Assistant
      </motion.h1>

      <Card className="max-w-3xl mx-auto bg-zinc-800 border-zinc-700">
        <CardContent className="p-6 space-y-4">
          <Textarea
            placeholder="Tanya soal coding..."
            className="bg-zinc-900 text-white border-zinc-600"
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleAsk} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
            {loading ? "Menjawab..." : "Tanya YURA AI"}
          </Button>
          {output && (
            <div className="whitespace-pre-wrap bg-zinc-900 border border-zinc-700 p-4 rounded-xl mt-4 text-sm">
              <Code2 className="inline-block w-4 h-4 mr-2 text-purple-400" />
              <span dangerouslySetInnerHTML={{ __html: output.replace(/```(\w+)?([\s\S]*?)```/g, '<pre class="bg-zinc-950 p-3 rounded-xl mt-2 overflow-x-auto"><code>$2</code></pre>') }} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
