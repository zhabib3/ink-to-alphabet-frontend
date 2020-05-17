import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import DrawGrid from "./Components/DrawGrid";
const primaryColor: string = "#675AF4";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setwidth] = useState(300);
  const [height, setheight] = useState(300);

  // Determine component sizes on load
  useEffect(() => {
    const w = window.innerWidth;
    // console.log(w);
  }, []);

  return (
    <div className="App">
      <Container
        style={{
          backgroundColor: "#1D1D1D",
        }}
        fluid="xl"
      >
        <Row>
          <Col></Col>

          {/* Header */}
          <Col className="text-center" xs={6}>
            <h2 style={{ marginTop: 10 }} className="header">
              Ink to Alphabet Prediction
            </h2>
          </Col>

          <Col></Col>
        </Row>

        <Row>
          <Container
            className="text-center"
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            fluid="lg"
          >
            <Row style={{ width: "100%" }}>
              {/* Draw Grid */}
              <Col
                md={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5 className="subheading">Drawing Grid</h5>
                <DrawGrid width={width} height={height} canvasRef={canvasRef} />
              </Col>

              {/* Buttons */}
              <Col
                md={2}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ margin: 10 }}
                  className="btn btn-primary btn-large"
                  onClick={(e: any) => {
                    const canvas = canvasRef.current;
                    const canvasImg = canvas?.toDataURL("image/png", 1.0);
                    console.log(canvasImg);
                  }}
                >
                  Predict
                </Button>
                <Button style={{ margin: 10 }}>Clear</Button>
              </Col>

              {/* Prediction Box  */}
              <Col
                md={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5 className="subheading">Predicted Letter</h5>
                <div
                  style={{
                    width: `${width}px`,
                    border: "2px dashed #f2f2f2",
                    backgroundColor: "inherit",
                    height: `${height}px`,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <h1 className="predicted">A a</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
};

export default App;
