/**
 *  Image Editor manages the DOM levels events of the canvas
 *  Like : Drag, Paste, Copy, etc
 */
import { ThemeTypes } from "@/types";
import { Canvas, FabricText, Rect } from "fabric";
export default class ImageEditor {
  canvas: HTMLCanvasElement;
  fabricCanvas: Canvas;

  // Release all the resources and event listeners
  destroy() {
    this.fabricCanvas?.dispose();
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.fabricCanvas = new Canvas(this.canvas, {
      selection: false,
      backgroundColor: "#fff",
      controlsAboveOverlay: true,
      skipTargetFind: true,
      renderOnAddRemove: false,
      preserveObjectStacking: true,
    });

    this.init();
  }

  setTheme(theme: ThemeTypes) {
    this.fabricCanvas.backgroundColor =
      theme === "dark" ? "#1a1a1a" : "#ffffff";
    this.fabricCanvas.requestRenderAll(); // Force render
  }

  setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.fabricCanvas.setWidth(width);
    this.fabricCanvas.setHeight(height);
    this.fabricCanvas.requestRenderAll(); // Force render
  }

  download(name = "image.png", type = "image/png", quality = 1.0) {
    const imageSrc = this.canvas.toDataURL(type, quality);
    // some download code down here
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private init() {
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 100,
      height: 100,
    });
    this.fabricCanvas.add(rect);
    this.fabricCanvas.requestRenderAll(); // Force render
  }
  private events = {};

  private attachEventHandlers() {}
}
