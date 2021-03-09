import React from "react";
import _clone from "lodash/clone";
import _merge from "lodash/merge";
import _omit from "lodash/omit";
import _mapValues from "lodash/mapValues";

import {
  createMuiTheme,
  Theme,
  ThemeOptions,
  fade,
} from "@material-ui/core/styles";
import { Shadows } from "@material-ui/core/styles/shadows";

import ClearIcon from "@material-ui/icons/Clear";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlankSharp";
import CheckBoxIcon from "@material-ui/icons/CheckBoxSharp";

import { antlerPalette, antlerPaletteToMui } from "./antlerPalette";
import { spacingFn } from "./spacing";
import { BREAKPOINT_VALUES, LAYOUT_CSS_VARS } from "./layout";

export const HEADING_FONT = "Europa, sans-serif";
export const BODY_FONT = '"Open Sans", sans-serif';
export const MONO_FONT =
  "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace";

export const PRIMARY_TEXT = antlerPalette.aBlack[500];
export const SECONDARY_TEXT = antlerPalette.aGray[700];
export const DISABLED_TEXT = antlerPalette.aGray[500];

export const ROOT_FONT_SIZE = 16;
export const toRem = (px: number) => `${px / ROOT_FONT_SIZE}rem`;
export const toEm = (px: number, root: number) => `${px / root}em`;

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    antler: typeof antlerPalette;
  }
  interface PaletteOptions {
    antler: typeof antlerPalette;
  }
  interface TypeBackground {
    elevation?: Record<0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24, string>;
  }
}
declare module "@material-ui/core/styles/createTypography" {
  interface FontStyle {
    fontFamilyMono: string;
  }
}
declare module "@material-ui/core/styles/createSpacing" {
  interface Spacing {
    (value: string | number): number;
  }
}
declare module "@material-ui/core/styles/transitions" {
  interface Easing {
    custom: string;
  }
}

export const themeBase = {
  palette: {
    primary: antlerPaletteToMui(antlerPalette.aRed),
    secondary: { main: antlerPalette.aBlack[500] },
    background: {
      default: antlerPalette.aGray[50],
      paper: antlerPalette.aWhite[500],
    },
    text: {
      primary: PRIMARY_TEXT,
      secondary: SECONDARY_TEXT,
      disabled: DISABLED_TEXT,
    },
    error: antlerPaletteToMui(antlerPalette.errorRed),
    warning: antlerPaletteToMui(antlerPalette.amber),
    info: antlerPaletteToMui(antlerPalette.blue),
    success: antlerPaletteToMui(antlerPalette.green),
    antler: antlerPalette,

    action: {
      hover: "rgba(0, 0, 0, 0.12)",
      hoverOpacity: 0.12,
    },
  },
  typography: {
    fontFamily: BODY_FONT,
    fontFamilyMono: MONO_FONT,
    h1: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(48),
      fontWeight: "normal",
      letterSpacing: toEm(-0.67, 48),
      lineHeight: 64 / 48,
    },
    h2: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(40),
      fontWeight: "normal",
      letterSpacing: toEm(-0.34, 40),
      lineHeight: 56 / 40,
    },
    h3: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(36),
      fontWeight: "normal",
      letterSpacing: toEm(0, 36),
      lineHeight: 48 / 36,
    },
    h4: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(32),
      fontWeight: "normal",
      letterSpacing: toEm(0.21, 32),
      lineHeight: 40 / 32,
    },
    h5: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(24),
      fontWeight: "normal",
      letterSpacing: toEm(0, 24),
      lineHeight: 32 / 24,
    },
    h6: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(18),
      fontWeight: "normal",
      letterSpacing: toEm(0.2, 18),
      lineHeight: 24 / 16,
    },
    subtitle1: {
      fontSize: toRem(16),
      letterSpacing: toEm(0.15, 16),
      lineHeight: 24 / 16,
    },
    subtitle2: {
      fontFamily: HEADING_FONT,
      fontSize: toRem(16),
      fontWeight: "bold",
      letterSpacing: toEm(0.1, 16),
      lineHeight: 24 / 16,
    },
    body1: {
      fontSize: toRem(16),
      letterSpacing: toEm(0.5, 16),
      lineHeight: 24 / 16,
      color: SECONDARY_TEXT,
    },
    body2: {
      fontSize: toRem(14),
      letterSpacing: toEm(0.25, 14),
      lineHeight: 24 / 14,
      color: SECONDARY_TEXT,
    },
    button: {
      fontSize: toRem(14),
      fontWeight: 600,
      letterSpacing: toEm(0.67, 14),
      lineHeight: 16 / 14,
    },
    overline: {
      fontSize: toRem(14),
      letterSpacing: toEm(2.5, 14),
      lineHeight: 16 / 14,
      color: DISABLED_TEXT,
    },
    caption: {
      fontSize: toRem(14),
      letterSpacing: toEm(0.5, 14),
      lineHeight: 16 / 14,
    },
  },
};

export const darkThemeBase = {
  // https://material.io/design/color/dark-theme.html#ui-application
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
      elevation: {
        0: "#121212",
        1: "#1E1E1E",
        2: "#222222",
        3: "#252525",
        4: "#272727",
        6: "#2C2C2C",
        8: "#2E2E2E",
        12: "#333333",
        16: "#363636",
        24: "#383838",
      },
    },
    secondary: { main: "#E4E4E5" },
    text: {
      // primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.7)",
      // disabled: "rgba(255, 255, 255, 0.38)",
    },
    error: { main: "#CF6679" },
  },
  typography: {
    overline: { color: "rgba(255, 255, 255, 0.6)" },
  },
  overrides: {
    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.67)" },
    },
  },
};

export const defaultOverrides = (theme: Theme): ThemeOptions => ({
  transitions: {
    easing: { custom: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
  },
  overrides: {
    MuiContainer: {
      root: {
        "@supports (padding: max(0px))": {
          paddingLeft: `max(${theme.spacing(2)}px, env(safe-area-inset-left))`,
          paddingRight: `max(${theme.spacing(
            2
          )}px, env(safe-area-inset-right))`,

          "@media (min-width: 640px)": {
            paddingLeft: `max(${theme.spacing(
              3
            )}px, env(safe-area-inset-left))`,
            paddingRight: `max(${theme.spacing(
              3
            )}px, env(safe-area-inset-right))`,
          },
        },
      },
    },
    MuiTooltip: {
      tooltip: theme.typography.caption,
    },
    MuiButton: {
      root: {
        minHeight: 32,
        padding: theme.spacing(0.25, 2),
      },
      sizeSmall: { minHeight: 30 },
      sizeLarge: { minHeight: 48 },

      contained: {
        borderRadius: 500,
        boxShadow: "none",
      },
      containedSizeLarge: { padding: theme.spacing(1, 4) },

      outlined: { padding: theme.spacing(3 / 8, 15 / 8) },
      outlinedPrimary: {
        // Same as outlined text field
        borderColor: fade(theme.palette.divider, 0.23),
      },
      outlinedSizeLarge: {
        padding: theme.spacing(1, 4),
        borderRadius: 500,

        "&$outlinedPrimary": { borderColor: theme.palette.primary.main },
      },

      iconSizeMedium: {
        "& > *:first-child": { fontSize: 24 },
      },
    },
    MuiSvgIcon: {
      fontSizeLarge: { fontSize: toRem(36) },
    },
    // Override text field label
    MuiFormLabel: {
      root: {
        ...theme.typography.subtitle2,
        lineHeight: 1,
      },
    },
    // Override radio & checkbox labels
    MuiFormControlLabel: {
      root: { display: "flex" },
      label: theme.typography.body1,
    },
    MuiChip: {
      root: {
        borderRadius: 4,
        maxWidth: "100%",

        height: "auto",
        minHeight: 32,

        color: theme.palette.text.secondary,
      },
      label: {
        ...theme.typography.caption,
        color: "inherit",
        padding: theme.spacing(1, 1.5),
        // whiteSpace: "normal",

        "$outlined &": {
          paddingTop: theme.spacing(0.875),
          paddingBottom: theme.spacing(0.875),
        },
      },
      sizeSmall: { minHeight: 24 },
      labelSmall: {
        padding: theme.spacing(0.5, 1.5),
      },

      outlined: {
        backgroundColor: theme.palette.action.selected,
        borderColor: theme.palette.action.selected,
      },
      outlinedPrimary: {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },

      deleteIcon: { color: "inherit" },
    },
    MuiBadge: {
      badge: {
        ...theme.typography.caption,
        fontFeatureSettings: '"tnum"',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "var(--bg-paper)",
        "--bg-paper": theme.palette.background.paper,
      },
      rounded: { borderRadius: 8 },
      // Dark theme paper elevation backgrounds
      ...(() => {
        const classes: Record<string, any> = {};
        for (let i = 0; i <= 24; i++) {
          if (theme.palette.background.elevation === undefined) continue;

          let closestElevation = i;
          for (let j = i; j > 0; j--) {
            if (theme.palette.background.elevation[j] !== undefined) {
              closestElevation = j;
              break;
            }
          }

          classes["elevation" + i] = {
            "&&": {
              "--bg-paper":
                theme.palette.background.elevation[closestElevation],
            },
          };
        }
        return classes;
      })(),
    },
    MuiSlider: {
      disabled: {},
      rail: {
        backgroundColor: "#e7e7e7",
        opacity: 1,
      },

      mark: {
        width: 4,
        height: 4,
        borderRadius: "50%",
        marginLeft: -2,
        marginTop: -1,
        backgroundColor: "#69696a",
        "$disabled &": { backgroundColor: "currentColor" },
      },
      markActive: {
        opacity: 1,
        backgroundColor: "currentColor",
        "$disabled &": { backgroundColor: "currentColor" },
      },

      thumb: {
        width: 16,
        height: 16,
        marginTop: -7,
        marginLeft: -8,

        "$disabled &": {
          width: 12,
          height: 12,
          marginTop: -5,
          marginLeft: -6,
        },
      },

      valueLabel: {
        top: -22,
        left: "calc(-25%)",
        ...theme.typography.caption,
        color: theme.palette.primary.main,

        "& > *": {
          width: "auto",
          minWidth: 24,
          height: 24,

          whiteSpace: "nowrap",
          borderRadius: 500,

          padding: theme.spacing(0, 1),
          paddingRight: theme.spacing(0.875),
        },
        "& *": { transform: "none" },
      },
      markLabel: theme.typography.caption,
    },
    MuiLinearProgress: {
      colorPrimary: { backgroundColor: "#e7e7e7" },
      colorSecondary: { backgroundColor: "#e7e7e7" },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
      },
    },
    MuiListItemIcon: {
      root: { minWidth: theme.spacing(40 / 8) },
    },

    MuiSnackbar: {
      root: {
        ..._omit(theme.typography.overline, ["color"]),

        "&& > *": {
          ..._mapValues(
            _omit(theme.typography.overline, ["color"]),
            () => "inherit"
          ),
          alignItems: "center",
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: antlerPalette.aGray[700],
        color: theme.palette.common.white,
        userSelect: "none",

        padding: theme.spacing(0.5, 2),
        boxShadow: "none",
      },

      message: {
        padding: theme.spacing(1, 2),
      },
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        subtitle1: "div",
        subtitle2: "div",
      },
    },
    MuiRadio: { color: "primary" },
    MuiCheckbox: { color: "primary" },
    MuiButton: { color: "primary" },
    MuiTabs: {
      indicatorColor: "primary",
      textColor: "primary",
    },
    MuiCircularProgress: { size: 44 },
    // Select: show dropdown below text field to follow new Material spec
    MuiSelect: {
      MenuProps: {
        getContentAnchorEl: null,
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        transformOrigin: { vertical: "top", horizontal: "center" },
      },
    },
    MuiLink: {
      color: "primary",
      underline: "hover",
    },
    MuiChip: { deleteIcon: <ClearIcon /> },
    MuiTextField: { variant: "filled" },
    MuiDialog: {
      PaperProps: { elevation: 4 },
    },
  },
});

export const customizableLightTheme = (customization: ThemeOptions) => {
  const customizedLightThemeBase = createMuiTheme(
    _merge({}, themeBase, customization)
  );

  return createMuiTheme(
    customizedLightThemeBase,
    _merge({}, defaultOverrides(customizedLightThemeBase), customization)
  );
};

export const customizableDarkTheme = (customization: ThemeOptions) => {
  const customizedDarkThemeBase = createMuiTheme(
    _merge({}, themeBase, darkThemeBase, customization)
  );

  return createMuiTheme(
    customizedDarkThemeBase,
    _merge({}, defaultOverrides(customizedDarkThemeBase), customization)
  );
};

const Themes = {
  light: customizableLightTheme,
  dark: customizableDarkTheme,
};
export default Themes;
