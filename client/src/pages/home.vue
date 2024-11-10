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
    let fil
    switch (status) {
        case 'On Progress task':
            fil = 'on progress'
            break;
        case 'Not started task':
            fil = 'not started'
            break;
        case 'Task done':
            fil = 'completed'
            break;
        case 'All Tasks':
            fil = 'all'
            break;

        default:
            break;
    }
    return fil
}

const filteredTask = computed(() => taskStore.task.filter((task) => {
    return task.status == filter(taskFilterStore.filter)
}))

console.log(filter(taskFilterStore.filter))

</script>
<template>
    <section class="p-3 grid grid-cols-1 md:grid-cols-4 gap-3 min-h-[100vh]">
        <Sidebar />
        <div class="flex flex-col gap-y-2 md:col-span-3">
            <nav class="h-[50px] bg-gray-700 rounded-lg flex justify-between items-center px-3">
                <div class="block md:hidden">
                    <Select v-model="taskFilterStore.filter">
                        <SelectTrigger class="w-[100px] h-[30px] text-white bg-gray-600">
                            <SelectValue :placeholder="taskFilterStore.filter" />
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
            <div class="rounded-lg columns-1 md:columns-2 lg:columns-3 space-y-5 transition-all duration-1000">
                <TaskCard v-if="filter(taskFilterStore.filter) == 'all'" v-for="task of taskStore.task"
                    :title="task.title" :description="task.description" :subtask="task.subtask" :status="task.status"
                    :task-id="task.id" :done="task.done" :priority="task.priority" />

                <TaskCard v-else v-for="task of filteredTask" :title="task.title" :description="task.description"
                    :subtask="task.subtask" :status="task.status" :task-id="task.id" :done="task.done"
                    :priority="task.priority" />
            </div>
        </div>
        <Toaster />
    </section>
</template>
<style></style>