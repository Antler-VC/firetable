export const triggerPath = "test/{docId}";
export const functionName = "test";
export const derivativesConfig = [
  {
    fieldName: "derivative",
    evaluate: async ({ row, ref, db, auth, storage, utilFns }) => {
      return row.firstName + 1;
    },
    listenerFields: ["firstName", "code"],
  },
];
export const initializeConfig = [
  {
    fieldName: "multiSelect",
    type: "null",
  },
  {
    fieldName: "checkbox",
    type: "static",
    value: true,
  },
  {
    fieldName: "json",
    type: "static",
    value: {
      field1: "value1\n",
      test: null,
    },
  },
  {
    fieldName: "color",
    type: "static",
    value: {
      rgb: {
        a: 1,
        g: 181,
        r: 71,
        b: 108,
      },
      hsl: {
        h: 140.35714285714286,
        a: 1,
        l: 0.493986685,
        s: 0.4366783995402629,
      },
      source: "rgb",
      hex: "#47b56c",
      oldHue: 140.35714285714286,
      hsv: {
        h: 140.35714285714286,
        s: 0.6079,
        a: 1,
        v: 0.7097,
      },
    },
  },
  {
    fieldName: "firstName",
    type: "static",
    value: 5,
  },
  {
    fieldName: "shortText",
    type: "dynamic",
    script: async ({ row, ref, db, auth, utilFns }) => {
      //const q = await db.collection("locations").limit(Math.ceil(Math.random()*10)).get()
      return "test";
    },
  },
  {
    fieldName: "derivative",
    type: "static",
    value: 3,
  },
];
export const documentSelectConfig = [
  {
    fieldName: "test",
    trackedFields: ["teamMembers", "location", "elevatorPitch"],
  },
  {
    fieldName: "coaches",
    trackedFields: [
      "firstName",
      "lastName",
      "bookingLink",
      "location",
      "email",
      "profilePhoto",
    ],
  },
];
export const sparksConfig = [];
export const actionScriptsConfig = {
  hello: {
    requiredFields: ["color", "shortText"],

    requiredRoles: ["ADMIN"],

    script: ({ row, auth, db, ref, actionParams }) => {
      return {
        message: `hi ${ref.id}`,
        success: true,
      };
    },
  },
};
