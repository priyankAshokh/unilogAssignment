import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  let data = {
    "projetcName": "Build-Car",
    "startDate": "Thu Nov 05 2020 11:20:12 GMT+0530 (India Standard Time)",
    "endDate": "Thu Nov 15 2020 11:20:12 GMT+0530 (India Standard Time)",
    "root": {
      "task1": { "name": "BuildFrame", "prevTask": "", "nextTask": "task2" },
      "task2": { "name": "BuildBody", "prevTask": "task1", "nextTask": "task4" },
      "task3": { "name": "TestCar", "prevTask": "task4", "nextTask": "" },
      "task4": { "name": "FitTyre", "prevTask": "task2", "nextTask": "task3" }
    }
  }
  const [newData, setNewData] = useState(Object.values(data.root))

  const modifyData = (data) => {
    var element = document.getElementById('BuildFrame');
    var rect = element.getBoundingClientRect();
    data.task1.x = rect.x
    data.task1.y = rect.y
    let newData = [...Object.values(data)]
    const fetchModifiedData = newData.map((item, index) => {
      item.x = index * 120
      item.y = index * 120
      item.task = `Task ${index + 1}`
      if (item.prevTask) {
        item.previous = item.prevTask.split("task")[1]
      } else {
        item.previous = 0
      }
      if (item.nextTask) {
        item.next = item.nextTask.split("task")[1]
      } else {
        item.next = 0
      }
      return item
    })
    const setCordinates = fetchModifiedData.map((item, id) => {
      if (item.previous === 0) {
        return item
      }
      if (Math.sign(item.previous - item.next) === 1) {
        item.x = (item.previous - item.next) * 80 + item.x
      }
      return item
    })
    // const canvas = document.getElementById('canvas');
    // const context = canvas.getContext('2d');

    // context.beginPath();
    // context.moveTo(10, 20);
    // context.lineTo(100, 40);
    // context.stroke();
    return setCordinates
  }

  useEffect(() => {
    const result = modifyData(data.root)
    setNewData(result)
  })

  return (
    <div className="App">
      {
        <div className="task">{newData.map((item, idx) => {
          return (
            <>
              <div id={item.name} className="taskbox" style={{ position: "absolute", left: item.x + 'px', top: item.y + 'px' }}>{item.task}
                <span>{item.name}</span>
              </div>
              <canvas id="canvas"></canvas>
            </>
          )
        })}</div>
      }
    </div>
  );
}

export default App;
