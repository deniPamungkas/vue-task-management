<script setup>
import InputTask from '@/components/inputTask.vue';
import Sidebar from '@/components/sidebar.vue';
import TaskCard from '@/components/taskCard.vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useTaskStore } from '@/store/taskStore';
import { CirclePlus } from 'lucide-vue-next';

const taskStore = useTaskStore()


</script>
<template>
    <section class="p-3 grid grid-cols-1 md:grid-cols-4 gap-3 h-[100vh]">
        <Sidebar />
        <div class="flex flex-col gap-y-2 md:col-span-3">
            <nav class="h-[50px] bg-gray-700 rounded-lg flex justify-between items-center px-3">
                <h1 class="text-sm md:text-lg font-semibold text-white">All tasks</h1>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button variant="ghost" class="hover:bg-gray-700">
                            <CirclePlus class="text-white" />
                        </Button>
                    </DialogTrigger>
                    <InputTask />
                </Dialog>
            </nav>
            <div class="h-full rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <TaskCard v-for="task of taskStore.task" :title="task.title" :description="task.description"
                    :subtask="task.subtask" :status="task.status" :task-id="task.id" :done="task.done" />
            </div>
        </div>
    </section>
</template>
<style></style>