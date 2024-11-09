<script setup>
import { sideMenu } from '@/assets/constant';
import { ChevronRight } from 'lucide-vue-next';

</script>
<template>
    <section class="border-2 border-gray-700 h-[100vh] rounded-lg p-2 flex flex-col justify-between">
        <div class="w-full h-[60px] rounded-lg bg-gray-800 flex items-center justify-start text-white p-5">
            <h1 class="text-2xl font-semibold">Tabs</h1>
        </div>
        <div class="w-full flex flex-col gap-2">
            <RouterLink v-for="side of sideMenu" :to="side.path"
                class="w-full h-[50px] bg-gray-800 p-5 flex items-center justify-between rounded-lg text-white cursor-pointer group transition">
                <span>{{ side.label }}</span>
                <ChevronRight class="transform transition-transform duration-200 group-hover:translate-x-2" />
            </RouterLink>
        </div>
        <div class="w-full">
            <li class="w-full h-[50px] bg-gray-800 p-5 flex items-center justify-between rounded-lg text-white">
                Logout
            </li>
        </div>
    </section>
</template>
<style></style>