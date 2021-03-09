export const SPACING_UNIT = 8;

export const spacing = {
  unit: SPACING_UNIT,
  xxs: SPACING_UNIT * 1,
  xs: SPACING_UNIT * 2,
  s: SPACING_UNIT * 3,
  m: SPACING_UNIT * 4,
  l: SPACING_UNIT * 6,
  xl: SPACING_UNIT * 9,
  xxl: SPACING_UNIT * 12,
};

export default spacing;

const transform = (arg: number | string) => {
  if (typeof arg === "number") return arg * SPACING_UNIT;
  return spacing[arg as keyof typeof spacing] || arg;
};

export const spacingFn = (...args: (number | string)[]) => {
  if (process.env.NODE_ENV !== "production") {
    if (!(args.length <= 4)) {
      console.error(
        `Material-UI: Too many arguments provided, expected between 0 and 4, got ${args.length}`
      );
    }
  }

  if (args.length === 0) {
    return transform(1);
  }

  if (args.length === 1) {
    return transform(args[0]);
  }

  return args
    .map((argument) => {
      const output = transform(argument);
      return typeof output === "number" ? `${output}px` : output;
    })
    .join(" ");
};
