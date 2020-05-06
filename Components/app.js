import React from "react";
import StackNav from "./appnav";
import { NavigationContainer } from "@react-navigation/native";
import Firebase, { FirebaseProvider } from "../Firebase";

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </FirebaseProvider>
  );
}