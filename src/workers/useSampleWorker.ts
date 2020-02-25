// eslint-disable-next-line import/no-webpack-loader-syntax
import createWorker from "workerize-loader!./sampleWorker.worker";
import * as SampleWorker from "./sampleWorker.worker";

const sampleWorker = createWorker<typeof SampleWorker>();

export const useSampleWorker = () => sampleWorker;
