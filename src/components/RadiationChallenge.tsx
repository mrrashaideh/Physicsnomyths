import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Factory, Banana, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';

interface RadiationChallengeProps {
  lang: 'ar' | 'en';
  atomicMode?: boolean;
}

export default function RadiationChallenge({ lang, atomicMode }: RadiationChallengeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const accentColor = atomicMode ? '#00e5ff' : '#39FF14';

  const t = {
    title: lang === 'ar' ? '⚡ تحدي الإشعاع' : '⚡ Radiation Challenge',
    question: lang === 'ar' ? 'من يعطيك جرعة إشعاع أكبر؟' : 'Who gives you a larger radiation dose?',
    nuclear: lang === 'ar' ? '🏭 العيش بجانب محطة نووية سنة' : '🏭 Living next to a nuclear plant for a year',
    banana: lang === 'ar' ? '🍌 أكل موزة واحدة' : '🍌 Eating one banana',
    correct: lang === 'ar' ? '✅ إجابة صحيحة!' : '✅ Correct Answer!',
    incorrect: lang === 'ar' ? '❌ إجابة غير صحيحة!' : '❌ Incorrect Answer!',
    finalMsg: lang === 'ar' ? '🚫 لا للخرافات النووية — لا تخافوا!' : '🚫 No to Nuclear Myths — Don\'t be afraid!',
    explanation: {
      banana: {
        ar: "🍌 الموز يحتوي على عنصر البوتاسيوم، والذي يتضمن نظيرًا مشعًا طبيعيًا يسمى البوتاسيوم-40. هذا يعني أنك عند تناول موزة، تتعرض لجرعة إشعاعية صغيرة جدًا. المفاجأة أن هذه الجرعة قريبة جدًا من الجرعة التي قد تتعرض لها من العيش قرب محطة نووية حديثة لفترة طويلة، وذلك لأن المحطات تخضع لرقابة صارمة وتصدر مستويات منخفضة جدًا من الإشعاع.",
        en: "🍌 Bananas contain potassium, which includes a natural radioactive isotope called Potassium-40. This means when you eat a banana, you are exposed to a very small radiation dose. Surprisingly, this dose is very close to the dose you might receive from living near a modern nuclear plant for a long time, because plants are strictly regulated and emit very low levels of radiation."
      },
      nuclear: {
        ar: "🏭 قد يبدو أن العيش قرب محطة نووية أخطر، لكن في الواقع المحطات الحديثة تطلق كميات ضئيلة جدًا من الإشعاع. بينما الموز يحتوي بشكل طبيعي على البوتاسيوم-40 المشع، مما يعطي جرعة إشعاعية صغيرة عند تناوله. الفرق الحقيقي أن كلا الجرعتين صغيرتان جدًا وآمنتان.",
        en: "🏭 It might seem that living near a nuclear plant is more dangerous, but in reality, modern plants emit very tiny amounts of radiation. Meanwhile, bananas naturally contain radioactive Potassium-40, which gives a small radiation dose when eaten. The real difference is that both doses are very small and safe."
      }
    }
  };

  const handleChoose = (choice: string) => {
    setSelected(choice);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mb-12 overflow-hidden rounded-3xl border transition-all duration-700"
      style={{ 
        background: atomicMode 
          ? 'linear-gradient(135deg, #001d3d, #000814)' 
          : 'linear-gradient(135deg, #0d47a1, #1976d2)',
        borderColor: atomicMode ? `${accentColor}44` : 'transparent',
        boxShadow: atomicMode ? `0 10px 40px ${accentColor}22` : '0 10px 25px rgba(0,0,0,0.2)'
      }}
    >
      <div className="p-8 text-center relative overflow-hidden">
        {/* Background Icon */}
        <Zap className="absolute -top-4 -right-4 w-32 h-32 opacity-10 text-white pointer-events-none" />
        
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          {t.title}
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 font-medium">
          {t.question}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            onClick={() => handleChoose('nuclear')}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
              selected === 'nuclear' ? 'bg-red-500 text-white' : 'bg-white text-[#0d47a1]'
            }`}
          >
            <Factory className="w-5 h-5" />
            {t.nuclear}
          </button>
          <button
            onClick={() => handleChoose('banana')}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
              selected === 'banana' ? 'bg-green-500 text-white' : 'bg-white text-[#0d47a1]'
            }`}
          >
            <Banana className="w-5 h-5" />
            {t.banana}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                {selected === 'banana' ? (
                  <span className="text-[#00ff9f] flex items-center gap-2">
                    <CheckCircle2 className="w-8 h-8" />
                    {t.correct}
                  </span>
                ) : (
                  <span className="text-[#ff4d6d] flex items-center gap-2">
                    <XCircle className="w-8 h-8" />
                    {t.incorrect}
                  </span>
                )}
              </div>

              <p className="text-blue-50 leading-relaxed max-w-2xl mx-auto text-lg">
                {selected === 'banana' ? t.explanation.banana[lang] : t.explanation.nuclear[lang]}
              </p>

              <div className="pt-4 flex items-center justify-center gap-2 text-yellow-300 font-bold text-xl">
                <ShieldAlert className="w-6 h-6" />
                {t.finalMsg}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
