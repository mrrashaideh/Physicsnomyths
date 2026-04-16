import { useState } from 'react';
import { Calculator, Plane, Cigarette, Activity, Mountain, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface RadiationCalculatorProps {
  lang: 'ar' | 'en';
  atomicMode?: boolean;
}

export default function RadiationCalculator({ lang, atomicMode }: RadiationCalculatorProps) {
  const [flights, setFlights] = useState<number>(0);
  const [smoking, setSmoking] = useState<number>(0);
  const [xray, setXray] = useState<number>(0);
  const [altitude, setAltitude] = useState<number>(0);
  const [result, setResult] = useState<{ dose: number; status: string; color: string } | null>(null);

  const accentColor = atomicMode ? '#00e5ff' : '#39FF14';

  const calculateDose = () => {
    const dose = (flights * 0.04) + (smoking * 365 * 0.015) + (xray * 0.1) + altitude;
    
    let status = '';
    let color = '';

    if (lang === 'ar') {
      if (dose < 1) {
        status = "🟢 آمنة جدًا (ضمن الطبيعي)";
        color = "text-green-400";
      } else if (dose < 5) {
        status = "🟡 ضمن الحدود المقبولة";
        color = "text-yellow-400";
      } else {
        status = "🔴 مرتفعة نسبيًا - راجع نمط حياتك";
        color = "text-red-400";
      }
    } else {
      if (dose < 1) {
        status = "🟢 Very Safe (Within Normal Range)";
        color = "text-green-400";
      } else if (dose < 5) {
        status = "🟡 Within Acceptable Limits";
        color = "text-yellow-400";
      } else {
        status = "🔴 Relatively High - Review Your Lifestyle";
        color = "text-red-400";
      }
    }

    setResult({ dose, status, color });
  };

  const t = {
    title: lang === 'ar' ? '☢️ حاسبة الجرعة الإشعاعية المتقدمة' : '☢️ Advanced Radiation Dose Calculator',
    flights: lang === 'ar' ? '✈️ عدد الرحلات سنويًا:' : '✈️ Flights per year:',
    smoking: lang === 'ar' ? '🚬 عدد السجائر يوميًا:' : '🚬 Cigarettes per day:',
    xray: lang === 'ar' ? '🏥 عدد أشعة X:' : '🏥 Number of X-rays:',
    altitude: lang === 'ar' ? '⛰️ هل تعيش في منطقة مرتفعة؟' : '⛰️ Do you live in a high altitude area?',
    yes: lang === 'ar' ? 'نعم' : 'Yes',
    no: lang === 'ar' ? 'لا' : 'No',
    calculate: lang === 'ar' ? 'احسب الجرعة' : 'Calculate Dose',
    yourDose: lang === 'ar' ? '📊 جرعتك التقريبية:' : '📊 Your Approximate Dose:',
    unit: lang === 'ar' ? 'ملي سيفرت سنويًا' : 'mSv per year',
    info: lang === 'ar' 
      ? 'هذه الحاسبة تعطي تقديراً تقريبياً بناءً على متوسطات عالمية. الجرعة الطبيعية السنوية للإنسان هي حوالي 2.4 mSv.' 
      : 'This calculator gives an approximate estimate based on global averages. The average annual natural dose for a human is about 2.4 mSv.'
  };

  return (
    <div 
      className="mt-20 bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 shadow-2xl max-w-2xl mx-auto overflow-hidden transition-all duration-700"
      style={{ 
        borderColor: atomicMode ? `${accentColor}44` : undefined,
        boxShadow: atomicMode ? `0 0 40px ${accentColor}22` : undefined
      }}
    >
      <h2 
        className="text-3xl font-bold mb-6 flex items-center gap-3 transition-colors duration-700"
        style={{ color: accentColor }}
      >
        <Calculator className="w-8 h-8" />
        {t.title}
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flights */}
          <div className="space-y-2">
            <label className="text-gray-300 flex items-center gap-2">
              <Plane className="w-4 h-4 text-blue-400" />
              {t.flights}
            </label>
            <input
              type="number"
              min="0"
              value={flights}
              onChange={(e) => setFlights(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none transition-all"
              style={{ borderColor: atomicMode ? `${accentColor}44` : undefined }}
            />
          </div>

          {/* Smoking */}
          <div className="space-y-2">
            <label className="text-gray-300 flex items-center gap-2">
              <Cigarette className="w-4 h-4 text-orange-400" />
              {t.smoking}
            </label>
            <input
              type="number"
              min="0"
              value={smoking}
              onChange={(e) => setSmoking(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none transition-all"
              style={{ borderColor: atomicMode ? `${accentColor}44` : undefined }}
            />
          </div>

          {/* X-Ray */}
          <div className="space-y-2">
            <label className="text-gray-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              {t.xray}
            </label>
            <input
              type="number"
              min="0"
              value={xray}
              onChange={(e) => setXray(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none transition-all"
              style={{ borderColor: atomicMode ? `${accentColor}44` : undefined }}
            />
          </div>

          {/* Altitude */}
          <div className="space-y-2">
            <label className="text-gray-300 flex items-center gap-2">
              <Mountain className="w-4 h-4 text-emerald-400" />
              {t.altitude}
            </label>
            <select
              value={altitude}
              onChange={(e) => setAltitude(parseFloat(e.target.value))}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none transition-all appearance-none"
              style={{ borderColor: atomicMode ? `${accentColor}44` : undefined }}
            >
              <option value="0">{t.no}</option>
              <option value="0.3">{t.yes}</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateDose}
          className="w-full font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ 
            backgroundColor: accentColor,
            color: 'black',
            boxShadow: `0 0 20px ${accentColor}44`
          }}
        >
          {t.calculate}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-black/40 rounded-2xl border border-gray-700 space-y-2"
          >
            <p className="text-gray-400 text-sm">{t.yourDose}</p>
            <p className="text-3xl font-bold text-white">
              {result.dose.toFixed(3)} <span className="text-lg font-normal text-gray-500">{t.unit}</span>
            </p>
            <p className={`text-lg font-medium ${result.color}`}>
              {result.status}
            </p>
          </motion.div>
        )}

        <div className="flex items-start gap-3 p-4 bg-blue-900/20 rounded-xl border border-blue-800/30">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300 leading-relaxed">
            {t.info}
          </p>
        </div>
      </div>
    </div>
  );
}
