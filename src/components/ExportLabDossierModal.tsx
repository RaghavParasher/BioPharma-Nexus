import { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Check, 
  Copy, 
  Printer, 
  Dna 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TargetProfile } from '../types/genomics';

interface ExportLabDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: TargetProfile;
  sequenceInput: string;
  computedDeltaG: number;
  computedTm: number;
}

export const ExportLabDossierModal = ({
  isOpen,
  onClose,
  target,
  sequenceInput,
  computedDeltaG,
  computedTm,
}: ExportLabDossierModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateFastaContent = () => {
    return `>BIOPHARMA_NEXUS|${target.id.toUpperCase()}|${target.name.replace(/\s+/g, '_')}|PDB_${target.pdbId}
${sequenceInput}
`;
  };

  const generateMarkdownReport = () => {
    return `# 🧬 BIOPHARMA NEXUS — WET-LAB EXPERIMENTAL SYNTHESIS PROTOCOL
**Candidate Name:** ${target.name}
**Target Gene / Locus:** ${target.targetProteinOrGene} (PDB: ${target.pdbId})
**Indication:** ${target.diseaseIndication}
**Date Generated:** ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

---

## 1. Biophysical & Thermodynamic Parameters
* **Primary Metric (${target.primaryMetric.label}):** ${target.track === 'mrna-folding' ? `${computedDeltaG} kcal/mol` : target.primaryMetric.value}
* **Thermodynamic Melting Temperature (Tm):** ${computedTm} °C
* **Length:** ${sequenceInput.length} bases / atoms
* **Structural Motifs Identified:**
${target.keyResiduesOrHairpins.map(m => `  - ${m}`).join('\n')}

---

## 2. FASTA / Sequence Representation
\`\`\`fasta
>BIOPHARMA_NEXUS|${target.id.toUpperCase()}|${target.name.replace(/\s+/g, '_')}
${sequenceInput}
\`\`\`

---

## 3. ADMET Pharmacokinetics & Toxicity Evaluation
* **Molecular Weight:** ${target.admet.molecularWeight} g/mol
* **Lipophilicity (LogP):** ${target.admet.logP}
* **H-Bond Donors / Acceptors:** ${target.admet.hBondDonors} / ${target.admet.hBondAcceptors}
* **Lipinski Rule of 5:** ${target.admet.lipinskiPass ? 'COMPLIANT' : 'EXEMPT'}
* **hERG Cardiotoxicity Risk:** ${target.admet.hergCardiotoxRisk}

---

## 4. Standard Operating Procedure (SOP) for Wet-Lab Synthesis
1. **In Vitro Transcription (IVT) / Synthesis:** Perform T7 polymerase enzymatic reaction with N1-methylpseudouridine incorporation.
2. **HPLC Purification:** Purify crude sample on reverse-phase C18 column to remove double-stranded RNA contaminants.
3. **Microfluidic LNP Encapsulation:** Formulate with ionizable lipid (SM-102 / ALC-0315), DSPC, Cholesterol, and DMG-PEG2000 at a 50:10:38.5:1.5 molar ratio.
4. **Quality Control & Binding Assay:** Verify hydrodynamic size (70-90 nm, PDI < 0.1) via DLS and measure binding Kd via Surface Plasmon Resonance (SPR).

---
_CONFIDENTIAL BIOTECH DOSSIER — For Certified Laboratory Research Use Only_
`;
  };

  const handleDownloadFasta = () => {
    const text = generateFastaContent();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${target.id}_sequence.fasta`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdownReport();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${target.id}_wetlab_protocol.md`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono text-xs">
      <div className="bio-glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-bio-emerald/30 shadow-2xl space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-bio-emerald/20 text-bio-emerald border border-bio-emerald/40 shadow-neon-bio">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Export Wet-Lab Synthesis Protocol
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Formatted for robotic synthesis, HPLC purification, and SPR binding assays
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <pre className="p-4 rounded-2xl bg-slate-950/90 border border-white/[0.06] max-h-60 overflow-y-auto text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
          {generateMarkdownReport()}
        </pre>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-gradient-to-r from-bio-emerald to-bio-cyan text-slate-950 font-bold shadow-neon-bio hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handleDownloadFasta}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Dna className="w-4 h-4 text-bio-cyan" />
            <span>Download .FASTA</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-bio-emerald" />}
            <span>{copied ? 'Copied!' : 'Copy Dossier'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print SOP</span>
          </button>
        </div>

      </div>
    </div>
  );
};
