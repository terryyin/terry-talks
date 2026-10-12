import React from 'react';
import {createHash, webcrypto} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

let selectedFrame=0;
export const setFrame=(frame:number)=>{selectedFrame=frame;};

// Required lazily by each hoisted Jest factory; the component and compiler stay real.
export const mockRemotion=()=>({
 ...jest.requireActual('remotion'),
 useCurrentFrame:()=>selectedFrame,
 useVideoConfig:()=>({fps:30,width:1080,height:1080}),
 Sequence:({children,from,durationInFrames}:{children:React.ReactNode;from:number;durationInFrames:number})=><div data-audio-from={from} data-audio-duration={durationInFrames}>{children}</div>,
 Audio:({src}:{src:string})=><div data-audio-source={src}/>,
});

export const loadSavedTake=async(file:string)=>new Uint8Array(readFileSync(join(__dirname,'../../public',file))).buffer;
export const digestTake=async(bytes:ArrayBuffer)=>createHash('sha256').update(new Uint8Array(bytes)).digest('hex');

export const withSavedTakeFetch=async(observe:(requested:string[])=>Promise<void>)=>{
 const oldFetch=globalThis.fetch;
 const oldSubtle=Object.getOwnPropertyDescriptor(globalThis.crypto,'subtle');
 const requested:string[]=[];
 Object.defineProperty(globalThis.crypto,'subtle',{configurable:true,value:webcrypto.subtle});
 globalThis.fetch=jest.fn(async(input)=>{
  const file=String(input).replace(/^.*(?=assets\/illustrated-conversation\/)/,'');
  requested.push(file);
  return {ok:true,arrayBuffer:()=>loadSavedTake(file)};
 }) as unknown as typeof fetch;
 try {
  await observe(requested);
 } finally {
  globalThis.fetch=oldFetch;
  if(oldSubtle) Object.defineProperty(globalThis.crypto,'subtle',oldSubtle);
  else Reflect.deleteProperty(globalThis.crypto,'subtle');
 }
};
