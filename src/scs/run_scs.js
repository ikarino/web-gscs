import { Manager } from "./manager";

export default function run_scs(inp) {
  const pconf = {
    p_attack: 0.92,
    p_divide: 0.25,
    p_hoimi: 0.3553, // kompota君の成果
    p_hoimi_attack: 0.3,
    p_kinoko: 0.1,
  };
  
  let m = new Manager(inp, pconf);
  m.trial();
  return m.toJson();
};
