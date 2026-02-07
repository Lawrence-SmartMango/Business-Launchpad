import React from 'react';
import { StartupIdea, Language } from '../types';
import { ShieldAlert, TrendingUp, DollarSign, Rocket, Users, Target, BookOpen } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface IdeaCardProps {
  idea: StartupIdea;
  onRedTeam: (idea: StartupIdea) => void;
  onPlan: (idea: StartupIdea) => void;
  isRedTeaming: boolean;
  isPlanning: boolean;
  language: Language;
}

const Section = ({ icon: Icon, title, content }: { icon: any, title: string, content: string }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex items-center gap-2 mb-1 text-slate-700 font-semibold text-sm uppercase tracking-wider">
      <Icon size={16} className="text-indigo-600" />
      <h3>{title}</h3>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
  </div>
);

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onRedTeam, onPlan, isRedTeaming, isPlanning, language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <div className="bg-indigo-600 p-4 text-white">
        <h2 className="text-xl font-bold">{idea.title}</h2>
      </div>
      
      <div className="p-6 flex-grow">
        <Section icon={Users} title={t.painPoint} content={idea.painPoint} />
        <Section icon={Target} title={t.solution} content={idea.solution} />
        <Section icon={Rocket} title={t.mvp} content={idea.mvp} />
        <Section icon={DollarSign} title={t.revenue} content={idea.revenue} />
        <Section icon={TrendingUp} title={t.validation} content={idea.validation} />
        
        <div className="mt-4 pt-4 border-t border-slate-100">
           <p className="text-xs text-slate-400 italic">{t.scalability}: {idea.scalability}</p>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <button
          onClick={() => onPlan(idea)}
          disabled={isPlanning || isRedTeaming}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 py-2 px-3 rounded-lg font-medium transition-colors disabled:opacity-50 text-sm"
        >
          <BookOpen size={16} />
          {isPlanning ? t.planningBtn : t.planBtn}
        </button>

        <button
          onClick={() => onRedTeam(idea)}
          disabled={isRedTeaming || isPlanning}
          className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 py-2 px-3 rounded-lg font-medium transition-colors disabled:opacity-50 text-sm"
        >
          <ShieldAlert size={16} />
          {isRedTeaming ? t.analyzingBtn : t.redTeamBtn}
        </button>
      </div>
    </div>
  );
};