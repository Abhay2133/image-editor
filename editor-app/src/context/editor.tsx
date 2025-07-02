"use client";

import { sidePanelData, sidepanelReducer } from "@/reducer/sidepanel";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from "react";

export interface EditorContextType {
  panelOptions: typeof sidePanelData;
  panelDispatch: React.Dispatch<any>;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: PropsWithChildren) {
  const [panelOptions, panelDispatch] = useReducer(
    sidepanelReducer,
    sidePanelData
  );

  return (
    <EditorContext.Provider value={{ panelDispatch, panelOptions }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error(
      `'useEditor' should be used inside a 'EditorProvider' child`
    );
  return context;
}
