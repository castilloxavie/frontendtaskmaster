"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function TasksCard({ task }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar esta tarea?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        router.refresh();
      }
    }
  };

  const handleTasksDone = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
      {
        method: "POST",
      }
    );
    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
        {
          method: "PUT",
          body: JSON.stringify({ title: newTitle, description: newDescription }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setNewTitle(data.title);
        setNewDescription(data.description);
        router.refresh();
        setEdit(false); 
      } else {
        console.error("Error al actualizar la tarea");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="bg-gray-700 px-4 py-3 mb-2 rounded-md text-gray-200 flex justify-between items-center">
      <div className="flex flex-col">
        {!edit ? (
          <h2 className="font-bold text-gray-100">{task.title}</h2>
        ) : (
          <input
            type="text"
            value={newTitle} 
            className="p-2 bg-gray-600 border-none outline-none text-white"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        )}

        {!edit ? (
          <p>{task.description}</p>
        ) : (
          <textarea
            value={newDescription} 
            className="p-2 bg-gray-600 border-none outline-none text-white w-full"
            rows={1}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-between gap-x-2">
        {edit && (
          <button
            className="bg-indigo-600 text-white rounded-md p-2"
            onClick={() => handleUpdate(task.id)}
          >
            Guardar Cambios
          </button>
        )}

        <button
          className={`text-white rounded-md p-2 ${
            task.done ? "bg-gray-400" : "bg-green-600"
          }`}
          onClick={() => handleTasksDone(task.id)}
        >
          {task.done ? "Terminado" : "Terminar"}
        </button>

        <button
          className="bg-red-600 text-white rounded-md p-2"
          onClick={() => handleDelete(task.id)}
        >
          Eliminar
        </button>

        <button
          className="bg-blue-600 text-white rounded-md p-2"
          onClick={() => setEdit(!edit)}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}

export default TasksCard;
