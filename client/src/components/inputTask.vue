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
import { ref } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import { useToast } from './ui/toast/use-toast';


const taskStore = useTaskStore()

const subTasks = ref([])

const { toast } = useToast()

const formData = {
    id: Date.now(),
    title: '',
    description: '',
    priority: '',
    status: 'not started',
    done: false,
    completedAt: ''
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
    toast({
        description: 'New Task Successfully added.',
    })

}

</script>
<template>
    <DialogContent class="max-w-[320px] sm:max-w-[425px] md:max-w-[600px] bg-gray-800 text-white font-delius">
        <DialogHeader>
            <DialogTitle class="text-sm md:text-base">New Task</DialogTitle>
            <DialogDescription class="text-slate-200 text-xs md:text-sm">
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <form action="" @submit.prevent="handleSubmit" class="flex flex-col gap-y-5 text-xs max-lg:text-sm">
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <Label for="name" class="text-left text-xs md:text-sm">
                        Title
                    </Label>
                    <Input id="name" class="h-[25px] md:h-[30px] outline-none bg-gray-700 border-none"
                        v-model="formData.title" required />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="description" class="text-left text-xs md:text-sm">
                        Description
                    </Label>
                    <Textarea class="bg-gray-700 border-none" id="description" v-model="formData.description" />
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex justify-start items-center gap-5 ">
                        <Label for="subtask" class="text-left text-xs md:text-sm">
                            Add Subtask
                        </Label>
                        <CirclePlus size="16px" @click="addSubTask" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <div v-for="subtask of subTasks" class="flex items-center gap-2">
                            <Input v-model="subtask.value"
                                class="bg-gray-700 border-none h-[30px] text-whited text-xs md:text-sm" required />
                            <CircleMinus size="16px" @click="removeSubTask(subtask)" />
                        </div>
                    </div>
                </div>
                <Separator />
                <div class="flex flex-col gap-2">
                    <Label for="priority" class="text-left text-xs md:text-sm">
                        Priority
                    </Label>
                    <Select v-model="formData.priority" required>
                        <SelectTrigger class="w-[100px] md:w-[130px] bg-gray-700 text-xs md:text-sm">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent class="bg-gray-700 text-white text-xs md:text-sm font-delius">
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
                <Button type="submit" class="text-xs md:text-sm">
                    Create
                </Button>
            </DialogFooter>
        </form>
    </DialogContent>
</template>
<style></style>