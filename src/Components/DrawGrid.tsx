import React, { Fragment, useState, useEffect } from "react";

interface IProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
}

const DrawGrid: React.FC<IProps> = ({ canvasRef, width, height }) => {

  const [xPos, setxPos] = useState<number>(0);
  const [yPos, setyPos] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Draw a grid layout on load
  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
  }, []);

  function drawLine(x1: number, y1: number, x2: number, y2: number) {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineCap = 'round';
    ctx.lineWidth = 30;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }

  const handleMouseMove = (e: any) => {
    if (isDrawing) {
      const [x, y] = getPos(e);
      drawLine(xPos, yPos, x, y);
      setxPos(x);
      setyPos(y);
    }
  }

  const getPos = (e: any) => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const canvasX = canvas.getBoundingClientRect().x;
    const canvasY = canvas.getBoundingClientRect().y;
    const x = e.clientX - canvasX;
    const y = e.clientY - canvasY;
    return [x, y];
  }

  const handleMouseClick = (e: any) => {
    setIsDrawing(true);
    const [x, y] = getPos(e);
    setxPos(x);
    setyPos(y);
  }
  const handleMouseUp = (e: any) => {
    if (isDrawing) {
      const [x, y] = getPos(e);
      drawLine(xPos, yPos, x, y);
      setxPos(0);
      setyPos(0);
      setIsDrawing(false);
    }
  }

  return (
    <Fragment>
      <canvas
        style={{ border: "2px solid #2d2d2d", cursor: 'crosshair' }}
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseClick}
        onMouseUp={handleMouseUp}
      />
    </Fragment>
  );
};

export default DrawGrid;
