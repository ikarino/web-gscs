import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

type Props = {
  success: number;
  killed: number;
  genocided: number;
};

export default function FinishStatePie({ success, killed, genocided }: Props) {
  const sum = success + killed + genocided;
  const successRate = sum === 0 ? 0 : (100 * success) / sum;

  let data: { x: string; y: number }[] = [];
  let colorScale: string[] = [];
  if (sum === 0) {
    data = [{ x: "no data", y: 100 }];
    colorScale.push("lightgray");
  } else {
    if (success) {
      data.push({ x: "success", y: success });
      colorScale.push("lime");
    }
    if (killed) {
      data.push({ x: "killed", y: killed });
      colorScale.push("red");
    }
    if (genocided) {
      data.push({ x: "genocided", y: genocided });
      colorScale.push("gray");
    }
  }

  return (
    <svg viewBox="0 0 400 400">
      <VictoryPie
        colorScale={colorScale}
        standalone={false}
        width={400}
        height={400}
        data={data}
        innerRadius={68}
        labelRadius={100}
        style={{ labels: { fontSize: 40, fill: "black" } }}
        animate={{ duration: 500 }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 40 }}
        x={200}
        y={200}
        text={`${successRate.toFixed(1)}%`}
      />
    </svg>
  );
}
