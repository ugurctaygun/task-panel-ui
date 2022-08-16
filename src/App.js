import React, { Suspense } from "react";
import Header from "./components/Header";

function App() {
  return (
    <Suspense fallback={null}>
      <Header />
    </Suspense>
  );
}

export default App;
