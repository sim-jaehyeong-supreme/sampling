<script setup>
import { ElSteps } from 'element-plus';
import { computed } from 'vue';

const props = defineProps({
    active: {
        type: Number,
        required: true,
    },
    direction: {
        type: String,
    },
    space: {
        type: String,
    },
    isCustom: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: "solid",
    },
    finishColor: {
        type: String,
        default: "#409eff",
    },
    processColor: {
        type: String,
        default: "#303133",
    },
    waitColor: {
        type: String,
        default: "#a8abb2",
    },
    iconSize: {
        type: String,
        default: "24px",
    },
});

const compEntireStyle = computed(() => {
    if (!props.isCustom) return {};

    if (props.type === 'solid') {
        return {
            '--finish-icon-border-color': props.finishColor,
            '--finish-icon-bg-color': props.finishColor,
            '--finish-icon-text-color': '#ffffff',
            '--process-icon-border-color': props.processColor,
            '--process-icon-bg-color': props.processColor,
            '--process-icon-text-color': '#ffffff',
            '--wait-icon-border-color': props.waitColor,
            '--wait-icon-bg-color': props.waitColor,
            '--wait-icon-text-color': '#ffffff',
            '--icon-width': props.iconSize,
            '--icon-height': props.iconSize,
            '--finish-text-color': props.finishColor,
            '--process-text-color': props.processColor,
            '--wait-text-color': props.waitColor,
        }
    } else if (props.type === 'outline') {
        return {
            '--finish-icon-border-color': props.finishColor,
            '--finish-icon-bg-color': '#ffffff',
            '--finish-icon-text-color': props.finishColor,
            '--process-icon-border-color': props.processColor,
            '--process-icon-bg-color': '#ffffff',
            '--process-icon-text-color': props.processColor,
            '--wait-icon-border-color': props.waitColor,
            '--wait-icon-bg-color': '#ffffff',
            '--wait-icon-text-color': props.waitColor,
            '--icon-width': props.iconSize,
            '--icon-height': props.iconSize,
            '--finish-text-color': props.finishColor,
            '--process-text-color': props.processColor,
            '--wait-text-color': props.waitColor,
        };
    }
    return {};
});

</script>

<template>
    <el-steps :class="isCustom ? `is-custom ${type}` : nulll" :active="active" :direction="direction"
    :space="space"
    :style="compEntireStyle"
    >
        <slot />
    </el-steps>

</template>

<style scoped lang="scss">
.solid,
.outline {
    ::v-deep(.el-step__head.is-finish ) {
        color: var(--finish-icon-text-color);
        border-color: var(--finish-icon-border-color);
        
        .el-step__icon.is-text {
            background-color: var(--finish-icon-bg-color);
        }
    }
    
    ::v-deep(.el-step__head.is-process ) {
        color: var(--process-icon-text-color);
        border-color: var(--process-icon-border-color);
        
        .el-step__icon.is-text {
            background-color: var(--process-icon-bg-color);
        }
    }

    ::v-deep(.el-step__head.is-wait ) {
        color: var(--wait-icon-text-color);
        border-color: var(--wait-icon-border-color);
        
        .el-step__icon.is-text {
            background-color: var(--wait-icon-bg-color);
        }
    }
}

.is-custom {
    ::v-deep(.el-step__icon) {
        width: var(--icon-width);
        height: var(--icon-height);
    }

    ::v-deep(.el-step__title.is-finish) {
        color: var(--finish-text-color);
    }

    ::v-deep(.el-step__title.is-process) {
        color: var(--process-text-color);
    }

    ::v-deep(.el-step__title.is-wait) {
        color: var(--wait-text-color);
    }
}

</style>
