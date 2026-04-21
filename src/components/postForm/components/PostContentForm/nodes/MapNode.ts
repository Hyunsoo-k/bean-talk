import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { MapNodeViewer } from "../nodeViewers/MapNodeViewer";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    map: {
      setMap: (options: { lat: number; lng: number; address: string }) => ReturnType;
    }
  }
}

const MapNode = Node.create({
  name: "map",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      lat: { default: 37.5665 },
      lng: { default: 126.9780 },
      address: { default: "" }
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="map"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div", 
      mergeAttributes(HTMLAttributes, { "data-type": "map" }),
      [
        "div", { id: "map-wrapper" },
        ["div", { id: "map" }],
        [
          "div", { id: "map-information" },
          ["span", { id: "address" }, HTMLAttributes.address || ""]
        ]
      ]
    ];
  },
  addCommands() {
    return {
      setMap: (options) => ({ chain }) => {
        return chain()
          .insertContent({
            type: this.name,
            attrs: options,
          })
          .run();
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(MapNodeViewer);
  },
});

export { MapNode };