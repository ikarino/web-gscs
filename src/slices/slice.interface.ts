import { SCSInput, SCSSummarizedOutput, SCSTrialOutput } from "../scs";

export type WebGscsExtra = {
  comment: string;
  createdAt: number;
  userName: string;
  userId: string;
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
