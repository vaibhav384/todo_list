import React, { useState, useEffect } from 'react';

const fetchList = () => {
  let list = localStorage.getItem("list");

  if(list){
    return JSON.parse(list);
  }
  else{
    return [];
  }
}

function Component() {

  const [input, setinput] = useState("");
  const [Task, setTask] = useState(fetchList);

  function Change(e) {
    setinput(e.target.value);
  }

  function addTask() {
    setTask((Task) => {
      // const updatedTask = [...Task, input];
      const updatedTask = [...Task, { text: input, completed: false }];

      return updatedTask;
    })
    
    setinput("");

  }

  useEffect( () => {
    localStorage.setItem("list", JSON.stringify(Task))
  }, [Task])

  function removeTask(i) {

    const updatedTask = Task.filter((element, id) => {
      return i !== id;
    })

    setTask(updatedTask);
  }

  function completed(i, event) {

    setTask((tasks) => {

      const updatedTasks = tasks.map((task, id) => {
        if (id === i) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return updatedTasks;
    });

  }

  return (
    <div className="container">

      <div className="list m-auto p-4">

        <div className='image text-center'><img src="http://www.clipartbest.com/cliparts/di7/Lgd/di7Lgd4xT.png" alt="" /></div>
        
        <h2 className="h2 text-center">TO-DO LIST</h2>

        <div className="input input-group mb-3">

          <input type="text" style={{ background: "#e3e2e2" }} className="form-control" placeholder="Write the Task" value={input} aria-describedby="button-addon2" onChange={Change} />

          <button className="add-btn btn-outline-secondary" onClick={addTask} type="button" id="button-addon2" disabled={input === ""}>Add Task</button>

        </div>

        {Task.length > 0 && Task.map((data, i) => {
          return (
            <div className="items flex-wrap py-3" key={i}>

              <div className="comp" onClick={() => completed(i)} style={{ cursor: "pointer"}}>
                &#x2713;</div>

              <div>&nbsp;&nbsp;&nbsp;</div>

              <div className='task' onClick={() => completed(i)} style={{ cursor: "pointer", textDecoration: data.completed ? 'line-through' : 'none'  }}>
                {data.text}
              </div>

              {data.completed && <div className='completed' >
                <small>
                  Done
                </small>
              </div>}

              <div className="remove">
                <button className="btn" style={{ border: "0px", borderRadius: "50%" }} onClick={() => removeTask(i)}>
                  &#10006;
                </button>
              </div>

            </div>
          )

        })}

      </div>
    </div>
  )
}

export default Component;
