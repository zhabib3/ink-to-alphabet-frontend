import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import DrawGrid from "./Components/DrawGrid";

const primaryColor: string = "#675AF4";
const FUNC_URL =
  "https://ink-to-alphabet.azurewebsites.net/api/GetAlphabetPrediction";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setwidth] = useState(300);
  const [height, setheight] = useState(300);
  const [predictedLetter, setPredictedLetter] = useState<string>("܂");
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Determine component sizes on load
  useEffect(() => {
    const w = window.innerWidth;
    // console.log(w);
  }, []);

  const handlePredict = async (e: any) => {
    setisLoading(true);
    const canvas = canvasRef.current;
    const canvasImgUrl = canvas?.toDataURL("image/png", 1.0);

    try {
      const response = await axios.post(FUNC_URL, {
        imgURL: canvasImgUrl,
      });
      setPredictedLetter(response.data["Predicted Alphabet"]);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = (e: any) => {
    clearCanvas();
    setPredictedLetter("܂")
  }

  const clearCanvas = () => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
  }

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
                <h5 className="subheading">Draw a letter ✍</h5>
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
                  style={{
                    margin: 10,
                    borderRadius: 0,
                    border: `1px solid ${primaryColor}`,
                    backgroundColor: primaryColor,
                  }}
                  className="btn btn-primary btn-large"
                  onClick={handlePredict}
                >
                  🤔 Predict
                </Button>
                <Button
                  onClick={handleClear}
                  className="btn btn-large"
                  variant="outline-danger"
                  style={{
                    margin: 10,
                    borderRadius: 0,
                    // border: `1px solid ${primaryColor}`,
                    // backgroundColor: "inherit",
                  }}
                >
                  🚫 Clear
                </Button>
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
                <h5 className="subheading">Predicted Alphabet 🔡</h5>
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
                  {isLoading ? (
                    <Spinner animation="grow" />
                  ) : (
                    <h1 className="predicted">
                      {predictedLetter.toUpperCase()}܁
                      {predictedLetter.toLowerCase()}
                    </h1>
                  )}
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
