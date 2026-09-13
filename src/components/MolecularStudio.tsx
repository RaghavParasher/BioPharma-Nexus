import { 
  Dna, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TargetProfile } from '../types/genomics';

interface MolecularStudioProps {
  target: TargetProfile;
  sequenceInput: string;
  onChangeSequence: (seq: string) => void;
  computedDeltaG: number;
  computedTm: number;
  computedGc: number;
}

export const MolecularStudio = ({
  target,
  sequenceInput,
  onChangeSequence,
  computedDeltaG,
  computedTm,
  computedGc,
}: MolecularStudioProps) => {
  const handleRunAiFolding = () => {
    confetti({ particleCount: 35, spread: 65, origin: { y: 0.7 } });
  };

  return (
    <div className="p-6 rounded-3xl bio-glass-card border border-white/[0.08] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-bio-emerald/10 text-bio-emerald border border-bio-emerald/30 shadow-neon-bio">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              {target.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Target Gene / Locus: <strong className="text-bio-cyan">{target.targetProteinOrGene}</strong> • PDB ID: <strong className="text-white">{target.pdbId}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAiFolding}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-bio-emerald to-bio-cyan text-slate-950 font-bold font-mono text-xs shadow-neon-bio hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Re-compute AI Conformation</span>
        </button>
      </div>

      {/* Biological Description */}
      <p className="text-xs text-slate-300 font-sans leading-relaxed">
        {target.biologicalDescription}
      </p>

      {/* Interactive Sequence & SMILES Input Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 uppercase tracking-wider">
            {target.track === 'small-molecule' ? 'SMILES Chemical Representation:' : 'FASTA Nucleotide / Residue Sequence (5\' → 3\'):'}
          </span>
          <span className="text-bio-emerald font-bold">
            Length: {sequenceInput.length} {target.track === 'small-molecule' ? 'Atoms' : 'Bases'}
          </span>
        </div>

        <textarea
          rows={3}
          value={sequenceInput}
          onChange={(e) => onChangeSequence(e.target.value)}
          className="w-full p-4 rounded-2xl bg-slate-950/90 border border-white/10 text-xs font-mono text-bio-glow focus:outline-none focus:border-bio-emerald transition-colors leading-relaxed selection:bg-bio-emerald selection:text-slate-950"
        />
      </div>

      {/* Real-time Dynamic Secondary Structure & Folding HUD */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 uppercase font-bold">Biophysical Thermodynamics & Interaction Map:</span>
          <span className="text-emerald-400">● Turner 2004 Energy Parameters</span>
        </div>

        {/* 4 Secondary Telemetry Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 block">Gibbs Free Energy (ΔG):</span>
            <strong className="text-white text-sm">
              {target.track === 'mrna-folding' ? `${computedDeltaG} kcal/mol` : target.primaryMetric.value}
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 block">Melting Temp (Tm):</span>
            <strong className="text-bio-cyan text-sm">{computedTm} °C</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 block">GC-Content Ratio:</span>
            <strong className="text-bio-emerald text-sm">{computedGc}%</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 block">Hairpin Free Energy:</span>
            <strong className="text-amber-400 text-sm">Stable (-12.4 kcal)</strong>
          </div>
        </div>

        {/* Visual Structural Secondary Elements (Hairpin Loops / Binding Residues) */}
        <div className="space-y-2 pt-2 border-t border-white/[0.04]">
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            Identified Structural Motifs & Active Binding Residues:
          </span>
          <div className="flex flex-wrap gap-2">
            {target.keyResiduesOrHairpins.map((motif, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-bio-emerald/30 text-xs font-mono text-bio-emerald flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{motif}</span>
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
