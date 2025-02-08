import { WidthProvider, Responsive } from "react-grid-layout";

export const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Layout constants
export const MENU_HEIGHT = 46;
export const FOOTER_HEIGHT = 36;
export const SPACING = 8;

export const layouts = {
  lg: [
    { i: "summary", x: 0, y: 0, w: 3, h: 8.8, static: true },
    { i: "graph", x: 3, y: 0, w: 6.5, h: 8.8, static: true },
    { i: "about", x: 9.5, y: 0, w: 2.5, h: 8.8, static: true }
  ],
  md: [
    { i: "summary", x: 0, y: 0, w: 3, h: 8.8, static: true },
    { i: "graph", x: 3, y: 0, w: 6, h: 8.8, static: true },
    { i: "about", x: 0, y: 10, w: 9, h: 8.8, static: true }
  ],
  sm: [
    { i: "summary", x: 0, y: 0, w: 6, h: 8.8, static: true },
    { i: "graph", x: 0, y: 10, w: 6, h: 8.8, static: true },
    { i: "about", x: 0, y: 20, w: 6, h: 8.8, static: true }
  ],
  xs: [
    { i: "summary", x: 0, y: 0, w: 4, h: 8.8, static: true },
    { i: "graph", x: 0, y: 10, w: 4, h: 8.8, static: true },
    { i: "about", x: 0, y: 20, w: 4, h: 8.8, static: true }
  ],
  xxs: [
    { i: "summary", x: 0, y: 0, w: 2, h: 8.8, static: true },
    { i: "graph", x: 0, y: 10, w: 2, h: 8.8, static: true },
    { i: "about", x: 0, y: 20, w: 2, h: 8.8, static: true }
  ]
};

export const gridProps = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100,
  margin: [4, 4],
  containerPadding: [4, 4],
  isDraggable: false,
  isResizable: false
};