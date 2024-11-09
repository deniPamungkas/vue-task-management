<script setup>
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

const props = defineProps({
    handleDeleteTask: Function
})

</script>
<template>
    <AlertDialogContent class="bg-gray-800 text-white">
        <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure to delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
                Delete cannot be undone. This will permanently delete your
                task.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel class="text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction @click="props.handleDeleteTask">Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</template>