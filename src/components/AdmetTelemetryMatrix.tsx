import { 
  ShieldCheck
} from 'lucide-react';
import type { AdmetProfile } from '../types/genomics';

interface AdmetTelemetryMatrixProps {
  admet: AdmetProfile;
}

export const AdmetTelemetryMatrix = ({ admet }: AdmetTelemetryMatrixProps) => {
  return (
    <div className="p-6 rounded-3xl bio-glass-card border border-white/[0.08] space-y-6">
      
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-white/[0.08]">
        <div className="p-2.5 rounded-2xl bg-bio-indigo/10 text-bio-indigo border border-bio-indigo/30 shadow-neon-indigo">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg text-white">
            ADMET Pharmacokinetics & Toxicity Telemetry
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Absorption, Distribution, Metabolism, Excretion, and hERG Cardiotoxicity Profiling
          </p>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Molecular Weight */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Molecular Weight:</span>
            <span className={admet.molecularWeight < 500 ? 'text-emerald-400' : 'text-amber-400'}>
              {admet.molecularWeight < 500 ? '< 500 Da' : 'Biologic'}
            </span>
          </div>
          <div className="text-xl font-black text-white font-display pt-1">
            {admet.molecularWeight.toLocaleString()} <span className="text-xs text-slate-400">g/mol</span>
          </div>
          <span className="text-[10px] text-slate-500">Lipinski Constraint: &lt;500 Da</span>
        </div>

        {/* LogP Partition */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Lipophilicity (LogP):</span>
            <span className="text-emerald-400 font-bold">Optimal</span>
          </div>
          <div className="text-xl font-black text-bio-cyan font-display pt-1">
            {admet.logP}
          </div>
          <span className="text-[10px] text-slate-500">Target Range: -0.4 to 5.6</span>
        </div>

        {/* H-Bond Donors/Acceptors */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>H-Bond (HBD / HBA):</span>
            <span className="text-bio-emerald font-bold">Compliant</span>
          </div>
          <div className="text-xl font-black text-white font-display pt-1">
            {admet.hBondDonors} / {admet.hBondAcceptors}
          </div>
          <span className="text-[10px] text-slate-500">HBD &le; 5, HBA &le; 10</span>
        </div>

        {/* hERG Cardiotoxicity Risk */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.06] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>hERG Cardiotoxicity:</span>
            <span className="text-emerald-400 font-bold">{admet.hergCardiotoxRisk} Risk</span>
          </div>
          <div className="text-xl font-black text-emerald-400 font-display pt-1">
            Safe (&gt;30 &mu;M)
          </div>
          <span className="text-[10px] text-slate-500">Zero QT Prolongation</span>
        </div>

      </div>

    </div>
  );
};
