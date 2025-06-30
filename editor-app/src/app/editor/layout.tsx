import { EditorProvider } from "@/context/editor";
import { PropsWithChildren } from "react";

export default function EditorLayout({ children }: PropsWithChildren) {
  return <EditorProvider>{children}</EditorProvider>;
}
