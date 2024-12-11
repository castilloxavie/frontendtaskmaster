"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function FormTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
        method: "POST",
        body: JSON.stringify({title, description}),
        headers : {
            'Content-Type': 'application/json',
        }
    })
    const data =  await res.json()
    console.log(data)
    router.refresh()
  };


  return (
    <div className="bg-gray-800 p-7 h-fit rounded-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-white font-bold text-xl">Agregar Tarea</h1>

        <label htmlFor="title" className="text-sm text-white">
          Título
        </label>
        <input
          type="text"
          name="title"
          className="bg-gray-600 rounded-md p-2 mb-2 block w-full text-white"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description" className="text-sm text-white">
          Descripción
        </label>
        <textarea
          name="description"
          className="bg-gray-600 rounded-md p-2 mb-2 block w-full text-white"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className="bg-indigo-600 text-white rounded-md p-2 block w-full">
          Guardar
        </button>

      </form>
    </div>
  );
}

export default FormTask;
