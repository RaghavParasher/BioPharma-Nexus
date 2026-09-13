export type DiscoveryTrack = 'mrna-folding' | 'crispr-cas9' | 'small-molecule' | 'oncology-mutation';

export interface AdmetProfile {
  molecularWeight: number; // g/mol (<500)
  logP: number; // Octanol-water partition (<5)
  hBondDonors: number; // (<5)
  hBondAcceptors: number; // (<10)
  lipinskiPass: boolean;
  cypInhibition: 'LOW' | 'MODERATE' | 'HIGH';
  hergCardiotoxRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  oralBioavailabilityPct: number;
}

export interface TargetProfile {
  id: string;
  track: DiscoveryTrack;
  name: string;
  targetProteinOrGene: string;
  diseaseIndication: string;
  sequenceOrSmiles: string;
  pdbId: string;
  primaryMetric: {
    label: string;
    value: string;
    unit: string;
  };
  secondaryMetrics: {
    label: string;
    value: string;
  }[];
  biologicalDescription: string;
  keyResiduesOrHairpins: string[];
  admet: AdmetProfile;
}
