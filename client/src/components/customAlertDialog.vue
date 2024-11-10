<script setup>
import { computed } from 'vue';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

const props = defineProps({
    handleDeleteTask: Function,
    handleDoneTask: Function
})

const actionHandler = computed(() => {
    return props.handleDeleteTask || props.handleDoneTask
})

</script>
<template>
    <AlertDialogContent class="bg-gray-800 text-white font-delius">
        <AlertDialogHeader>
            <AlertDialogTitle v-if="props.handleDeleteTask">Are you absolutely sure to delete this task?
            </AlertDialogTitle>
            <AlertDialogTitle v-else>Are you absolutely sure to mark this task to done task?</AlertDialogTitle>
            <AlertDialogDescription v-if="props.handleDeleteTask">
                Delete cannot be undone. This will permanently delete your
                task.
            </AlertDialogDescription>
            <AlertDialogDescription v-else>
                By clicking continue, you mark this task to done task.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel class="text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction @click="actionHandler">Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</template>