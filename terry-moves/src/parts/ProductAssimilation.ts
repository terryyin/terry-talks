const smooth = (value: number) => value * value * (3 - 2 * value);
const mix = (a: number, b: number, amount: number) => a + (b - a) * amount;
export type Point = {x: number; y: number};
export const edges = [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[0,3],[3,6],[1,4],[4,7],[2,5],[5,8],[1,5]];
export const pathThrough = (points: Point[]) => points.map((point, index) => index === 0 ? `M ${point.x} ${point.y}` : `Q ${points[index - 1].x + 38} ${point.y - 28} ${point.x} ${point.y}`).join(' ');


export const assimilateProduct = (original: Point[], disturbance: number, reconcile: number, reshape: number) => {
const shifted: Point[] = original.map((point, index) => index % 3 === 0 ? point : {
  x: point.x + [0, 24, -26][index % 3],
  y: point.y + (index === 4 ? -28 : index === 5 ? 16 : 0),
});
  const strain = smooth(Math.min(1, disturbance * 2.3)) * (1 - reshape);
  const nodes = original.map((point, index) => {
    if (index % 3 === 0) return point;
    const vibration = Math.sin(disturbance * Math.PI * 5 + index) * 5 * Math.sin(disturbance * Math.PI);
    return {
      x: mix(point.x, shifted[index].x, reshape) + strain * (index % 2 ? 28 : -22) + vibration,
      y: mix(point.y, shifted[index].y, reshape) + strain * (index % 2 ? -23 : 26),
    };
  });
  const behaviorNodes = nodes.map((point, index) => ({x: point.x, y: mix(point.y, shifted[index].y, reconcile * (1 - reshape))}));
  const behaviorRoutes = [[0,1,5,8], [3,4,2], [6,7,5]];
  const alternativeAnchors = [
    {x: nodes[4].x + 52, y: nodes[4].y - 42},
    {x: nodes[5].x - 35, y: nodes[5].y + 40},
  ];
  return {nodes, behaviorNodes, behaviorRoutes, alternativeAnchors};
};
