import { SCSInput, SCSSummarizedOutput, SCSTrialOutput } from "../scs";

export type WebGscsExtra = {
  comment: string;
  createdAt: { seconds: number; nanoseconds: number };
  userName: string;
  userId: string;
  allDoubleSpeed: boolean;
  allSingleSpeed: boolean;
  creatableWithExplosion: boolean;
  lvKinoko: number;
  lvKiton: number;
  numHoimiSlime: number;
  numKillerMachine: number;
  withKinoko: boolean;
  withKiton: boolean;
};

export type WebGscsRecord = {
  scsInput: SCSInput;
  scsOutput: SCSSummarizedOutput;
  webGscsExtra: WebGscsExtra;
};

export type SliceSCSInput = {
  templateName: string;
  inp: SCSInput;
  activePlace: { row: number; col: number };
};

export type SliceRunScs = {
  record: WebGscsRecord;
  progress: number;
  isRunning: boolean;
  outputs: SCSTrialOutput[];
};
