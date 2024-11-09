<script setup>
import { CircleMinus, CirclePlus } from 'lucide-vue-next';
import { Button } from './ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { priority } from '@/assets/constant';
import { Separator } from './ui/separator';
import { ref, watch } from 'vue';
import { useTaskStore } from '@/store/taskStore';


const taskStore = useTaskStore()

const subTasks = ref([])

const formData = {
    id: Date.now(),
    title: '',
    description: '',
    priority: '',
    status: 'not started',
    done: false
}

const addSubTask = () => {
    const newSubTask = { id: Date.now(), value: '', checked: false }
    subTasks.value.push(newSubTask)
}

const removeSubTask = (e) => {
    subTasks.value.splice(subTasks.value.indexOf(e), 1)
}

const handleSubmit = async () => {
    const newTask = {
        ...formData,
        subtask: subTasks.value.map(subtask => ({ ...subtask }))
    }
    taskStore.addTask(newTask)
    formData.id = Date.now()
    formData.title = ''
    formData.description = ''
    formData.subtask = ''
    subTasks.value = []

}

</script>
<template>
    <DialogContent class="max-w-[300px] sm:max-w-[425px] md:max-w-[600px] bg-gray-800 text-white">
        <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription class="text-slate-200 ">
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <form action="" @submit.prevent="handleSubmit" class="flex flex-col gap-y-5">
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <Label for="name" class="text-left">
                        Title
                    </Label>
                    <Input id="name" class="h-[30px] outline-none bg-gray-700 border-none" v-model="formData.title"
                        required />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="description" class="text-left">
                        Description
                    </Label>
                    <Textarea class="bg-gray-700 border-none" id="description" v-model="formData.description" />
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex justify-start items-center gap-5 ">
                        <Label for="subtask" class="text-left">
                            Add Subtask
                        </Label>
                        <CirclePlus size="16px" @click="addSubTask" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <div v-for="subtask of subTasks" class="flex items-center gap-2">
                            <Input v-model="subtask.value" class="bg-gray-700 border-none h-[30px] text-whited"
                                required />
                            <CircleMinus size="16px" @click="removeSubTask(subtask)" />
                        </div>
                    </div>
                </div>
                <Separator />
                <div class="flex flex-col gap-2">
                    <Label for="priority" class="text-left">
                        Priority
                    </Label>
                    <Select v-model="formData.priority" required>
                        <SelectTrigger class="w-[100px] md:w-[130px] bg-gray-700">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent class="bg-gray-700 text-white">
                            <SelectGroup>
                                <SelectLabel>Priority</SelectLabel>
                                <SelectItem v-for="prior of priority" :value="prior.value"
                                    class="data-[highlighted]:bg-gray-600 data-[highlighted]:text-white">
                                    {{ prior.label }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">
                    Create
                </Button>
            </DialogFooter>
        </form>
    </DialogContent>
</template>
<style></style>