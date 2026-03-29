"use client";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Loader2 } from "lucide-react";

export default function ReduxProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex-center h-[75vh]">
            <Loader2 size={48} className="animate-spin text-primary-blue" />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
