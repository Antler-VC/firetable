import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase/app";
import useDoc from "hooks/useDoc";
import createPersistedState from "use-persisted-state";

import {
  useMediaQuery,
  MuiThemeProvider,
  ThemeOptions,
  CssBaseline,
} from "@material-ui/core";
import Themes from "Themes";

const useThemeState = createPersistedState("_FT_THEME");

interface AppContextInterface {
  currentUser: firebase.User | null | undefined;
  userDoc: any;
  theme: keyof typeof Themes;
  setTheme: React.Dispatch<React.SetStateAction<keyof typeof Themes>>;
}

export const AppContext = React.createContext<AppContextInterface>({
  currentUser: undefined,
  userDoc: undefined,
  theme: "light",
  setTheme: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC = ({ children }) => {
  // Store currentUser from Firebase Auth
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined
  >();
  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      setCurrentUser(auth);
    });
  }, []);

  // Store matching userDoc
  const [userDoc, dispatchUserDoc] = useDoc({});
  // Get userDoc
  useEffect(() => {
    if (currentUser) {
      dispatchUserDoc({ path: `_FT_USERS/${currentUser.uid}` });
    }
  }, [currentUser]);

  // Infer theme based on system settings
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  // Store theme
  const [theme, setTheme] = useThemeState<keyof typeof Themes>(
    prefersDarkTheme ? "dark" : "light"
  );
  // Update theme when system settings change
  useEffect(() => {
    if (prefersDarkTheme && theme !== "dark") setTheme("dark");
    if (!prefersDarkTheme && theme !== "light") setTheme("light");
  }, [prefersDarkTheme]);

  // Store themeCustomization from userDoc
  const [themeCustomization, setThemeCustomization] = useState<ThemeOptions>(
    {}
  );
  const generatedTheme = Themes[theme](themeCustomization);

  useEffect(() => {
    if (userDoc.doc) {
      // Set theme customizations from user doc
      setThemeCustomization(userDoc.doc.theme);
    } else if (
      !userDoc.doc &&
      !userDoc.loading &&
      userDoc.path &&
      currentUser
    ) {
      // Set userDoc if it doesn’t exist
      const userFields = ["email", "displayName", "photoURL", "phoneNumber"];
      const userData = userFields.reduce((acc, curr) => {
        if (currentUser[curr]) {
          return { ...acc, [curr]: currentUser[curr] };
        }
        return acc;
      }, {});
      db.doc(userDoc.path).set(
        {
          tables: {},
          user: userData,
          theme: {
            palette: {
              primary: { main: "#ef4747" },
            },
          },
        },
        { merge: true }
      );
    }
  }, [userDoc]);

  return (
    <AppContext.Provider
      value={{
        userDoc: { state: userDoc, dispatch: dispatchUserDoc },
        currentUser,
        theme,
        setTheme,
      }}
    >
      <MuiThemeProvider theme={generatedTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppContext.Provider>
  );
};
