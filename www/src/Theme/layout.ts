import { BreakpointValues } from "@material-ui/core/styles/createBreakpoints";
import _kebabCase from "lodash/kebabCase";

import { spacingFn } from "./spacing";

export const BREAKPOINTS = {
  xs: {
    numCards: 1,
    gridNumColumns: 4,
    gridMargin: 8,
    gridGutter: 16,
    gridColMinWidth: 64,
    gridColMaxWidth: 110,
    gridMinWidth: 0, // 320
    gridMaxWidth: 0, // 504
  },
  sm: {
    numCards: 2,
    gridNumColumns: 8,
    gridMargin: 8,
    gridGutter: 16,
    gridColMinWidth: 64,
    gridColMaxWidth: 110,
    gridMinWidth: 0, // 640
    gridMaxWidth: 0, // 1008
  },
  md: {
    numCards: 3,
    gridNumColumns: 12,
    gridMargin: 16,
    gridGutter: 32,
    gridColMinWidth: 64,
    gridColMaxWidth: 80,
    gridMinWidth: 0, // 1152
    gridMaxWidth: 0, // 1344
  },
  lg: {
    numCards: 4,
    gridNumColumns: 12,
    gridMargin: 16,
    gridGutter: 32,
    gridColMinWidth: 80,
    gridColMaxWidth: 92,
    gridMinWidth: 0, // 1344
    gridMaxWidth: 0, // 1488
  },
  xl: {
    numCards: 4,
    gridNumColumns: 12,
    gridMargin: 16,
    gridGutter: 32,
    gridColMinWidth: 80,
    gridColMaxWidth: 92,
    gridMinWidth: 0, // 1680
    gridMaxWidth: 0, // 1824
  },
};

// Calculate min and max widths from breakpoint settings
for (const [
  key,
  { gridColMinWidth, gridColMaxWidth, gridNumColumns, gridGutter, gridMargin },
] of Object.entries(BREAKPOINTS)) {
  BREAKPOINTS[key as keyof typeof BREAKPOINTS].gridMinWidth =
    gridColMinWidth * gridNumColumns +
    gridGutter * (gridNumColumns - 1) +
    gridMargin * 2;

  BREAKPOINTS[key as keyof typeof BREAKPOINTS].gridMaxWidth =
    gridColMaxWidth * gridNumColumns +
    gridGutter * (gridNumColumns - 1) +
    gridMargin * 2;
}

// xl breakpoint is just lg breakpoint, including sidebar width + margin
export const SIDEBAR_WIDTH = 304;
export const SIDEBAR_MARGIN = spacingFn("m") as number;
BREAKPOINTS.xl.gridMinWidth += SIDEBAR_WIDTH + SIDEBAR_MARGIN;
BREAKPOINTS.xl.gridMaxWidth += SIDEBAR_WIDTH + SIDEBAR_MARGIN;

export default BREAKPOINTS;

// Export just min widths for Material UI theme
export const BREAKPOINT_VALUES = Object.entries(BREAKPOINTS).reduce(
  (a, [key, { gridMinWidth }]) => ({ ...a, [key]: gridMinWidth }),
  {}
) as BreakpointValues;

// Max width of main grid content, excluding sidebar + margin
export const CONTENT_MAX_WIDTH = BREAKPOINTS.lg.gridMaxWidth;

// CSS vars included in MUI CssBaseline
export const LAYOUT_CSS_VARS: Record<string, any> = Object.values(
  BREAKPOINTS
).reduce(
  (a, vars) => ({
    ...a,
    [`@media (min-width: ${vars.gridMinWidth}px)`]: Object.entries(vars).reduce(
      (a, [name, value]) => ({
        ...a,
        ["--" + _kebabCase(name)]:
          // Add px suffix if CSS var is not a number
          `${value}${name.toLowerCase().indexOf("num") === -1 ? "px" : ""}`,
      }),
      {}
    ),
  }),
  {}
);
LAYOUT_CSS_VARS["--content-max-width"] = CONTENT_MAX_WIDTH + "px";
