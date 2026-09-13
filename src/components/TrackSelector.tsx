import type { ReactNode } from 'react';
import { 
  Dna, 
  Scissors, 
  Pill, 
  Flame 
} from 'lucide-react';
import type { DiscoveryTrack } from '../types/genomics';

interface TrackSelectorProps {
  activeTrack: DiscoveryTrack;
  onSelectTrack: (track: DiscoveryTrack) => void;
}

export const TrackSelector = ({
  activeTrack,
  onSelectTrack,
}: TrackSelectorProps) => {
  const tracks: { id: DiscoveryTrack; label: string; icon: ReactNode; subtitle: string; tag: string }[] = [
    {
      id: 'mrna-folding',
      label: 'mRNA Secondary Structure',
      icon: <Dna className="w-5 h-5" />,
      subtitle: 'Thermodynamic minimum free energy (ΔG) and hairpin folding.',
      tag: 'RNA Therapeutics',
    },
    {
      id: 'crispr-cas9',
      label: 'CRISPR-Cas9 sgRNA Profiler',
      icon: <Scissors className="w-5 h-5" />,
      subtitle: 'Guide RNA on-target cleavage and off-target mismatch scoring.',
      tag: 'Gene Editing',
    },
    {
      id: 'small-molecule',
      label: 'Small-Molecule Kinase Docking',
      icon: <Pill className="w-5 h-5" />,
      subtitle: 'Protein-ligand binding affinity (pKd) and covalent residue bonds.',
      tag: 'Oncology Pharmacology',
    },
    {
      id: 'oncology-mutation',
      label: 'Oncogenic Mutation Classifier',
      icon: <Flame className="w-5 h-5" />,
      subtitle: 'ACMG pathogenicity risk and structural perturbation (RMSD).',
      tag: 'Cancer Genomics',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tracks.map((t) => {
        const isActive = activeTrack === t.id;

        return (
          <button
            key={t.id}
            onClick={() => onSelectTrack(t.id)}
            className={`p-5 rounded-3xl border transition-all text-left space-y-3 relative overflow-hidden group hover:scale-[1.02] active:scale-98 ${
              isActive
                ? 'bg-slate-900/90 border-bio-emerald ring-1 ring-bio-emerald shadow-neon-bio'
                : 'bg-slate-900/60 border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-2xl ${
                isActive
                  ? 'bg-bio-emerald text-slate-950 shadow-neon-bio'
                  : 'bg-slate-950 text-slate-400 border border-white/5'
              }`}>
                {t.icon}
              </div>

              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-white/5">
                {t.tag}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white font-display">
                {t.label}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-sans leading-snug line-clamp-2">
                {t.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-white/[0.04] text-[10px] font-mono text-bio-cyan group-hover:underline">
              {isActive ? '● Active AI Model Loaded' : 'Select Discovery Model →'}
            </div>
          </button>
        );
      })}
    </div>
  );
};
