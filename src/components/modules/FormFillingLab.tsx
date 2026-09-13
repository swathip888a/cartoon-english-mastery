import React, { useState } from 'react';
import { REAL_WORLD_FORMS } from '../../data/interactiveFormsData';
import { InteractiveFormConfig, FormField } from '../../types';
import { sound } from '../../utils/audio';
import {
  FileText,
  Plane,
  Building,
  HeartPulse,
  Package,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Info,
  RotateCcw,
  ShieldCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FormFillingLabProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const FormFillingLab: React.FC<FormFillingLabProps> = ({ onAddXp }) => {
  const [selectedFormId, setSelectedFormId] = useState<string>('customs_declaration');
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const [activeHelpField, setActiveHelpField] = useState<FormField | null>(null);

  const activeForm = REAL_WORLD_FORMS.find((f) => f.id === selectedFormId) || REAL_WORLD_FORMS[0];
  const currentValues = formData[selectedFormId] || {};

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [selectedFormId]: {
        ...(prev[selectedFormId] || {}),
        [fieldId]: value
      }
    }));
  };

  const handleAutoFillExample = () => {
    sound.playClick();
    const autoFilled: Record<string, string> = {};
    activeForm.fields.forEach((f) => {
      autoFilled[f.id] = f.exampleValue;
    });

    setFormData((prev) => ({
      ...prev,
      [selectedFormId]: autoFilled
    }));
  };

  const handleResetForm = () => {
    sound.playClick();
    setFormData((prev) => ({
      ...prev,
      [selectedFormId]: {}
    }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const missing = activeForm.fields.filter(
      (f) => f.required && (!currentValues[f.id] || currentValues[f.id].trim() === '')
    );

    if (missing.length > 0) {
      alert(`Please fill in required fields: ${missing.map((m) => m.label).join(', ')}`);
      return;
    }

    sound.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (!completedForms.includes(selectedFormId)) {
      setCompletedForms((prev) => [...prev, selectedFormId]);
      onAddXp(60, `Mastered ${activeForm.title}`);
    } else {
      onAddXp(20, `Practiced ${activeForm.title}`);
    }
  };

  const isCurrentCompleted = completedForms.includes(selectedFormId);

  const getFormIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-5 h-5 text-sky-400" />;
      case 'Building':
        return <Building className="w-5 h-5 text-amber-400" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Package':
        return <Package className="w-5 h-5 text-emerald-400" />;
      default:
        return <FileText className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-2 border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-wider border border-cyan-500/30 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Cartoon Paperwork & Document Lab
              </span>
              <span className="text-xs text-amber-300 font-bold">100% Practical English</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-200">
              Interactive Real-World Form-Filling Lab 📝✨
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Never get confused at airports, hotels, or clinics again. Learn what every single line means in simple English, practice filling real paperwork, and gain complete confidence!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 border-2 border-cyan-500/30 px-4 py-3 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black">Forms Mastered</p>
              <p className="text-lg font-black text-cyan-300">
                {completedForms.length} / {REAL_WORLD_FORMS.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Tabs Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {REAL_WORLD_FORMS.map((form) => {
          const isDone = completedForms.includes(form.id);
          const isSelected = selectedFormId === form.id;
          return (
            <button
              key={form.id}
              onClick={() => {
                sound.playClick();
                setSelectedFormId(form.id);
                setActiveHelpField(null);
              }}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-300 relative ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-900/50 to-slate-900 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  {getFormIcon(form.icon)}
                </div>
                {isDone && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    <CheckCircle className="w-3 h-3" /> Mastered
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-100 mt-3">{form.title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{form.tagline}</p>
            </button>
          );
        })}
      </div>

      {/* Active Form Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: The Interactive Form Paper */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
            {/* Form Title & Banner */}
            <div className="border-b border-slate-800 pb-5 mb-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    {getFormIcon(activeForm.icon)}
                    <span>{activeForm.title}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">{activeForm.tagline}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutoFillExample}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition-all shadow"
                  >
                    <Zap className="w-3.5 h-3.5" /> Auto-Fill Example
                  </button>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                </div>
              </div>

              <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-3.5 mt-4 text-xs text-cyan-200/90 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{activeForm.importanceDescription}</span>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmitForm} className="space-y-6">
              {activeForm.fields.map((field, idx) => {
                const val = currentValues[field.id] || '';
                return (
                  <div
                    key={field.id}
                    onFocus={() => setActiveHelpField(field)}
                    className="space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-[10px] flex items-center justify-center font-black">
                          {idx + 1}
                        </span>
                        <span>{field.label}</span>
                        {field.required && <span className="text-rose-400 font-bold">*</span>}
                      </label>

                      <button
                        type="button"
                        onClick={() => setActiveHelpField(field)}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 opacity-80 group-hover:opacity-100"
                      >
                        <HelpCircle className="w-3.5 h-3.5" /> What is this?
                      </button>
                    </div>

                    {/* Field Input Renderers */}
                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all"
                      />
                    )}

                    {field.type === 'number' && (
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all"
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        value={val}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none transition-all"
                      >
                        <option value="">-- Choose Option --</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === 'radio' && (
                      <div className="space-y-2 pt-1">
                        {field.options?.map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              val === opt.value
                                ? 'bg-cyan-950/40 border-cyan-400 text-cyan-100'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name={field.id}
                              value={opt.value}
                              checked={val === opt.value}
                              onChange={() => handleInputChange(field.id, opt.value)}
                              className="text-cyan-500 focus:ring-cyan-400"
                            />
                            <span className="text-xs font-semibold">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-extrabold text-base shadow-xl hover:shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Verify & Submit Official Document (+60 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Live Field Breakdown */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">
                Live Field Helper
              </h3>
            </div>

            {activeHelpField ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-slate-950 border border-cyan-500/30 p-4 rounded-2xl">
                  <p className="text-xs font-bold text-cyan-300 uppercase">Selected Box:</p>
                  <p className="text-sm font-extrabold text-white mt-1">{activeHelpField.label}</p>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <p className="text-cyan-400 font-bold mb-1">📖 What this means in English:</p>
                    <p>{activeHelpField.englishExplanation}</p>
                  </div>

                  <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-800/30 text-amber-200/90">
                    <p className="text-amber-400 font-bold mb-1">💡 Real-World Pro Tip:</p>
                    <p>{activeHelpField.helperTip}</p>
                  </div>

                  <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-800/30 text-emerald-200/90">
                    <p className="text-emerald-400 font-bold mb-1">✍️ Sample Example Value:</p>
                    <code className="font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-emerald-500/30 inline-block mt-1">
                      {activeHelpField.exampleValue}
                    </code>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs space-y-3">
                <FileText className="w-10 h-10 mx-auto text-slate-600 opacity-60" />
                <p>
                  Click on any input field on the form to view its plain English definition and pro traveler tips!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
