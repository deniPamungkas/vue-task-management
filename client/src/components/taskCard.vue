<script setup>
import { Check, ChevronsUpDown, CircleCheckBig, CircleX, Ellipsis, Pencil, Trash2 } from 'lucide-vue-next';
import { Separator } from './ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ref } from 'vue';
import { Button } from './ui/button';
import { useTaskStore } from '@/store/taskStore';
import { watch } from 'vue';
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog';
import CustomAlertDialog from './customAlertDialog.vue';
import { useToast } from './ui/toast/use-toast';

const props = defineProps({
    title: String,
    description: String,
    subtask: Array,
    status: String,
    taskId: Number,
    done: Boolean,
    priority: String

})

const taskStore = useTaskStore()

const status = ref('')

const isOpen = ref(false)

const { toast } = useToast()

watch(status, () => {
    taskStore.task.find(task => task.id == props.taskId).status = status.value
    toast({
        description: 'Task status has been changed to ' + status.value + ".",
    })
})

const handleDeleteTask = () => {
    taskStore.deleteTask(props.taskId)
    toast({
        description: 'Task deleted.',
    })
}

const handleDeleteSubTask = (subtaskId) => {
    taskStore.deleteSubTask(subtaskId, props.taskId)
    toast({
        description: 'Subtask deleted.',
    })
}

const handleCheckSubTask = (subtaskId) => {
    taskStore.checkSubTask(subtaskId, props.taskId)
}

const handleDoneTask = () => {
    taskStore.doneTask(props.taskId)
    console.log('first')
    toast({
        description: 'Your task has marked done.',
    })
}

</script>
<template>
    <div class="max-h-min break-inside-avoid p-3 rounded-lg border-gray-700 border-2 flex flex-col gap-3 transition-all duration-1000"
        :class="props.priority == 'urgent' ? 'bg-red-950' : props.priority == 'medium' ? 'bg-yellow-950' : 'bg-blue-950'">
        <div class="w-full flex">
            <div class="w-full">
                <h3 class="font-bold text-xs md:text-sm text-white">{{ props.title }}</h3>
                <p class="text-[10px] md:text-xs text-slate-100">{{ props.description }}</p>
            </div>
            <div class="flex flex-col justify-start items-start text-white hover:bg-gray-900 h-[20px] rounded-sm">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56 bg-gray-800 text-white">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger
                                    class="data-[highlighted]:bg-gray-700 data-[highlighted]:text-white data-[state=open]:bg-gray-700">
                                    <span>Change task status</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent class="bg-gray-800 text-white">
                                        <DropdownMenuItem @click="status = 'on progress'"
                                            class="data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">
                                            <span>On Progress</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem @click="status = 'completed'"
                                            class="data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">
                                            <span>Completed</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem @click="status = 'not started'"
                                            class="data-[highlighted]:bg-gray-700 data-[highlighted]:text-white">
                                            <span>Not Started</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <Separator v-if="props.subtask.length != 0" />
        <!-- <div class="w-full flex flex-col gap-1">
            <div class="flex w-full justify-between items-center">
                <h3 class="text-sm text-white font-semibold">Task Progress</h3>
                <span class="text-sm text-white font-semibold">50%</span>
            </div>
            <Progress class="h-[7px]" />
        </div> -->
        <Collapsible v-if="props.subtask.length != 0" v-model:open="isOpen" class="w-full text-white space-y-2">
            <div class="flex items-center justify-between ">
                <h4 class="text-xs md:text-sm font-semibold">
                    SUB-TASKS : {{ props.subtask.length }}
                </h4>
                <CollapsibleTrigger as-child>
                    <Button variant="ghost" size="sm" class="w-9 p-0 hover:bg-gray-700 hover:text-white">
                        <ChevronsUpDown class="h-4 w-4" />
                        <span class="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent class="space-y-2">
                <div v-for="subtask of props.subtask"
                    class="rounded-md px-2 h-[50px] bg-gray-700 text-xs md:text-sm flex justify-between items-center">
                    <span class="text-[9px] md:text-[11px]" :class="subtask.checked ? 'line-through' : ''">{{
                        subtask.value }}</span>
                    <div class="flex justify-center items-center gap-2">
                        <Button variant="ghost" class="p-0 hover:bg-gray-800" @click="handleCheckSubTask(subtask.id)">
                            <CircleCheckBig :size="16" class="text-green-600" />
                        </Button>
                        <Button variant="ghost" class="p-0 hover:bg-gray-800" @click="handleDeleteSubTask(subtask.id)">
                            <Trash2 :size="16" class="text-red-600" />
                        </Button>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
        <Separator />
        <div class="w-full flex justify-between items-center">
            <div class="h-[33px] bg-gradient-to-r px-3 rounded-lg border text-[10px] md:text-xs font-semibold text-white flex justify-between items-center gap-3"
                :class="props.status == 'not started' ? 'from-slate-600 to-slate-500' : props.status == 'on progress' ? 'from-yellow-600 to-yellow-500' : 'from-green-600 to-green-500'">
                <span>{{ props.status }}</span>
            </div>
        </div>
        <Separator />
        <div class="w-full h-[30px] flex justify-between items-center">
            <div class="h-full flex justify-center items-center gap-x-3">
                <AlertDialog>
                    <AlertDialogTrigger as-child>
                        <Button variant="ghost"
                            class="h-full w-[30px] flex justify-center items-center hover:bg-gray-900 rounded-full">
                            <CircleX class=" text-red-600" size="20px" />
                        </Button>
                    </AlertDialogTrigger>
                    <CustomAlertDialog :handle-delete-task="handleDeleteTask" />
                </AlertDialog>
                <!-- <div class="h-full w-[30px] flex justify-center items-center hover:bg-gray-900 rounded-full">
                    <Pencil class="text-yellow-600" size="18px" />
                </div> -->
            </div>
            <AlertDialog>
                <AlertDialogTrigger as-child>
                    <Button variant="ghost"
                        class="h-full w-[30px] flex justify-center items-center hover:bg-gray-900 rounded-full">
                        <Check class="text-green-600" size="20px" />
                    </Button>
                </AlertDialogTrigger>
                <CustomAlertDialog :handle-done-task="handleDoneTask" />
            </AlertDialog>
        </div>
    </div>
</template>
<style></style>