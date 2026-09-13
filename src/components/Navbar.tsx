import { 
  Dna, 
  Download, 
  Layers
} from 'lucide-react';
import type { DiscoveryTrack } from '../types/genomics';

interface NavbarProps {
  activeTrack: DiscoveryTrack;
  onOpenExportModal: () => void;
}

export const Navbar = ({
  activeTrack,
  onOpenExportModal,
}: NavbarProps) => {
  const trackLabels: Record<DiscoveryTrack, string> = {
    'mrna-folding': 'mRNA Therapeutics',
    'crispr-cas9': 'CRISPR Gene Editing',
    'small-molecule': 'Kinase Docking',
    'oncology-mutation': 'Oncogenic Variants',
  };

  return (
    <header className="sticky top-0 z-40 bg-bio-dark/80 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Hyperbloom Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-bio-emerald via-bio-teal to-bio-cyan p-0.5 shadow-neon-bio">
              <div className="w-full h-full bg-[#081024] rounded-[14px] flex items-center justify-center">
                <Dna className="w-6 h-6 text-bio-emerald animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-base sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-bio-glow tracking-tight">
                  BIOPHARMA NEXUS
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-bio-emerald/20 text-bio-emerald border border-bio-emerald/40 shadow-neon-bio">
                  AI/ML GENOMICS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Multimodal Molecular AI & Genomic Target Discovery Studio
              </p>
            </div>
          </div>

          {/* Controls & Export */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Active Track Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-slate-900 border border-white/10 text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-bio-cyan" />
              <span className="text-slate-300">
                Track: <strong className="text-bio-emerald">{trackLabels[activeTrack]}</strong>
              </span>
            </div>

            {/* Export Wet-Lab Protocol */}
            <button
              onClick={onOpenExportModal}
              className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-bio-emerald to-bio-cyan text-slate-950 font-bold font-mono text-xs shadow-neon-bio transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Lab Protocol</span>
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/RaghavParasher"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title="View GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
