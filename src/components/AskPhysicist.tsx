import React, { useState } from 'react';
import { Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AskPhysicistProps {
  lang: 'ar' | 'en';
  atomicMode?: boolean;
}

export default function AskPhysicist({ lang, atomicMode }: AskPhysicistProps) {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const accentColor = atomicMode ? '#00e5ff' : '#39FF14';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !question.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // Simulate submission
    setStatus('success');
    setName('');
    setQuestion('');
    setTimeout(() => setStatus('idle'), 5000);
  };

  const t = {
    title: lang === 'ar' ? '🧠 اسأل فيزيائيًا' : '🧠 Ask a Physicist',
    description: lang === 'ar' 
      ? 'هل لديك خرافة أو فكرة عن الفيزياء؟ أرسلها لنا وسنقوم بتحليلها علميًا!' 
      : 'Do you have a myth or an idea about physics? Send it to us and we will analyze it scientifically!',
    nameLabel: lang === 'ar' ? 'اسمك' : 'Your Name',
    questionLabel: lang === 'ar' ? 'اكتب الخرافة أو السؤال هنا...' : 'Write the myth or question here...',
    send: lang === 'ar' ? 'إرسال' : 'Send',
    success: lang === 'ar' ? '✅ تم الإرسال! سنقوم بتحليلها علميًا قريبًا.' : '✅ Sent! We will analyze it scientifically soon.',
    error: lang === 'ar' ? '❌ الرجاء تعبئة جميع الحقول' : '❌ Please fill in all fields',
  };

  return (
    <div 
      className="mt-20 bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 shadow-2xl max-w-2xl mx-auto overflow-hidden relative transition-all duration-700"
      style={{ 
        borderColor: atomicMode ? `${accentColor}44` : undefined,
        boxShadow: atomicMode ? `0 0 40px ${accentColor}22` : undefined
      }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <MessageSquare className="w-32 h-32 transition-colors duration-700" style={{ color: accentColor }} />
      </div>

      <h2 
        className="text-3xl font-bold mb-4 flex items-center gap-3 transition-colors duration-700"
        style={{ color: accentColor }}
      >
        {t.title}
      </h2>
      <p className="text-gray-400 mb-8 leading-relaxed">
        {t.description}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <User className="w-3 h-3" />
            {t.nameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === 'ar' ? 'مثال: أحمد' : 'e.g. John Doe'}
            className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none transition-all"
            style={{ borderColor: atomicMode ? `${accentColor}44` : undefined }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <MessageSquare className="w-3 h-3" />
            {t.questionLabel}
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none transition-all resize-none"
            style={{ borderColor: atomicMode ? `${accentColor}44` : undefined }}
          />
        </div>

        <button
          type="submit"
          className="w-full text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          style={{ 
            backgroundColor: atomicMode ? accentColor : 'white',
            boxShadow: atomicMode ? `0 0 20px ${accentColor}44` : undefined
          }}
        >
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          {t.send}
        </button>

        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-800/30 rounded-xl text-green-400"
            >
              <CheckCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{t.success}</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/30 rounded-xl text-red-400"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{t.error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
