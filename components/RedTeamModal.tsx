import React from 'react';
import { RedTeamAnalysis, Language } from '../types';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface RedTeamModalProps {
  analysis: RedTeamAnalysis | null;
  onClose: () => void;
  language: Language;
}

export const RedTeamModal: React.FC<RedTeamModalProps> = ({ analysis, onClose, language }) => {
  if (!analysis) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{t.redTeamTitle}</h2>
            <p className="text-slate-500 text-sm">{t.critiqueFor}: {analysis.ideaTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="bg-red-50 rounded-xl p-5 border border-red-100">
            <h3 className="flex items-center gap-2 text-red-700 font-bold mb-4">
              <AlertTriangle className="h-5 w-5" />
              {t.criticalRisks}
            </h3>
            <ul className="space-y-3">
              {analysis.critiques.map((critique, idx) => (
                <li key={idx} className="flex gap-3 text-red-800 text-sm">
                  <span className="font-bold shrink-0">{idx + 1}.</span>
                  <span>{critique}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border border-green-100">
            <h3 className="flex items-center gap-2 text-green-700 font-bold mb-4">
              <CheckCircle className="h-5 w-5" />
              {t.counterMeasures}
            </h3>
            <ul className="space-y-3">
              {analysis.counterMeasures.map((measure, idx) => (
                <li key={idx} className="flex gap-3 text-green-800 text-sm">
                  <span className="font-bold shrink-0">{idx + 1}.</span>
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
             <button 
                onClick={onClose}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors"
             >
                {t.closeModal}
             </button>
        </div>
      </div>
    </div>
  );
};