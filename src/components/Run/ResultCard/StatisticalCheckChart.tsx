import React from "react";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory";

type Props = {
  mean: any[];
};

export default function StatisticalCheckChart({ mean }: Props) {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" }
        }}
        data={mean}
      />
    </VictoryChart>
  );
}
