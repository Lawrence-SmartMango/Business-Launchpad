import React from 'react';
import { ExecutionPlan, Language } from '../types';
import { X, CheckCircle, Hammer, Smartphone, Map, Flag } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface ExecutionModalProps {
  plan: ExecutionPlan | null;
  onClose: () => void;
  language: Language;
}

export const ExecutionModal: React.FC<ExecutionModalProps> = ({ plan, onClose, language }) => {
  if (!plan) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-indigo-50/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Map className="text-indigo-600 h-6 w-6" />
               <h2 className="text-2xl font-bold text-slate-900">{t.planTitle}</h2>
            </div>
            <p className="text-slate-600 text-sm mb-2"><span className="font-semibold">{t.planFor}</span> {plan.ideaTitle}</p>
            <p className="text-indigo-700 bg-indigo-100/50 p-2 rounded-lg text-sm italic border border-indigo-100">
              "{plan.overview}"
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="text-slate-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10">
          {plan.phases.map((phase, phaseIdx) => (
            <div key={phaseIdx} className="relative pl-8 border-l-2 border-indigo-200 last:border-0 pb-8 last:pb-0">
              {/* Phase Marker */}
              <div className="absolute -left-[17px] top-0 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {phaseIdx + 1}
              </div>

              {/* Phase Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800">{phase.phaseName}</h3>
                <div className="flex items-center gap-2 text-sm text-indigo-600 mt-1 font-medium bg-indigo-50 w-fit px-3 py-1 rounded-full">
                   <Flag size={14} />
                   Goal: {phase.goal}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {phase.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                      
                      <div className="flex-grow">
                        <h4 className="font-bold text-slate-800 text-lg mb-2">{step.stepTitle}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                          {step.instruction}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-nowrap">
                            <Hammer size={12} /> {t.tool}: {step.toolsNeeded}
                          </span>
                        </div>
                      </div>

                      {/* Verification Box */}
                      <div className="w-full sm:w-64 bg-green-50/50 border border-green-100 rounded-lg p-3 shrink-0">
                        <div className="flex items-center gap-1.5 text-green-700 font-bold text-xs uppercase tracking-wide mb-1">
                          <CheckCircle size={12} /> {t.tip}
                        </div>
                        <p className="text-xs text-green-800 leading-tight">
                          {step.verificationTip}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 text-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
             <button 
                onClick={onClose}
                className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
             >
                {t.closePlan}
             </button>
        </div>
      </div>
    </div>
  );
};