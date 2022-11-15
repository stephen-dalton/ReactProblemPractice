import { useState } from "react";
import "./App.css";

function App() {
  // Set State
  const [points, setPoints] = useState([]);
  const [pointsStack, setPointsStack] = useState([]);

  // Get where the mouse clicked, and account for offset.
  const handlePointCreate = (e) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX - 10, y: clientY - 32 }]);
  };

  // Implement Redo Functionality
  const handlePointRedo = () => {
    // create a copy of the current points stack
    const pointsStackCopy = [...pointsStack];
    // get the last point pushed to the stack, and remove it from stack;
    const lastPointAdded = pointsStackCopy.pop();
    // if no more elements in the stack, return;
    if (!lastPointAdded) return;
    // update points to include previous points and the last element added to the stack
    setPoints([...points, lastPointAdded]);
    // update stack to a new stack without the last element added
    setPointsStack(pointsStackCopy);
  };

  // Implement Undo Functionality
  const handlePointUndo = () => {
    // Get a copy of points
    const pointsCopy = [...points];
    // get the last point, and pop off copy of points
    const lastPointAdded = pointsCopy.pop();
    // if there is no elements left in the points array return
    if (!lastPointAdded) return;
    // Update the stack with the previous stack, and most recent point created
    setPointsStack([...pointsStack, lastPointAdded]);
    // set the points state to not include previously added point
    setPoints(pointsCopy);
  };

  // Handle Reset Functionality
  const handleReset = () => {
    setPoints([]);
    setPointsStack([]);
  };
  return (
    <>
      <div className="buttons">
        <button onClick={handlePointRedo}>REDO</button>
        <button onClick={handlePointUndo}>UNDO</button>
        <button onClick={handleReset}>RESET</button>
      </div>
      <div className="container" onClick={handlePointCreate}>
        {points.map((point, i) => (
          <div
            key={i}
            className="point"
            style={{ top: point.y, left: point.x }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
