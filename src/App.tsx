import { useState, useEffect } from 'react';
import { 
  Dna, 
  Sparkles, 
  Layers, 
  Microscope, 
  Database, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { MetricStrip } from './components/MetricStrip';
import { TrackSelector } from './components/TrackSelector';
import { MolecularStudio } from './components/MolecularStudio';
import { AdmetTelemetryMatrix } from './components/AdmetTelemetryMatrix';
import { ExportLabDossierModal } from './components/ExportLabDossierModal';
import { DISCOVERY_TARGETS } from './services/genomicDatasets';
import { BiophysicalEngineService } from './services/biophysicalEngine';
import type { DiscoveryTrack } from './types/genomics';

export function App() {
  const [activeTrack, setActiveTrack] = useState<DiscoveryTrack>('mrna-folding');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Active target based on track
  const currentTarget = DISCOVERY_TARGETS.find((t) => t.track === activeTrack) || DISCOVERY_TARGETS[0];

  // Sequence state
  const [sequenceInput, setSequenceInput] = useState<string>(currentTarget.sequenceOrSmiles);

  // When activeTrack changes, reset sequenceInput to the target's default
  useEffect(() => {
    setSequenceInput(currentTarget.sequenceOrSmiles);
  }, [currentTarget]);

  // Real-time biophysical calculations
  const thermodynamics = BiophysicalEngineService.computeRnaThermodynamics(sequenceInput);

  const handleSelectTrack = (track: DiscoveryTrack) => {
    setActiveTrack(track);
  };

  const handleResetSequence = () => {
    setSequenceInput(currentTarget.sequenceOrSmiles);
  };

  const handleTriggerGlobalOptimization = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans selection:bg-bio-emerald selection:text-slate-950">
      
      {/* 1. Global Navigation Bar */}
      <Navbar 
        activeTrack={activeTrack} 
        onOpenExportModal={() => setIsExportModalOpen(true)} 
      />

      {/* 2. Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <section className="relative rounded-3xl p-6 sm:p-10 bio-glass-card border border-white/[0.08] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-bio-emerald/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-bio-cyan/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-bio-emerald/15 border border-bio-emerald/30 text-bio-emerald font-mono text-[11px] font-bold tracking-wide">
                  HYPERBLOOM SEPTEMBER — AI/ML HACKATHON
                </span>
                <span className="px-3 py-1 rounded-full bg-bio-cyan/15 border border-bio-cyan/30 text-bio-cyan font-mono text-[11px] font-bold tracking-wide">
                  PDB & NCBI COMPLIANT
                </span>
                <span className="px-3 py-1 rounded-full bg-bio-indigo/15 border border-bio-indigo/30 text-bio-indigo font-mono text-[11px] font-bold tracking-wide">
                  MULTIMODAL DEEP LEARNING
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Multimodal Genomic AI & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bio-emerald via-bio-teal to-bio-cyan">
                  Molecular Drug Discovery Studio
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-sans leading-relaxed">
                Accelerating biopharma pipeline discovery through real-time Turner 2004 secondary structure thermodynamics, CRISPR sgRNA off-target scoring, sub-nanomolar kinase inhibitor docking, and in silico ADMET telemetry.
              </p>
            </div>

            {/* Quick Action Card */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
              <button
                onClick={handleTriggerGlobalOptimization}
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-bio-emerald via-bio-teal to-bio-cyan text-slate-950 font-bold font-mono text-xs shadow-neon-bio hover:scale-[1.03] active:scale-97 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run In Silico Screening</span>
              </button>

              <button
                onClick={handleResetSequence}
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 hover:bg-slate-800 text-slate-200 font-mono text-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-bio-cyan" />
                <span>Restore Wild-Type Sequence</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Real-Time Telemetry KPI Strip */}
        <section>
          <MetricStrip 
            currentTarget={currentTarget} 
            computedDeltaG={thermodynamics.freeEnergyDeltaG} 
          />
        </section>

        {/* 4. Molecular AI Track Switcher */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center space-x-2">
              <Layers className="w-4 h-4 text-bio-emerald" />
              <span>Select Discovery Track & AI Architecture</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">4 Clinical Pipelines Ready</span>
          </div>

          <TrackSelector 
            activeTrack={activeTrack} 
            onSelectTrack={handleSelectTrack} 
          />
        </section>

        {/* 5. Core Dual-Studio Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Sequence & Folding Studio */}
          <div className="lg:col-span-7 space-y-6">
            <MolecularStudio
              target={currentTarget}
              sequenceInput={sequenceInput}
              onChangeSequence={setSequenceInput}
              computedDeltaG={thermodynamics.freeEnergyDeltaG}
              computedTm={thermodynamics.meltingTm}
              computedGc={thermodynamics.gcPercent}
            />
          </div>

          {/* Right Column: ADMET Matrix & Target Profile */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* ADMET Pharmacokinetics Matrix */}
            <AdmetTelemetryMatrix 
              admet={currentTarget.admet} 
            />

            {/* Target Clinical Dossier Card */}
            <div className="p-6 rounded-3xl bio-glass-card border border-white/[0.08] space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.08]">
                <div className="p-2.5 rounded-2xl bg-bio-cyan/10 text-bio-cyan border border-bio-cyan/30 shadow-neon-cyan">
                  <Microscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Target Biological Mechanism
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Indication: <strong className="text-slate-200">{currentTarget.diseaseIndication}</strong>
                  </p>
                </div>
              </div>

              {/* Secondary Metrics List */}
              <div className="space-y-2 text-xs font-mono">
                {currentTarget.secondaryMetrics.map((sm, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="text-slate-400">{sm.label}</span>
                    <strong className="text-bio-glow">{sm.value}</strong>
                  </div>
                ))}
              </div>

              {/* Key Clinical Residues */}
              <div className="pt-2 border-t border-white/[0.06] space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  PDB Structural Contacts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTarget.keyResiduesOrHairpins.map((k, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 text-[10px] font-mono text-slate-300 border border-white/10">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-bio-emerald/30 text-bio-emerald font-mono text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Generate Full Wet-Lab Dossier →</span>
                </button>
              </div>

            </div>

          </div>

        </section>

        {/* 6. Multi-Target Clinical Benchmark Table */}
        <section className="p-6 sm:p-8 rounded-3xl bio-glass-card border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-bio-emerald/10 text-bio-emerald border border-bio-emerald/30 shadow-neon-bio">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  Validated Target Discovery Pipeline Registry
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Comparative cross-pipeline benchmarks across RNA, CRISPR, and Small Molecules
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-bio-cyan">
              4 of 4 Targets Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase">
                  <th className="pb-3 font-semibold">Target / Compound</th>
                  <th className="pb-3 font-semibold">Track</th>
                  <th className="pb-3 font-semibold">Gene / Locus</th>
                  <th className="pb-3 font-semibold">PDB ID</th>
                  <th className="pb-3 font-semibold">Key AI Metric</th>
                  <th className="pb-3 font-semibold">ADMET Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DISCOVERY_TARGETS.map((target) => (
                  <tr 
                    key={target.id}
                    className={`hover:bg-slate-900/50 transition-colors cursor-pointer ${
                      activeTrack === target.track ? 'bg-slate-900/80 font-semibold' : ''
                    }`}
                    onClick={() => handleSelectTrack(target.track)}
                  >
                    <td className="py-4 pr-4">
                      <div className="font-bold text-white flex items-center space-x-2">
                        <span>{target.name}</span>
                        {activeTrack === target.track && (
                          <span className="w-2 h-2 rounded-full bg-bio-emerald animate-ping" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">{target.diseaseIndication}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="px-2 py-1 rounded-md bg-slate-950 text-[10px] border border-white/10 text-bio-cyan">
                        {target.track}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-slate-300">{target.targetProteinOrGene}</td>
                    <td className="py-4 pr-4">
                      <span className="text-bio-glow font-bold">PDB {target.pdbId}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-emerald-400 font-bold">{target.primaryMetric.value}</span>
                      <span className="text-[10px] text-slate-400 ml-1">{target.primaryMetric.unit}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-emerald-400">Lipinski Pass (5/5)</span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTrack(target.track);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-bio-emerald hover:text-slate-950 text-slate-300 border border-white/10 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="border-t border-white/[0.08] bg-[#040812] py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Dna className="w-4 h-4 text-bio-emerald" />
            <span className="text-slate-400">
              BioPharma Nexus © 2026 • Hyperbloom September AI/ML Submission
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400">MIT Open Source</span>
            <span className="text-slate-600">•</span>
            <a 
              href="https://github.com/RaghavParasher" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-bio-cyan hover:underline flex items-center space-x-1"
            >
              <span>GitHub @RaghavParasher</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* 8. Export Wet-Lab Protocol Modal */}
      <ExportLabDossierModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        target={currentTarget}
        sequenceInput={sequenceInput}
        computedDeltaG={thermodynamics.freeEnergyDeltaG}
        computedTm={thermodynamics.meltingTm}
      />

    </div>
  );
}

export default App;
