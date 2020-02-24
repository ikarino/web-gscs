import { SCSInput, SCSSummarizedOutput } from "torneko3js";

type WebGscsRecord = {
  scsInput: SCSInput;
  scsOutput: SCSSummarizedOutput;
  webGscsExtra: {
    comment: string;
    // createdAt:  TODO
    // userName: TODO
    // userId: TODO
    allDoubleSpeed: boolean;
    allSingleSpeed: boolean;
    creatable_with_explosion: boolean;
    lvKinoko: number;
    lvKiton: number;
    numHoimiSlime: number;
    numKillerMachine: number;
    withKinoko: boolean;
    withKiton: boolean;
  };
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
};
