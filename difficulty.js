/** Deterministic adaptive difficulty: 10-second windows, 1–5 difficulty. */
export function evaluateWindow({level,collisions,cleanWindows=0,adaptive=true}){
 if(!Number.isInteger(level)||level<1||level>5)throw new RangeError('level must be 1..5');
 if(!Number.isInteger(collisions)||collisions<0)throw new RangeError('invalid collisions');
 if(!Number.isInteger(cleanWindows)||cleanWindows<0)throw new RangeError('invalid streak');
 if(!adaptive)return {level,cleanWindows:0,changed:false,reason:'Automatic adaptation off: difficulty unchanged.'};
 if(collisions>=2){const next=Math.max(1,level-1);return {level:next,cleanWindows:0,changed:next!==level,reason:next<level?`${collisions} collisions in this window; difficulty reduced to ${next}.`:'Already at minimum difficulty (1).'};}
 if(collisions===0){const streak=cleanWindows+1;if(streak>=2){const next=Math.min(5,level+1);return {level:next,cleanWindows:0,changed:next!==level,reason:next>level?`Two clean windows; increased difficulty to ${next}.`:'Already at maximum difficulty (5).'};}return {level,cleanWindows:streak,changed:false,reason:'One clean window; waiting for a second.'};}
 return {level,cleanWindows:0,changed:false,reason:'One collision; unchanged difficulty and reset clean streak.'};
}
export function gameParameters(level){
 if(!Number.isInteger(level)||level<1||level>5)throw new RangeError('level must be 1..5');
 // Each step changes both density and travel speed, informed by first play-test feedback.
 const profiles=[
  {spawnInterval:1.60,obstacleSpeed:155,blocksPerWave:1},
  {spawnInterval:1.20,obstacleSpeed:215,blocksPerWave:2},
  {spawnInterval:0.95,obstacleSpeed:275,blocksPerWave:3},
  {spawnInterval:0.77,obstacleSpeed:335,blocksPerWave:4},
  {spawnInterval:0.62,obstacleSpeed:400,blocksPerWave:4}
 ];
 return {...profiles[level-1]};
}
/** Pick distinct lanes so one wave cannot create an unavoidable full-width wall. */
export function waveLanes(level,random=Math.random){
 const {blocksPerWave}=gameParameters(level);
 const lanes=Array.from({length:9},(_,i)=>i);
 for(let i=lanes.length-1;i>0;i--){
  const j=Math.min(i,Math.max(0,Math.floor(random()*(i+1))));
  [lanes[i],lanes[j]]=[lanes[j],lanes[i]];
 }
 return lanes.slice(0,blocksPerWave);
}
