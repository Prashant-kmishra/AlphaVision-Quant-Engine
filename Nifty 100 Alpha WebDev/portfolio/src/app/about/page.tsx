"use client";

import { useState } from "react";
import { Download, ExternalLink, Code2, Mail, Phone, X, Copy } from "lucide-react";

export default function AboutPage() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Header Card */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-blue-100 shadow-[0_8px_32px_rgba(37,99,235,0.06)]">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          
          <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-100 to-teal-50 overflow-hidden border border-gray-100 shrink-0 flex items-center justify-center text-4xl shadow-inner font-bold text-blue-300">
              PM
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider border border-green-100">Open to Opportunities</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">SEBI Certified</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-100">18k+ YouTube</span>
              </div>
              
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Prashant Mishra</h1>
                <p className="text-lg text-gray-700">
                  Data Analyst / Quant Analyst / Data Scientist — Specializing in predictive modeling, statistical analysis, and interactive dashboards.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  B.Tech Production & Industrial Engineering, Delhi Technological University. Focused on rigorous feature engineering, model ensembling, hyperparameter tuning, SHAP explainability, and extracting actionable business insights.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-48 gap-3 shrink-0">
            <button onClick={() => setShowContact(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition-all shadow-md flex justify-center items-center gap-2">
              <Mail className="w-4 h-4" /> Contact me
            </button>
            <a href="https://github.com/Prashant-kmishra" target="_blank" rel="noreferrer" className="w-full bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm border border-gray-200 flex justify-center items-center gap-2">
              <Code2 className="w-4 h-4" /> GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <a href="/media/sys_cache_0x8f2.pdf" download="Prashant_Mishra_Resume.pdf" className="w-full bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm border border-gray-200 flex justify-center items-center gap-2">
              <Download className="w-4 h-4" /> Save as PDF
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 pt-8 border-t border-gray-100">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Roles</h4>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">Data Analyst • Business Analyst • Product Analyst • Quant Analyst • Data Scientist • ML Engineer</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Core Stack</h4>
            <p className="text-sm text-gray-700 font-medium">Python • XGBoost / LightGBM • SQL • Power BI</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Education</h4>
            <p className="text-sm text-gray-700 font-medium">DTU, B.Tech PIE (CGPA: 7.7)</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Availability</h4>
            <p className="text-sm text-gray-700 font-medium">Open to full-time & internships</p>
          </div>
        </div>
      </div>

      {/* Featured Work & Deep Learning Projects */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900 px-2 pt-2">Featured Work & Deep Learning Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Project 1: Nifty Alpha (Deep Learning) */}
          <div className="bg-white/60 backdrop-blur-2xl p-6 rounded-3xl border border-gray-100 shadow-[0_8px_32px_rgba(37,99,235,0.06)] flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)]">
            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Deep Learning & Quant</h4>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">NIFTY 100 Alpha Engine</h3>
            <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
              Built a custom PyTorch Multi-Layer Perceptron (QuantMLP) trained on cross-sectional equity features. Integrated Entity Embeddings for categorical tickers and automated the live inference pipeline on Next.js.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">PyTorch</span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">Deep Learning</span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">Next.js</span>
            </div>
          </div>
          
          {/* Project 2: Sierra Finance */}
          <div className="bg-white/60 backdrop-blur-2xl p-6 rounded-3xl border border-gray-100 shadow-[0_8px_32px_rgba(37,99,235,0.06)] flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)]">
            <h4 className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-2">Machine Learning</h4>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Sierra Finance Credit Risk</h3>
            <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
              Developed a soft-voting ensemble model (CatBoost + XGBoost + LightGBM) on 50,000+ records achieving 98.8% ROC-AUC. Tuned via Optuna Bayesian optimization and resolved class imbalance with SMOTE-Tomek.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">Ensembles</span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">Optuna</span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">SMOTE</span>
            </div>
          </div>

          {/* Project 3: Pulse Health */}
          <div className="bg-white/60 backdrop-blur-2xl p-6 rounded-3xl border border-gray-100 shadow-[0_8px_32px_rgba(37,99,235,0.06)] flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(20,184,166,0.12)]">
            <h4 className="text-[10px] font-bold text-teal-500 uppercase tracking-widest mb-2">AI & Explainability</h4>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Pulse Health AI Engine</h3>
            <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
              Built a segmented insurance premium-prediction engine using stacked ensembles (XGBoost, Random Forest, Ridge meta-model). Engineered composite risk scores and deployed to Streamlit with interactive SHAP explainability.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">Ensembles</span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">SHAP</span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">Streamlit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_400px] gap-6">
        
        {/* Skills Matrix */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Skills matrix</h2>
          <p className="text-sm text-gray-500 mb-8">Self-assessed proficiency, each one evidenced in my projects and internships.</p>

          <div className="space-y-8">
            {/* Category 1 */}
            <div>
              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Machine Learning & Quant</h3>
              <div className="space-y-4">
                <SkillBar name="Python (Pandas, NumPy, Scikit)" score={95} color="bg-blue-400" />
                <SkillBar name="Ensembles (XGBoost, LightGBM, CatBoost)" score={92} color="bg-blue-400" />
                <SkillBar name="SHAP Explainability & Optuna" score={88} color="bg-blue-400" />
                <SkillBar name="Imbalance Handling (SMOTE, Class Weights)" score={85} color="bg-blue-400" />
              </div>
            </div>

            {/* Category 2 */}
            <div>
              <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4">Data Engineering & Analytics</h3>
              <div className="space-y-4">
                <SkillBar name="SQL & Window Functions" score={90} color="bg-purple-400" />
                <SkillBar name="Power BI & DAX" score={88} color="bg-purple-400" />
                <SkillBar name="Web Analytics (GA4, Search Console)" score={84} color="bg-purple-400" />
                <SkillBar name="A/B Testing & Statistics" score={85} color="bg-purple-400" />
              </div>
            </div>
            
            {/* Category 3 */}
            <div>
              <h3 className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-4">Domain Expertise</h3>
              <div className="space-y-4">
                <SkillBar name="Equity Derivatives (SEBI Certified)" score={95} color="bg-pink-400" />
                <SkillBar name="Quantitative Investment (IIT Roorkee)" score={90} color="bg-pink-400" />
                <SkillBar name="Executive Storytelling & Dashboards" score={88} color="bg-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Competency Profile */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Competency profile</h2>
          <p className="text-sm text-gray-500 mb-8">Core differentiators and professional strengths.</p>
          
          <div className="flex-grow flex flex-col justify-center space-y-6">
             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
               <h4 className="font-bold text-gray-900 mb-2">Strongest signal: Deep Modeling & Analytics</h4>
               <p className="text-sm text-gray-600 leading-relaxed">
                 I don't just call `.predict()`. I engineer rigorous pipelines—from raw data extraction and missing value handling, to SMOTE class-imbalance resolution, Optuna hyperparameter tuning, and finally surfacing actionable insights through SHAP explainability and interactive dashboards.
               </p>
             </div>
             
             <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
               <h4 className="font-bold text-blue-900 mb-2">Unique Edge: Finance + Data</h4>
               <p className="text-sm text-blue-800 leading-relaxed">
                 As a SEBI Certified Research Analyst and Angel One DRA Partner with an 18,000+ subscriber YouTube channel, I inherently understand financial markets, credit risk, and business KPIs better than purely technical candidates. I turn raw analytics into actual dollars and decisions.
               </p>
             </div>
          </div>
        </div>

      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowContact(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 border border-blue-100 shadow-inner">
              <Mail className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Let's connect</h2>
            <p className="text-sm text-gray-500 mb-8">Feel free to reach out for roles in data science, analytics, or quantitative finance.</p>
            
            <div className="space-y-4">
              <a href="mailto:prashantkmishra.work@gmail.com" className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer">
                <div className="w-10 h-10 bg-gray-50 group-hover:bg-blue-100 rounded-full flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">prashantkmishra.work@gmail.com</p>
                </div>
              </a>
              
              <a href="tel:+919354221953" className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all cursor-pointer">
                <div className="w-10 h-10 bg-gray-50 group-hover:bg-green-100 rounded-full flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Phone</p>
                  <p className="text-sm font-semibold text-gray-900">+91 9354221953</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillBar({ name, score, color }: { name: string, score: number, color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-end">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-xs font-bold text-gray-400">{score}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}
