"use client"

import ImageEditor from "@/lib/ImageEditor";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editor = useRef<ImageEditor>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const _editor = new ImageEditor(canvasRef.current);
    editor.current = _editor;

    return () => _editor.destroy();
  }, []);
  return (
    <main className="grid">
      <canvas ref={canvasRef}></canvas>
      <div id="controls"></div>
    </main>
  );
}
