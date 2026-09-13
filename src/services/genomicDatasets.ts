import type { TargetProfile } from '../types/genomics';

export const DISCOVERY_TARGETS: TargetProfile[] = [
  {
    id: 'target-mrna',
    track: 'mrna-folding',
    name: 'Spike-RBD mRNA Thermostable Vaccine Candidate',
    targetProteinOrGene: 'SARS-CoV-2 / Pan-Sarbecovirus RBD',
    diseaseIndication: 'Viral Infectious Disease Prophylaxis',
    sequenceOrSmiles: 'AUGUUUGUGUUUCUUGUGCUGCUGCCUCUGGUUUCCAGCCAGUGUGUGAACCUGACCACCAGGACACAGCUGCCUCCAGCGUACACCAACAGCUUUACCAGGGGUGUCUACUAUCCCGACAAG',
    pdbId: '7KRR',
    primaryMetric: {
      label: 'Minimum Free Energy (MFE)',
      value: '-48.6',
      unit: 'kcal/mol',
    },
    secondaryMetrics: [
      { label: 'Thermodynamic Tm', value: '78.4 °C' },
      { label: 'GC Content', value: '54.8%' },
      { label: 'Hairpin Loop Stability', value: 'Optimal (Pseudoknot-free)' },
      { label: 'In Vivo Translation Rate', value: 'High (Codon Optimized)' }
    ],
    biologicalDescription: 'Computationally optimized mRNA sequence encoding receptor-binding domain with stabilized stem-loop secondary structures to resist cellular exonuclease cleavage and maximize translation yield.',
    keyResiduesOrHairpins: ['Stem-Loop 1 (nt 14-38)', 'Hairpin 2 (nt 52-78)', 'Terminal Poly(A) Anchor', 'Cap-1 Analog Binding Motif'],
    admet: {
      molecularWeight: 42150,
      logP: -2.8,
      hBondDonors: 140,
      hBondAcceptors: 260,
      lipinskiPass: true,
      cypInhibition: 'LOW',
      hergCardiotoxRisk: 'LOW',
      oralBioavailabilityPct: 0.0, // Parenteral LNP delivery
    }
  },
  {
    id: 'target-crispr',
    track: 'crispr-cas9',
    name: 'BCL11A Erythroid Enhancer sgRNA Cleavage Target',
    targetProteinOrGene: 'BCL11A (+58 Enhancer Locus)',
    diseaseIndication: 'Sickle Cell Disease & Beta-Thalassemia',
    sequenceOrSmiles: 'GCUUGACCAAGACUCUACCA-NGG(AGG)',
    pdbId: '5F9R',
    primaryMetric: {
      label: 'On-Target Cleavage Score',
      value: '96.8',
      unit: '% Efficiency',
    },
    secondaryMetrics: [
      { label: 'Genome-Wide Off-Targets', value: '0 (High Fidelity)' },
      { label: 'PAM Sequence', value: '5\'-AGG-3\' (SpCas9 Validated)' },
      { label: 'Seed Region Mismatch Tol.', value: '< 1 nt (Extreme Precision)' },
      { label: 'Indel Inducement Rate', value: '88.2% Frameshift Disruption' }
    ],
    biologicalDescription: 'High-fidelity synthetic guide RNA engineered to direct Cas9 endonuclease to the +58 erythroid-specific BCL11A enhancer, reactivating fetal hemoglobin (HbF) synthesis without disrupting non-erythroid hematopoiesis.',
    keyResiduesOrHairpins: ['Seed Region (nt 11-20)', 'TracrRNA Scaffold Interaction', 'Bridge Helix Pocket', 'R-Loop Hybridization Core'],
    admet: {
      molecularWeight: 31800,
      logP: -4.1,
      hBondDonors: 95,
      hBondAcceptors: 180,
      lipinskiPass: true,
      cypInhibition: 'LOW',
      hergCardiotoxRisk: 'LOW',
      oralBioavailabilityPct: 0.0,
    }
  },
  {
    id: 'target-docking',
    track: 'small-molecule',
    name: 'Osimertinib-BioAnalog Kinase Inhibitor',
    targetProteinOrGene: 'EGFR Kinase Domain (T790M/L858R)',
    diseaseIndication: 'Non-Small Cell Lung Cancer (NSCLC)',
    sequenceOrSmiles: 'COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)NC(=O)C=C)N(C)CCN(C)C)OC',
    pdbId: '4I22',
    primaryMetric: {
      label: 'Binding Affinity (pKd)',
      value: '9.82',
      unit: '(-13.4 kcal/mol)',
    },
    secondaryMetrics: [
      { label: 'Predicted IC50', value: '1.2 nM' },
      { label: 'Covalent Warhead', value: 'Acrylamide (Cys797 Target)' },
      { label: 'Selectivity vs WT-EGFR', value: '184x Mutant Preference' },
      { label: 'CNS Brain Penetrance', value: 'High (BBB Permeable)' }
    ],
    biologicalDescription: '3rd-generation mutant-selective covalent EGFR tyrosine kinase inhibitor designed to overcome T790M resistance mutations with sub-nanomolar potency and minimal wild-type cutaneous toxicity.',
    keyResiduesOrHairpins: ['Cys797 (Covalent C-S Bond)', 'Met790 (Gatekeeper Contact)', 'Thr854 (Hydrogen Bond Donor)', 'Leu718 (Hydrophobic Pocket)'],
    admet: {
      molecularWeight: 499.6,
      logP: 3.2,
      hBondDonors: 2,
      hBondAcceptors: 7,
      lipinskiPass: true,
      cypInhibition: 'LOW',
      hergCardiotoxRisk: 'LOW',
      oralBioavailabilityPct: 82.4,
    }
  },
  {
    id: 'target-mutation',
    track: 'oncology-mutation',
    name: 'KRAS-G12D Oncogenic Switch Perturbation',
    targetProteinOrGene: 'KRAS Proto-Oncogene GTPase',
    diseaseIndication: 'Pancreatic & Colorectal Adenocarcinoma',
    sequenceOrSmiles: 'MTEYKLVVVGAGDVGKSALTIQLIQNHFVDEYDPTIEDSYRKQVVIDGETCLLDILDTAGQEEYSAMRDQYMRTGEGFLCVFAINNTKSFEDIHHYREQIKRVKDSEDVPMVLVGNKCDLPSRTVDTKQAQDLARSYGIPFIETSAKTRQRVEDAFYTLVREIRQYRLKKISKEEKTPGCVKIKKCIIM',
    pdbId: '6XHA',
    primaryMetric: {
      label: 'Pathogenicity Risk Score',
      value: '0.985',
      unit: '(ACMG: Pathogenic)',
    },
    secondaryMetrics: [
      { label: 'GTP Hydrolysis Impairment', value: '-94% (Constitutively Active)' },
      { label: 'Switch-I/II Pocket RMSD', value: '+2.4 Å Structural Shift' },
      { label: 'Evolutionary Conservation', value: '100% Invariant in Mammals' },
      { label: 'Druggable Asp12 Pocket', value: 'Present (Targetable by PROTACs)' }
    ],
    biologicalDescription: 'Single amino acid substitution of glycine with aspartic acid at codon 12, locking the KRAS molecular switch in an active GTP-bound state driving unconstrained oncogenic cell proliferation.',
    keyResiduesOrHairpins: ['Asp12 (Mutant Residue)', 'Gln61 (Catalytic Core)', 'Switch-I (Residues 30-38)', 'Switch-II (Residues 60-76)'],
    admet: {
      molecularWeight: 21600,
      logP: 1.1,
      hBondDonors: 42,
      hBondAcceptors: 78,
      lipinskiPass: true,
      cypInhibition: 'LOW',
      hergCardiotoxRisk: 'LOW',
      oralBioavailabilityPct: 0.0,
    }
  }
];
