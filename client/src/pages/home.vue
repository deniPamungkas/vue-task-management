<script setup>
import InputTask from '@/components/inputTask.vue';
import Sidebar from '@/components/sidebar.vue';
import TaskCard from '@/components/taskCard.vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useTaskStore } from '@/store/taskStore';
import { CirclePlus } from 'lucide-vue-next';
import { ref } from 'vue';

const taskStore = useTaskStore()


</script>
<template>
    <section class="p-3 grid grid-cols-4 gap-3">
        <Sidebar />
        <div class="flex flex-col gap-y-2 col-span-3">
            <nav class="h-[50px] bg-gray-700 rounded-lg flex justify-between items-center px-3">
                <h1 class="text-lg font-semibold text-white">All tasks</h1>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button variant="ghost" class="hover:bg-gray-700">
                            <CirclePlus class="text-white" />
                        </Button>
                    </DialogTrigger>
                    <InputTask />
                </Dialog>
            </nav>
            <div class="h-full rounded-lg grid grid-cols-3 gap-3">
                <TaskCard v-for="task of taskStore.task" :title="task.title" :description="task.description"
                    :subtask="task.subtask" :status="task.status" :task-id="task.id" />
            </div>
        </div>
    </section>
</template>
<style></style>