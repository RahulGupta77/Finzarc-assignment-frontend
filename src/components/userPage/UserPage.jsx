import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const API_BASE = "https://finzarc.rahulgupta.tech/api/v1/task";

const UserPage = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_BASE, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("Fetched tasks:", data.data.tasks);
      setTasks(data.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const url = editingTaskId ? `${API_BASE}/${editingTaskId}` : API_BASE;
    const method = editingTaskId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        setFormData({ title: "", description: "", priority: "medium" });
        setEditingTaskId(null);
        await fetchTasks();
      } else {
        console.error("Error saving task:", result.message);
      }
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`${API_BASE}/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        await fetchTasks();
      } else {
        const result = await res.json();
        console.error("Error deleting task:", result.message);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const res = await fetch(`${API_BASE}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
        credentials: "include",
      });

      if (res.ok) {
        // Update the task locally to avoid an additional fetch
        setTasks(
          tasks.map((task) =>
            task._id === taskId ? { ...task, completed: !task.completed } : task
          )
        );
      } else {
        const result = await res.json();
        console.error("Error updating task completion:", result.message);
      }
    } catch (err) {
      console.error("Error updating task completion:", err);
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    setEditingTaskId(task._id);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", priority: "medium" });
    setEditingTaskId(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Priority badge color logic
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="px-36  max-w-4xl mx-auto  mt-12  min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Just Todo It - the Nike of productivity 🏃‍♂️
      </motion.h1>

      {/* Form Card */}
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {editingTaskId ? "Edit Task" : "Create New Task"}
        </h2>
        <input
          type="text"
          placeholder="Task title"
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Task description (optional)"
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            Priority Level
          </label>
          <div className="flex gap-4">
            {["low", "medium", "high"].map((priority) => (
              <label
                key={priority}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={() => setFormData({ ...formData, priority })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <span className="capitalize text-gray-700">{priority}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-all font-medium"
            onClick={handleCreateOrUpdate}
          >
            {editingTaskId ? "Update Task" : "Add Task"}
          </button>
          {editingTaskId && (
            <button
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all text-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </motion.div>

      {/* Tasks List */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Tasks</h2>
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              No tasks found. Add one above to get started!
            </p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <motion.div
              key={task._id}
              className={`p-5 rounded-xl shadow-md transition-all bg-white border-l-4 ${
                task.completed
                  ? "border-l-gray-400 opacity-80"
                  : task.priority === "high"
                  ? "border-l-red-500"
                  : task.priority === "medium"
                  ? "border-l-yellow-500"
                  : "border-l-green-500"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        handleToggleComplete(task._id, task.completed)
                      }
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="sr-only">Mark as complete</span>
                  </label>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-xl font-medium text-gray-800 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`mt-1 text-gray-600 ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full ${
                        task.completed
                          ? "bg-gray-200 text-gray-700"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {task.completed ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-blue-600 p-2"
                    onClick={() => handleEdit(task)}
                    title="Edit task"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-600 p-2"
                    onClick={() => handleDelete(task._id)}
                    title="Delete task"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPage;
