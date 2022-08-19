import React, { Suspense } from "react";
import Header from "./layout/Header";
import Panel from "./views/Panel";

function App() {
  return (
    <Suspense fallback={null}>
      <Header />
      <Panel />
    </Suspense>
  );
}

export default App;
