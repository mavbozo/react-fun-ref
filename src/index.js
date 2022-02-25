import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

function ChildComponent(props) {
  // Declare a new state variable, which we'll call "count"
  const [counter, setCount] = useState(props.counter);

  function increment(event) {
    event.stopPropagation();

    return setCount(counter + 1);
  }

  useEffect(() => {
    props.counterCallback(0, counter);
  });

  return (
    <div onClick={increment}>Child Value - {counter} - Click to increment</div>
  );
}

function Page(props) {
  // Declare a new state variable, which we'll call "count"
  const [counter, setCount] = useState(props.counter);

  function increment() {
    return setCount(counter + 1);
  }

  useEffect(() => {
    props.pageCounterCallback(0, counter);
  });

  return (
    <div onClick={increment}>
      <div>Parent Value - {counter} - Click to increment</div>
      <ChildComponent
        counter={props.counter}
        counterCallback={props.childCounterCallback}
      />
    </div>
  );
}

var widgetStates = [{ pageCounter: 0, childCounter: 0 }];

var pageCounterCallback = function (idx, counter) {
  widgetStates[idx].pageCounter = counter;
};

var childCounterCallback = function (idx, counter) {
  widgetStates[idx].childCounter = counter;
};

ReactDOM.render(
  <Page
    counter={0}
    pageCounterCallback={pageCounterCallback}
    childCounterCallback={childCounterCallback}
  />,
  document.getElementById("app")
);

const parentBtn = document.getElementById("parentButton");
parentBtn.addEventListener("click", (event) => {
  alert(widgetStates[0].pageCounter);
});

const childBtn = document.getElementById("childButton");
childBtn.addEventListener("click", (event) => {
  alert(widgetStates[0].childCounter);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
