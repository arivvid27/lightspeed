import Image from "next/image";
import { addTask } from "../actions/actions";
import { prisma } from "../lib/db";
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      id: 'asc'
    } 
  });

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== i + 1) {
      await prisma.task.update({
        where: {
          id: tasks[i].id
        },
        data: {
          id: i + 1
        }
      });
      tasks[i].id = i + 1;
    }
  }

  async function deleteTask(taskId) {
    'use server'
    const tasksToUpdate = await prisma.task.findMany({
      where: {
        id: {
          gt: taskId
        }
      }
    });

    await prisma.task.delete({
      where: {
        id: taskId
      }
    });

    for (const task of tasksToUpdate) {
      await prisma.task.update({
        where: {
          id: task.id
        },
        data: {
          id: task.id - 1
        }
      });
    }

    revalidatePath('/');
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="my-10 text-left list-decimal w-full">
          {tasks.map((task, index) => (
            <li key={task.id} className="mb-2 flex items-center justify-between">
              <span className="flex-grow text-left">{task.id}. {task.title}</span>
              <form action={deleteTask.bind(null, task.id)}>
                <button
                  type="submit"
                  className="ml-4 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  X
                </button>
              </form>
            </li>
          ))}
        </ol>
        <form action={addTask} className="flex gap-4 items-center flex-col sm:flex-row bg-black p-4 rounded-lg">
          <input
            type="text"
            name="title"
            className="rounded-full border border-solid border-white/[.145] transition-colors px-4 h-10 sm:h-12 text-sm sm:text-base focus:outline-none focus:border-white/[.32] text-white bg-black"
            placeholder="Enter text..."
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-white hover:bg-[#383838] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Submit
          </button>
        </form>      
      </main>
    </div>
  );
}