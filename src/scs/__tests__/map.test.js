import { Map } from "../Map";
import { sample_inputs } from "../sample_inputs";


const isSameSet = (a1, a2) => JSON.stringify(a1.sort()) == JSON.stringify(a2.sort());


describe('findTargets', () => {
  const { map } = sample_inputs["4キラーマ倍速"];
  const m = new Map(map);
  m.show();
  test('friend0', () => 
       expect(
         isSameSet(
           m.findTargets([3, 2]), [20, 21]
       )).toBeTruthy()
  );
  
  test('friend1', () => 
       expect(
         isSameSet(
           m.findTargets([3, 3]), [20, 21, 22]
       )).toBeTruthy()
  );
  test('enemy0', () => 
       expect(
         isSameSet(
           m.findTargets([4, 2]), [10, 11]
       )).toBeTruthy()
  );
  test('enemy0 find empty', () => 
       expect(
         isSameSet(
           m.findTargets([4, 2], true), [[5, 2], [5, 3]]
       )).toBeTruthy()
  );
  test('enemy1 find empty', () => 
       expect(
         isSameSet(
           m.findTargets([4, 3], true), [[5, 2], [5, 3], [5, 4]]
       )).toBeTruthy()
  );
});
