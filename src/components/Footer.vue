<template>
    <footer class="footer sm:footer-horizontal bg-base-300 text-neutral-600 items-center p-4">
        <aside class="ms-2 grid-flow-col items-center">
            <i class="fa-solid fa-shop fa-2x text-primary/80"></i>
            <p>Copyright © 2025 - Mi tienda</p>
        </aside>
        <nav class="grid-flow-col me-2 gap-4 sm:place-self-center sm:justify-self-end">
            <a>
                <i class="fa-brands fa-facebook fa-xl"></i>
            </a>
            <a>
                <i class="fa-brands fa-twitter fa-xl"></i>
            </a>
            <a href="">
                <i class="fa-brands fa-instagram fa-xl"></i>
            </a>
            <a href="">
                <i class="fa-brands fa-tiktok fa-xl"></i>
            </a>
        </nav>
    </footer>
</template>
<script setup>
</script>
<style scoped>
i {
    transition: all 0.5s ease
}
i:hover {
    color: var(--color-primary);
    scale: 1.2
}
</style>