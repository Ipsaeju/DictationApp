import React from "react";
import AppNav from "./appnav";
import Firebase, { FirebaseProvider } from "../Firebase/firebase";

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <AppNav />
    </FirebaseProvider>
  );
}