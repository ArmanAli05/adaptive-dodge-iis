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
 return {spawnInterval:1.32-(level-1)*.17,obstacleSpeed:140+(level-1)*45};
}