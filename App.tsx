import React, { useState } from 'react';
import { generateIdeas, redTeamIdea, generateExecutionPlan } from './services/geminiService';
import { StartupIdea, RedTeamAnalysis, ExecutionPlan, Language, Region } from './types';
import { IdeaCard } from './components/IdeaCard';
import { RedTeamModal } from './components/RedTeamModal';
import { ExecutionModal } from './components/ExecutionModal';
import { TRANSLATIONS } from './constants';
import { Sparkles, Loader2, Globe, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [region, setRegion] = useState<Region>('china');
  const [focusArea, setFocusArea] = useState('');
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modals state
  const [redTeamAnalysis, setRedTeamAnalysis] = useState<RedTeamAnalysis | null>(null);
  const [executionPlan, setExecutionPlan] = useState<ExecutionPlan | null>(null);
  
  // Loading states for individual cards
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [planningId, setPlanningId] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const handleGenerate = async () => {
    setLoading(true);
    setIdeas([]);
    try {
      const result = await generateIdeas(language, region, focusArea);
      setIdeas(result);
    } catch (e) {
      alert("Failed to generate ideas. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRedTeam = async (idea: StartupIdea) => {
    setAnalyzingId(idea.title);
    try {
      const result = await redTeamIdea(idea, language, region);
      setRedTeamAnalysis(result);
    } catch (e) {
      alert("Failed to analyze risk.");
    } finally {
      setAnalyzingId(null);
    }
  };

  const handlePlan = async (idea: StartupIdea) => {
    setPlanningId(idea.title);
    try {
      const result = await generateExecutionPlan(idea, language, region);
      setExecutionPlan(result);
    } catch (e) {
      alert("Failed to generate execution plan.");
    } finally {
      setPlanningId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="text-white h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-none">{t.appTitle}</h1>
              <p className="text-[10px] sm:text-xs text-indigo-600 font-medium tracking-wide uppercase">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:block text-xs font-medium bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
              Powered by Gemini 3 Pro
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                <Globe size={16} />
                <span className="uppercase">{language === 'en' ? 'EN' : language === 'zh-HK' ? 'HK' : 'CN'}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden hidden group-hover:block animate-in fade-in zoom-in-95 duration-150">
                <button onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'en' ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>English</button>
                <button onClick={() => setLanguage('zh-HK')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'zh-HK' ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>繁體中文</button>
                <button onClick={() => setLanguage('zh-CN')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'zh-CN' ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>简体中文</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Hero / Input Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t.heroTitle}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {t.heroDesc}
          </p>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto overflow-hidden">
            {/* Region Selector */}
            <div className="bg-slate-50/50 border-b border-slate-100 p-2 flex justify-center">
               <div className="flex bg-slate-200/50 p-1 rounded-lg">
                 {(['china', 'gba', 'hk'] as Region[]).map((r) => (
                   <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      region === r 
                      ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                   >
                     <MapPin size={14} className={region === r ? 'fill-indigo-600/20' : ''} />
                     {r === 'china' ? t.regionChina : r === 'gba' ? t.regionGBA : t.regionHK}
                   </button>
                 ))}
               </div>
            </div>

            {/* Input */}
            <div className="p-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                placeholder={t.placeholder}
                className="flex-grow px-4 py-3 rounded-xl bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-indigo-500/20 whitespace-nowrap"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                {loading ? t.thinkingBtn : t.generateBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {ideas.length > 0 && (
          <div className="animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px bg-slate-200 flex-grow"></div>
               <h3 className="text-slate-400 font-medium uppercase tracking-widest text-sm">{t.generatedTitle}</h3>
               <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ideas.map((idea, index) => (
                <IdeaCard
                  key={index}
                  idea={idea}
                  onRedTeam={handleRedTeam}
                  onPlan={handlePlan}
                  isRedTeaming={analyzingId === idea.title}
                  isPlanning={planningId === idea.title}
                  language={language}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State / Educational Content */}
        {!loading && ideas.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 opacity-80">
            {[
              { title: t.assetLightTitle, desc: t.assetLightDesc },
              { title: t.redGreenTitle, desc: t.redGreenDesc },
              { title: t.cashFlowTitle, desc: t.cashFlowDesc }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                 <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                 <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <RedTeamModal 
        analysis={redTeamAnalysis} 
        onClose={() => setRedTeamAnalysis(null)} 
        language={language}
      />
      
      <ExecutionModal
        plan={executionPlan}
        onClose={() => setExecutionPlan(null)}
        language={language}
      />
    </div>
  );
};

export default App;