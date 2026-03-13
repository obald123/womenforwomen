type FigmaPrototypeProps = {
  nodeId?: string;
};

const FIGMA_BASE = "https://embed.figma.com/proto/iirTPY0FFMmNJPH416yliy/Women-for-women";
const DEFAULT_NODE_ID = "25:492";

function getFigmaUrl(nodeId: string) {
  const params = new URLSearchParams({
    "page-id": "0:1",
    "node-id": nodeId,
    p: "f",
    viewport: "-1346,162,0.21",
    t: "OI2PVOSuEfQIJ1Nb-1",
    scaling: "scale-down-width",
    "content-scaling": "fixed",
  });

  return `${FIGMA_BASE}?${params.toString()}`;
}

export function FigmaPrototype({ nodeId = DEFAULT_NODE_ID }: FigmaPrototypeProps) {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={getFigmaUrl(nodeId)}
        title="Women for Women"
        className="h-full w-full border-0"
        allowFullScreen
      />
    </main>
  );
}
