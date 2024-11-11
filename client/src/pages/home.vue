<script setup>
import InputTask from '@/components/inputTask.vue';
import Sidebar from '@/components/sidebar.vue';
import TaskCard from '@/components/taskCard.vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/toast';
import { useTaskFilterStore, useTaskStore } from '@/store/taskStore';
import { CirclePlus } from 'lucide-vue-next';
import { computed } from 'vue';

const taskStore = useTaskStore()
const taskFilterStore = useTaskFilterStore()

const filter = (status) => {
    let fil;
    switch (status) {
        case 'On Progress task':
            fil = 'on progress'
            break;
        case 'Not started task':
            fil = 'not started'
            break;
        case 'Completed task':
            fil = 'completed'
            break;
        case 'All Tasks':
            fil = 'all'
            break;
        case 'Task done':
            fil = 'done'
        default:
            break;
    }
    return fil
}

const filteredTask = computed(() =>
    taskStore.task.filter((task) => {
        if (filter(taskFilterStore.filter) != 'done') {
            return task.status == filter(taskFilterStore.filter) && task.done == false
        } else {
            return task.done == true
        }
    }))
</script>
<template>
    <section class="p-3 grid grid-cols-1 md:grid-cols-4 gap-3 min-h-[100vh] font-delius">
        <Sidebar />
        <div class="flex flex-col gap-y-2 md:col-span-3">
            <nav class="h-[50px] bg-gray-700 rounded-lg flex justify-between items-center px-3">
                <div class="block md:hidden">
                    <Select v-model="taskFilterStore.filter">
                        <SelectTrigger class="w-[100px] h-[30px] text-white bg-gray-600">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent class="bg-gray-600 text-white">
                            <SelectItem value="All Tasks">
                                All Tasks
                            </SelectItem>
                            <SelectItem value="On Progress task">
                                On Progress task
                            </SelectItem>
                            <SelectItem value="Not started task">
                                Not started task
                            </SelectItem>
                            <SelectItem value="Completed task">
                                Completed task
                            </SelectItem>
                            <SelectItem value="Task done">
                                Task done
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <h1 class="text-sm md:text-lg font-semibold text-white">{{ taskFilterStore.filter }}</h1>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button variant="ghost" class="hover:bg-gray-700">
                            <CirclePlus class="text-white" />
                        </Button>
                    </DialogTrigger>
                    <InputTask />
                </Dialog>
            </nav>
            <div v-if="taskStore.task.length != 0" class="rounded-lg transition-all duration-1000"
                :class="taskStore.task.length != 0 && filteredTask.length == 0 && taskFilterStore.filter != 'All Tasks' ? 'h-full flex justify-center items-center' : 'columns-1 md:columns-2 lg:columns-3 space-y-5'">
                <TaskCard v-if="filter(taskFilterStore.filter) == 'all'" v-for="task of taskStore.task"
                    :title="task.title" :description="task.description" :subtask="task.subtask" :status="task.status"
                    :task-id="task.id" :done="task.done" :priority="task.priority" :completed-at="task.completedAt" />

                <TaskCard v-else-if="filteredTask.length != 0" v-for="task of filteredTask" :title="task.title"
                    :description="task.description" :subtask="task.subtask" :status="task.status" :task-id="task.id"
                    :done="task.done" :priority="task.priority" :completed-at="task.completedAt" />

                <div v-else
                    class="border-2 border-dashed rounded-md border-gray-700 flex flex-col space-y-3 justify-center items-center p-10">
                    <p class="text-white text-xs md:text-sm">You dont have any {{ taskFilterStore.filter }}</p>
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="secondary" class="text-xs md:text-sm">Create task</Button>
                        </DialogTrigger>
                        <InputTask />
                    </Dialog>
                </div>
            </div>
            <div v-else class="h-full flex justify-center items-center">
                <div
                    class="flex flex-col justify-center items-center space-y-3 border-2 border-dashed border-gray-700 p-10 rounded-md">
                    <p class="text-white text-xs md:text-sm">You dont have any task. Create new task here</p>
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="secondary" class="text-xs md:text-sm">Create task</Button>
                        </DialogTrigger>
                        <InputTask />
                    </Dialog>
                </div>
            </div>
        </div>
        <Toaster />
    </section>
</template>
<style></style>