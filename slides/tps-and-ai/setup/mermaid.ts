/**
 * In-slide mermaid voice for this deck: the same three anchors as
 * generated sumi-e art, translated for crisp type (see artwork-list.md
 * and the triad SVG). Mermaid renders in a shadow root, so theme CSS
 * cannot reach it — themeVariables + themeCSS here are the seam.
 *
 * Paper #ece6dc, ink nodes #292524 / #fffaf3, stone strokes #78716c,
 * vermilion #b33a2b for polarity / verb labels.
 */
export default () => ({
  theme: 'base' as const,
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  themeVariables: {
    darkMode: false,
    background: '#ece6dc',
    primaryColor: '#292524',
    primaryTextColor: '#fffaf3',
    primaryBorderColor: '#292524',
    secondaryColor: '#ece6dc',
    tertiaryColor: '#ece6dc',
    lineColor: '#78716c',
    textColor: '#b33a2b',
    mainBkg: '#292524',
    nodeBorder: '#292524',
    nodeTextColor: '#fffaf3',
    defaultLinkColor: '#78716c',
    edgeLabelBackground: '#ece6dc',
    clusterBkg: '#ece6dc',
    clusterBorder: '#78716c',
    titleColor: '#292524',
  },
  themeCSS: `
    .node .label-container,
    .node rect,
    .node polygon {
      stroke-width: 0;
    }
    .edgePath .path,
    .flowchart-link {
      stroke-width: 2.5px;
      stroke-linecap: round;
    }
    .arrowheadPath,
    .marker {
      fill: #78716c;
      stroke: #78716c;
    }
    .edgeLabel,
    .edgeLabel p {
      background-color: #ece6dc !important;
      color: #b33a2b !important;
      font-weight: 700;
    }
    .labelBkg,
    .edgeLabel rect {
      fill: #ece6dc !important;
      background-color: #ece6dc !important;
      opacity: 1;
    }
    .node.accent .label-container,
    .node.accent rect {
      fill: #b33a2b !important;
      stroke: #b33a2b !important;
    }
  `,
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    padding: 8,
  },
})
