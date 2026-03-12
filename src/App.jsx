import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState("0");

  const [justEvaluated, setJustEvaluated] = useState(false);
  const displayRef = useRef(null);
  const operators = ["+", "-", "*", "/"];

  const appendtoDisplay = (value) => {
    if (value === "C") {
      setCount("0");
      setJustEvaluated(false);
      return;
    }

    if (value === "=") {
      try {
        setCount(eval(count).toString());
      } catch (error) {
        setCount("Error");
      }
      setJustEvaluated(true);
      return;
    }

    // handle input immediately after evaluation
    if (justEvaluated) {
      if (operators.includes(value)) {
        // continue chain with operator
        setJustEvaluated(false);
        setCount((prev) => prev + value);
        return;
      } else {
        setJustEvaluated(false);
        if (value === ".") {
          setCount("0.");
        } else if (/[0-9]/.test(value)) {
          setCount(value);
        }
        return;
      }
    }

    // otherwise process normally
    setCount((prev) => {
      // start: if previous was "0" and new input is digit (not dot)
      if (prev === "0" && /[0-9]/.test(value)) {
        return value;
      }

      // dot handling: no consecutive dots and only one per number
      if (value === ".") {
        const last = prev.slice(-1);
        if (last === ".") {
          return prev;
        }
        if (operators.includes(last)) {
          // begin new number with 0.
          return prev + "0.";
        }
        // prevent another dot in current segment
        if (
          prev
            .split(/[\+\-\*\/]/)
            .pop()
            .includes(".")
        ) {
          return prev;
        }
        return prev + ".";
      }

      // operator handling
      if (operators.includes(value)) {
        // allow leading minus
        if (prev === "0" && value === "-") {
          return "-";
        }

        if (value === "-") {
          const lastChar = prev.slice(-1);
          if (operators.includes(lastChar) && lastChar !== "-") {
            // negative number after another operator
            return prev + value;
          }
          if (lastChar === "-") {
            // already a minus, do nothing
            return prev;
          }
        } else {
          // trim any trailing operators before appending
          const trimmed = prev.replace(/[\+\-\*\/]+$/, "");
          return trimmed + value;
        }
      }

      // default: append number or other permitted value
      return prev + value;
    });
  };

  return (
    <>
      <div class="container">
        <div class="content">
          <input
            type="text"
            id="display"
            value={count}
            ref={displayRef}
            readonly
          />

          <div class="btn-container">
            <button id="clear" onClick={() => appendtoDisplay("C")}>
              C
            </button>
            <button
              id="add"
              className="operators"
              onClick={() => appendtoDisplay("+")}
            >
              +
            </button>
            <button
              id="subtract"
              className="operators"
              onClick={() => appendtoDisplay("-")}
            >
              -
            </button>
            <button
              id="multiply"
              className="operators"
              onClick={() => appendtoDisplay("*")}
            >
              *
            </button>
            <button
              id="divide"
              className="operators"
              onClick={() => appendtoDisplay("/")}
            >
              /
            </button>
            <button id="zero" onClick={() => appendtoDisplay("0")}>
              0
            </button>
            <button id="one" onClick={() => appendtoDisplay("1")}>
              1
            </button>
            <button id="two" onClick={() => appendtoDisplay("2")}>
              2
            </button>
            <button id="three" onClick={() => appendtoDisplay("3")}>
              3
            </button>
            <button id="four" onClick={() => appendtoDisplay("4")}>
              4
            </button>
            <button id="five" onClick={() => appendtoDisplay("5")}>
              5
            </button>
            <button id="six" onClick={() => appendtoDisplay("6")}>
              6
            </button>
            <button id="seven" onClick={() => appendtoDisplay("7")}>
              7
            </button>
            <button id="eight" onClick={() => appendtoDisplay("8")}>
              8
            </button>
            <button id="nine" onClick={() => appendtoDisplay("9")}>
              9
            </button>
            <button id="decimal" onClick={() => appendtoDisplay(".")}>
              .
            </button>
            <button id="equals" onClick={() => appendtoDisplay("=")}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
