<template>
    <div class="arrowWrap w-[2em] aspect-square center rounded-full cursor-pointer trans">
        <svg class="icon h-[60%] aspect-square" viewBox="0 0 1024 1024">
            <path
                d="M801.548285 510.271032L301.254151 1010.360574c-18.242732 18.242732-47.73799 18.106338-65.844327-0.306887a47.226511 47.226511 0 0 1 0.272788-66.389904l433.358652-433.154061L235.784908 80.356335A47.192413 47.192413 0 0 1 235.307528 13.966431 46.30585 46.30585 0 0 1 301.151856 13.454952l500.396429 496.81608z">
            </path>
        </svg>
    </div>
</template>
<style scoped>
.arrowWrap {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgba(163, 163, 163, 0.408);
}
@media (prefers-color-scheme: dark) {
    .arrowWrap {
        background-color: rgb(38 38 38);
    }
}
path {
    fill: rgb(219, 219, 219)
}
@media (prefers-color-scheme: dark) {
    path {
        fill: rgb(183, 183, 183);
    }
}
</style>