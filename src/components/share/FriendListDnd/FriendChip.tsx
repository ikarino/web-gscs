import React from "react";

import Chip from "@material-ui/core/Chip";

import { SCSFriendInput } from "../../../scs";

type Props = {
  f: SCSFriendInput;
};

export default function FriendChip({ f }: Props) {
  return (
    <>
      {f.doubleSpeed !== undefined && f.doubleSpeed ? (
        <Chip size="small" label={`倍`} />
      ) : null}
      {f.weakenAtk !== undefined && f.weakenAtk > 0 ? (
        <Chip size="small" label={`水+${f.weakenAtk}`} />
      ) : null}
      {f.weakenDef !== undefined && f.weakenDef > 0 ? (
        <Chip size="small" label={`ル+${f.weakenDef}`} />
      ) : null}
      {f.hpDope !== undefined && f.hpDope !== 0 ? (
        <Chip size="small" label={`HP+${f.hpDope}`} />
      ) : null}
      {f.atkDope !== undefined && f.atkDope !== 0 ? (
        <Chip size="small" label={`力+${f.atkDope}`} />
      ) : null}
      {f.isSealed !== undefined && f.isSealed ? (
        <Chip size="small" label={`封`} />
      ) : null}
      {f.isSticked !== undefined && !f.isSticked ? (
        <Chip size="small" label={`動`} />
      ) : null}
    </>
  );
}
