import { defineStore } from "pinia";
import { ref } from "vue";
export const useTaskStore = defineStore("task", () => {
  const task = ref([]);
  const deleteTask = (e) => {
    // console.log(e);
    const deletedTask = task.value.filter((task) => {
      return task.id == e;
    });
    task.value.splice(task.value.indexOf(deletedTask[0]), 1);
    console.log(task.value);
  };
  const addTask = (e) => {
    console.log(task.value);
    task.value.push(e);
  };

  const deleteSubTask = (subtaskId, taskId) => {
    const taskIdOfDeletedSubTask = task.value.filter((task) => {
      return task.id == taskId;
    });
    const deletedSubtask = taskIdOfDeletedSubTask[0].subtask.filter(
      (subtask) => {
        return subtask.id == subtaskId;
      },
    );
    taskIdOfDeletedSubTask[0].subtask.splice(
      taskIdOfDeletedSubTask[0].subtask.indexOf(deletedSubtask[0]),
      1,
    );
  };

  const addSubTask = (taskId) => {
    const taskIdWhereNewSubTaskAdded = task.value.filter((task) => {
      return task.id == taskId;
    });
  };
  return { task, deleteTask, addTask, deleteSubTask, addSubTask };
});
