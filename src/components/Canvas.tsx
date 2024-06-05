import { useCanvas } from "../hooks/useCanvas";
import { Shape as ShapeType } from "../types/shape";

import Shape from "./Shape";

interface CanvasProps {
  shapes: Map<number, ShapeType>;
  addShape: (shape: ShapeType) => void;
}

const Canvas = ({ shapes, addShape }: CanvasProps) => {
  const {
    canvasRef,
    currentShape,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useCanvas(addShape);

  return (
    <ul
      className="canvas"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {Array.from(shapes.values()).map((shape, index) => (
        <Shape key={index} shape={shape} />
      ))}
      {currentShape && <Shape shape={currentShape} />}
    </ul>
  );
};

export default Canvas;
