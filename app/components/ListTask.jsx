import React from 'react'
import TasksCard from "./TasksCard"


async function loadTasks(){
    const res = await fetch(`${process.env.BACKEND_URL}/api/tasks/`)
    const tasks = await res.json()
    return tasks
}

async function ListTask() {
  
  const tasks = await loadTasks()
  console.log(tasks)
  
  return (
    <div className='bg-gray-800 p-4 w-full'>

        <h1 className="text-xl font-bold text-gray-200">Lista de Tareas</h1>

        {tasks.map(task =>(
            <TasksCard task={task} key={task.id} />
        ))}

    </div>
  )
}

export default ListTask
