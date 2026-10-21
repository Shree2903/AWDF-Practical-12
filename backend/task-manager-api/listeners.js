
const taskEvents = require("./events");

// Handle task-created events asynchronously
taskEvents.on("task-created", (task) => {
  setTimeout(() => {
    try {
      console.log("[Notification] New task created");
      console.log("Task Title:", task.title);
      console.log("Assigned User:", task.user);
      console.log("Notification Timestamp:", new Date().toISOString());
      console.log("------------------------------------");
    } catch (error) {
      taskEvents.emit("error", error);
    }
  }, 1000);
});

// Handle task-deleted events
taskEvents.on("task-deleted", (task) => {
  console.log("[Notification] Task deleted");
  console.log("Task Title:", task.title);
  console.log("Assigned User:", task.user);
  console.log("Timestamp:", new Date().toISOString());
  console.log("------------------------------------");
});

// Handle errors from event handlers
taskEvents.on("error", (error) => {
  console.error("[Event Handler Error]", error.message);
});
