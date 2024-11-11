<script setup>
import { sideMenu } from '@/assets/constant';
import { useTaskFilterStore } from '@/store/taskStore';
import { ChevronRight } from 'lucide-vue-next';

const taskFilterStore = useTaskFilterStore()

const changeFilter = (e) => {
    taskFilterStore.changeFilter(e)
}

</script>
<template>
    <section class="border-2 border-gray-700 h-[100vh] rounded-lg p-2 md:flex flex-col justify-between hidden">
        <div class="w-full h-[60px] rounded-lg bg-gray-800 flex items-center justify-start text-white p-5">
            <h1 class="text-2xl font-semibold">Tabs</h1>
        </div>
        <div class="w-full flex flex-col gap-2">
            <div v-for="side of sideMenu" @click="changeFilter(side.label)"
                class="w-full h-[50px] bg-gray-800 p-5 flex items-center justify-between rounded-lg text-white cursor-pointer group transition">
                <span>{{ side.label }}</span>
                <ChevronRight class="transform transition-transform duration-200 group-hover:translate-x-2" />
            </div>
        </div>
        <div class="flex flex-col gap-y-3 text-white text-xs">
            <div class="flex gap-x-2 items-center justify-start">
                <div class="p-[2px] rounded-[2px] bg-gradient-to-br from-red-500 to-red-900">
                    <div class="w-[13px] h-[13px] bg-gray-900 rounded-[2px]">

                    </div>
                </div>
                <p>Priority urgent</p>
            </div>
            <div class="flex gap-x-2 items-center justify-start">
                <div class="p-[2px] rounded-[2px] bg-gradient-to-br from-yellow-400 to-yellow-800">
                    <div class="w-[13px] h-[13px] bg-gray-900 rounded-[2px]">

                    </div>
                </div>
                <p>Priority medium</p>
            </div>
            <div class="flex gap-x-2 items-center justify-start">
                <div class="p-[2px] rounded-[2px] bg-gradient-to-br from-blue-500 to-blue-900">
                    <div class="w-[13px] h-[13px] bg-gray-900 rounded-[2px]">

                    </div>
                </div>
                <p>Priority later</p>
            </div>
        </div>
        <div class="w-full">
            <li class="w-full h-[50px] bg-gray-800 p-5 flex items-center justify-between rounded-lg text-white">
                Logout
            </li>
        </div>
    </section>
</template>
<style></style>