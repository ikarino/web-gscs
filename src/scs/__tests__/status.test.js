import { getStatus, getExpByLv, getLvByDexp } from "../status";
import { TestScheduler } from "jest";

describe('getStatus', () => {
     test('キラーマシンlv13', () => {
        const km = getStatus('キラーマシン', 13);
        expect(km.mhp0).toBe(100);
        expect(km.atk0).toBe(37);
        expect(km.def0).toBe(60);
    })
});