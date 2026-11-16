import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateWindow,gameParameters,waveLanes} from '../difficulty.js';
test('2 collisions reduce level',()=>assert.equal(evaluateWindow({level:3,collisions:2}).level,2));
test('single clean window does not raise level',()=>assert.equal(evaluateWindow({level:2,collisions:0}).level,2));
test('2 clean windows raise level',()=>assert.equal(evaluateWindow({level:2,collisions:0,cleanWindows:1}).level,3));
test('single collision clears streak',()=>assert.equal(evaluateWindow({level:3,collisions:1,cleanWindows:1}).cleanWindows,0));
test('fixed difficulty ignores performance',()=>assert.equal(evaluateWindow({level:4,collisions:5,adaptive:false}).level,4));
test('level boundaries maintained',()=>{assert.equal(evaluateWindow({level:1,collisions:3}).level,1);assert.equal(evaluateWindow({level:5,collisions:0,cleanWindows:1}).level,5)});
test('high levels are faster and more frequent',()=>{assert.ok(gameParameters(5).spawnInterval<gameParameters(1).spawnInterval);assert.ok(gameParameters(5).obstacleSpeed>gameParameters(1).obstacleSpeed)});
test('invalid level rejected',()=>assert.throws(()=>gameParameters(0),RangeError));

test('every level has higher obstacle speed and more frequent waves',()=>{
 for(let level=1;level<5;level++){
  assert.ok(gameParameters(level+1).obstacleSpeed>gameParameters(level).obstacleSpeed);
  assert.ok(gameParameters(level+1).spawnInterval<gameParameters(level).spawnInterval);
 }
});
test('obstacle density scales from one to four per wave',()=>{
 assert.deepEqual([1,2,3,4,5].map(l=>gameParameters(l).blocksPerWave),[1,2,3,4,4]);
});
test('one wave uses distinct lanes and leaves safe lanes',()=>{
 for(let level=1;level<=5;level++){
  const lanes=waveLanes(level,()=>0);
  assert.equal(lanes.length,gameParameters(level).blocksPerWave);
  assert.equal(new Set(lanes).size,lanes.length);
  assert.ok(lanes.every(n=>n>=0&&n<9));
  assert.ok(9-lanes.length>=5);
 }
});
