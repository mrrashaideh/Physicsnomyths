/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import RadiationMap from './components/RadiationMap';
import RadiationCalculator from './components/RadiationCalculator';
import AskPhysicist from './components/AskPhysicist';
import AtomicParticles from './components/AtomicParticles';
import RadiationChallenge from './components/RadiationChallenge';

type Language = 'ar' | 'en';

interface MythFact {
  id: number;
  image: string;
  myth: {
    ar: string;
    en: string;
  };
  fact: {
    ar: string;
    en: string;
  };
}

const myths: MythFact[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    myth: {
      ar: "المياه القريبة من المنشآت النووية خطيرة إشعاعيًا.",
      en: "Water near nuclear facilities is radioactively dangerous."
    },
    fact: {
      ar: "فيزيائيًا، يتم قياس الإشعاع بوحدات مثل 'السيفرت' (Sievert)، وقد أظهرت القياسات أن الجرعات في هذه المياه منخفضة جدًا. الإشعاع يتناقص مع المسافة وفق قانون التربيع العكسي (Inverse Square Law)، مما يجعل تأثيره ضعيفًا جدًا عند الانتشار في الماء.",
      en: "Physically, radiation is measured in units like 'Sieverts'. Measurements show doses in this water are very low. Radiation decreases with distance according to the 'Inverse Square Law', making its effect very weak as it spreads in water."
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    myth: {
      ar: "الطعام المشع يصبح مصدر إشعاع.",
      en: "Irradiated food becomes a source of radiation."
    },
    fact: {
      ar: "التشعيع يعتمد على موجات كهرومغناطيسية عالية الطاقة (مثل أشعة غاما) تقوم بكسر الروابط في DNA البكتيريا. لكن هذه الطاقة لا تبقى في الطعام، لأن الإشعاع لا يُخزن في المادة، بل يمر عبرها أو يُمتص دون تحويلها إلى مصدر إشعاعي.",
      en: "Irradiation relies on high-energy electromagnetic waves (like gamma rays) that break bonds in bacterial DNA. However, this energy does not remain in the food because radiation is not stored in matter; it passes through or is absorbed without turning the food into a radioactive source."
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    myth: {
      ar: "الأشعة الطبية تسبب ضرر مباشر للجسم.",
      en: "Medical X-rays cause direct damage to the body."
    },
    fact: {
      ar: "الأشعة السينية هي موجات كهرومغناطيسية ذات طاقة محسوبة بدقة. الجرعة المستخدمة صغيرة جدًا مقارنة بالحدود الضارة، ويتم التحكم فيها وفق مبدأ 'ALARA' (أقل جرعة ممكنة). لذلك تأثيرها الإشعاعي محدود جدًا ولا يسبب أضرار فورية.",
      en: "X-rays are electromagnetic waves with precisely calculated energy. The dose used is very small compared to harmful limits and is controlled according to the 'ALARA' principle (As Low As Reasonably Achievable). Therefore, its radioactive effect is very limited and does not cause immediate damage."
    }
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
    myth: {
      ar: "كل الإشعاع ضار بنفس الدرجة.",
      en: "All radiation is equally harmful."
    },
    fact: {
      ar: "الإشعاع ينقسم إلى مؤين وغير مؤين. الإشعاع المؤين (مثل غاما) يمتلك طاقة كافية لتأيين الذرات، بينما غير المؤين (مثل موجات الراديو) لا يمتلك هذه القدرة. التأثير يعتمد على الطاقة والتردد وليس مجرد وجود الإشعاع.",
      en: "Radiation is divided into ionizing and non-ionizing. Ionizing radiation (like gamma) has enough energy to ionize atoms, while non-ionizing (like radio waves) does not. The effect depends on energy and frequency, not just the presence of radiation."
    }
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
    myth: {
      ar: "أي كمية إشعاع تسبب ضرر.",
      en: "Any amount of radiation causes harm."
    },
    fact: {
      ar: "الجسم يتعرض يوميًا لإشعاع طبيعي (Cosmic & Terrestrial Radiation). الجرعات الصغيرة لا تسبب ضررًا لأن الخلايا لديها آليات إصلاح للـDNA. التأثير يعتمد على 'الجرعة الممتصة' وليس مجرد التعرض.",
      en: "The body is exposed daily to natural radiation (Cosmic & Terrestrial Radiation). Small doses do not cause harm because cells have DNA repair mechanisms. The effect depends on the 'Absorbed Dose', not just the exposure."
    }
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    myth: {
      ar: "الأجهزة المنزلية تبعث إشعاع خطير.",
      en: "Home appliances emit dangerous radiation."
    },
    fact: {
      ar: "الأجهزة مثل الميكروويف تستخدم إشعاع غير مؤين بترددات منخفضة. هذا النوع لا يملك طاقة كافية لكسر الروابط الذرية، لذلك لا يسبب تلفًا بيولوجيًا عند الاستخدام الصحيح.",
      en: "Appliances like microwaves use non-ionizing radiation at low frequencies. This type does not have enough energy to break atomic bonds, so it does not cause biological damage when used correctly."
    }
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
    myth: {
      ar: "الإشعاع شيء صناعي فقط.",
      en: "Radiation is only a man-made phenomenon."
    },
    fact: {
      ar: "الإشعاع ظاهرة فيزيائية طبيعية موجودة منذ نشأة الكون، مثل الأشعة الكونية القادمة من الفضاء. حتى جسم الإنسان يحتوي على نظائر مشعة طبيعية مثل البوتاسيوم-40، لكن بمستويات آمنة جدًا.",
      en: "Radiation is a natural physical phenomenon that has existed since the beginning of the universe, such as cosmic rays from space. Even the human body contains natural radioactive isotopes like Potassium-40, but at very safe levels."
    }
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [atomicMode, setAtomicMode] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = {
    title: lang === 'ar' ? 'لا خرافات في الفيزياء' : 'No Myth Physics',
    subtitle: lang === 'ar' ? 'كشف الحقائق وراء الفيزياء النووية' : 'Uncovering the Truth Behind Nuclear Physics',
    mythLabel: lang === 'ar' ? 'الخرافة' : 'Myth',
    factLabel: lang === 'ar' ? 'الحقيقة' : 'Fact',
    switchLang: lang === 'ar' ? 'English' : 'العربية',
    atomicToggle: lang === 'ar' ? '⚛️ وضع الذرة' : '⚛️ Atomic Mode',
    quizTitle: lang === 'ar' ? '🎮 اختبر نفسك' : '🎮 Test Yourself',
    quizScore: lang === 'ar' ? 'درجتك الحالية: ' : 'Current Score: ',
    finalQuestion: lang === 'ar' ? 'هل تعتقد الآن أن الإشعاع خطر حقيقي؟' : 'Do you now believe radiation is a real danger?',
    yes: lang === 'ar' ? 'نعم' : 'Yes',
    no: lang === 'ar' ? 'لا' : 'No',
    finalSuccess: lang === 'ar' ? '👏 رائع! يبدو أنك فهمت أن الإشعاع ليس خطرًا مطلقًا بل يعتمد على الجرعة.' : '👏 Great! It seems you understand that radiation is not an absolute danger but depends on the dose.',
    finalFailure: lang === 'ar' ? '📖 ربما تحتاج لإعادة قراءة المعلومات والتفكير بشكل علمي أكثر.' : '📖 Perhaps you need to re-read the information and think more scientifically.',
    questions: [
      {
        q: lang === 'ar' ? 'هل الطعام المشع يصبح خطير؟' : 'Does irradiated food become dangerous?',
        a: false
      },
      {
        q: lang === 'ar' ? 'هل كل الإشعاع ضار؟' : 'Is all radiation harmful?',
        a: false
      },
      {
        q: lang === 'ar' ? 'هل الأشعة الطبية آمنة بجرعات صغيرة؟' : 'Are medical X-rays safe in small doses?',
        a: true
      },
      {
        q: lang === 'ar' ? 'هل الجرعة هي العامل الأساسي للخطر؟' : 'Is dosage the primary factor for risk?',
        a: true
      }
    ]
  };

  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [finalChoice, setFinalChoice] = useState<string | null>(null);

  const handleAnswer = (index: number, userChoice: boolean) => {
    if (userAnswers[index] !== undefined) return;
    if (userChoice === t.questions[index].a) {
      setScore(prev => prev + 1);
    }
    setUserAnswers(prev => ({ ...prev, [index]: userChoice }));
  };

  const accentColor = atomicMode ? '#00e5ff' : '#39FF14';
  const bgGradient = atomicMode 
    ? 'radial-gradient(circle at center, #001d3d 0%, #000814 100%)' 
    : '#0a0a0a';

  return (
    <div 
      className="min-h-screen text-white font-sans selection:bg-[#39FF14] selection:text-black transition-colors duration-700"
      style={{ background: bgGradient }}
    >
      {atomicMode && <AtomicParticles />}

      {/* Language Switcher */}
      <div className="fixed top-6 left-6 z-50 flex flex-col gap-3">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
          style={{ boxShadow: `0 0 20px ${accentColor}44` }}
        >
          <Languages size={20} />
          <span>{t.switchLang}</span>
        </button>

        <button
          onClick={() => setAtomicMode(!atomicMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
          style={{ 
            backgroundColor: accentColor, 
            color: 'black',
            boxShadow: `0 0 20px ${accentColor}66`
          }}
        >
          <span>{t.atomicToggle}</span>
        </button>
      </div>

      {/* Header */}
      <header 
        className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b-4 transition-colors duration-700"
        style={{ borderColor: accentColor }}
      >
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1581093583449-80d601dfdf0e?auto=format&fit=crop&q=80&w=1920')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 
            className="text-5xl md:text-7xl font-black mb-4 tracking-tight transition-all duration-700"
            style={{ 
              color: accentColor,
              textShadow: `0 0 20px ${accentColor}88`
            }}
          >
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Animated particles or glow effect could go here */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Radiation Challenge Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <RadiationChallenge lang={lang} atomicMode={atomicMode} />
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {myths.map((item, index) => (
              <motion.div
                key={`${item.id}-${lang}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 shadow-xl flex flex-col ${index === myths.length - 1 ? 'md:col-span-2 md:text-xl' : ''}`}
                style={{ 
                  borderColor: atomicMode ? `${accentColor}44` : undefined,
                  boxShadow: atomicMode ? `0 0 30px ${accentColor}22` : undefined
                }}
              >
                <div className={`relative overflow-hidden ${index === myths.length - 1 ? 'h-80' : 'h-56'}`}>
                  <img
                    src={item.image}
                    alt={item.myth[lang]}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091012184-5c4c3c3f0c3b';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
                </div>

                <div className="p-6 flex-grow flex flex-col gap-6">
                  {/* Myth Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-sm">
                      <AlertTriangle size={18} />
                      <span>{t.mythLabel}</span>
                    </div>
                    <p className="leading-relaxed text-gray-200">
                      {item.myth[lang]}
                    </p>
                  </div>

                  <div className="h-px bg-gray-800 w-full" />

                  {/* Fact Section */}
                  <div className="space-y-3">
                    <div 
                      className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-colors duration-700"
                      style={{ color: atomicMode ? '#00ff9f' : '#39FF14' }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{t.factLabel}</span>
                    </div>
                    <p className="leading-relaxed text-gray-300">
                      {item.fact[lang]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quiz Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 shadow-2xl max-w-4xl mx-auto transition-all duration-700"
          style={{ 
            borderColor: atomicMode ? `${accentColor}44` : undefined,
            boxShadow: atomicMode ? `0 0 40px ${accentColor}22` : undefined
          }}
        >
          <h2 
            className="text-3xl font-bold mb-8 flex items-center gap-3 transition-colors duration-700"
            style={{ color: accentColor }}
          >
            {t.quizTitle}
          </h2>

          <div className="space-y-8">
            {t.questions.map((q, i) => (
              <div key={i} className="space-y-4">
                <p className="text-xl text-gray-200 flex items-center gap-4">
                  <span>{i + 1}- {q.q}</span>
                  {userAnswers[i] !== undefined && (
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      className={`text-2xl font-bold ${userAnswers[i] === q.a ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {userAnswers[i] === q.a ? '✅' : '❌'}
                    </motion.span>
                  )}
                </p>
                <div className="flex gap-4">
                  <button
                    disabled={userAnswers[i] !== undefined}
                    onClick={() => handleAnswer(i, true)}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${userAnswers[i] !== undefined ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#0d47a1] hover:bg-[#1565c0] text-white cursor-pointer'}`}
                  >
                    {t.yes}
                  </button>
                  <button
                    disabled={userAnswers[i] !== undefined}
                    onClick={() => handleAnswer(i, false)}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${userAnswers[i] !== undefined ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#0d47a1] hover:bg-[#1565c0] text-white cursor-pointer'}`}
                  >
                    {t.no}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-gray-800">
            <p 
              className="text-2xl font-bold transition-colors duration-700"
              style={{ color: accentColor }}
            >
              {t.quizScore} {score} / {t.questions.length}
            </p>
          </div>

          <div className="mt-12 text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-200">{t.finalQuestion}</h3>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setFinalChoice('no')}
                className="px-8 py-3 bg-[#0d47a1] hover:bg-[#1565c0] text-white rounded-2xl font-bold text-lg transition-all cursor-pointer"
              >
                {t.no}
              </button>
              <button
                onClick={() => setFinalChoice('yes')}
                className="px-8 py-3 bg-[#0d47a1] hover:bg-[#1565c0] text-white rounded-2xl font-bold text-lg transition-all cursor-pointer"
              >
                {t.yes}
              </button>
            </div>
            <AnimatePresence>
              {finalChoice && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-xl font-bold mt-6 p-4 rounded-2xl transition-colors duration-700`}
                  style={{ 
                    color: finalChoice === 'no' ? (atomicMode ? '#00ff9f' : '#39FF14') : '#ff4d6d',
                    backgroundColor: finalChoice === 'no' ? (atomicMode ? '#00ff9f11' : '#39FF1411') : '#ff4d6d11'
                  }}
                >
                  {finalChoice === 'no' ? t.finalSuccess : t.finalFailure}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Radiation Calculator Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <RadiationCalculator lang={lang} atomicMode={atomicMode} />
        </motion.section>

        {/* Radiation Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <RadiationMap lang={lang} />
        </motion.section>

        {/* Ask a Physicist Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AskPhysicist lang={lang} atomicMode={atomicMode} />
        </motion.section>

        {/* Footer Info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center text-gray-500 border-t border-gray-900 pt-10"
        >
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Info size={16} />
              <p className="text-sm">
                {lang === 'ar' 
                  ? 'المصدر: Washington State Department of Health' 
                  : 'Source: Washington State Department of Health'}
              </p>
            </div>
            <a 
              href="https://doh.wa.gov/community-and-environment/radiation/radiation-topics/radiation-myths-and-facts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#39FF14] hover:underline break-all max-w-xs md:max-w-none"
            >
              https://doh.wa.gov/community-and-environment/radiation/radiation-topics/radiation-myths-and-facts
            </a>
          </div>
          <p className="text-xs uppercase tracking-widest">© 2026 No Myth Physics</p>
        </motion.footer>
      </main>
    </div>
  );
}
