"use client";

import Navbar from "@/components/editor/Navbar";
import SidePanel from "@/components/editor/SidePanel";
import { useEditor } from "@/context/editor";
import ImageEditor from "@/lib/ImageEditor";
import { ThemeTypes } from "@/types";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function Editor() {
  const { panelOptions, panelDispatch } = useEditor();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<ImageEditor | null>(null);

  const { resolvedTheme } = useTheme();

  function resizeCanvasToContainer() {
    if (canvasContainerRef.current && canvasRef.current) {
      const containerWidth = canvasContainerRef.current.clientWidth;
      const containerHeight = canvasContainerRef.current.clientHeight;
      // Set the canvas size to match the container size
      canvasRef.current.width = containerWidth;
      canvasRef.current.height = containerHeight;
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerHeight}px`;
    }
  }

  useEffect(() => {
    resizeCanvasToContainer();
    window.addEventListener("resize", resizeCanvasToContainer);
    editorRef.current = new ImageEditor(canvasRef.current!);
    return () => {
      window.removeEventListener("resize", resizeCanvasToContainer);
      editorRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // debugger;
    editorRef.current?.setTheme((resolvedTheme) as ThemeTypes);
  }, [resolvedTheme]);

  return (
    <main className="h-dvh flex flex-col ">
      <Navbar />
      <div className="flex-1 flex">
        <SidePanel
          sidePanelOptions={panelOptions.left}
          value={panelOptions.activeLeft}
          onChange={(value) =>
            panelDispatch({
              type: "SET_LEFT_PANEL",
              payload: { type: "left", value },
            })
          }
        />
        <section
          ref={canvasContainerRef}
          className="flex-1 h-full box-border relative overflow-hidden dark:bg-gray-900 bg-gray-100 "
        >
          <canvas ref={canvasRef} className="absolute"></canvas>
        </section>
        <SidePanel
          sidePanelOptions={panelOptions.right}
          value={panelOptions.activeRight}
          flip
          onChange={(value) => {
            panelDispatch({
              type: "SET_RIGHT_PANEL",
              payload: { type: "right", value },
            });
          }}
        />
      </div>
    </main>
  );
}
