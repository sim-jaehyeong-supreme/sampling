import { computed, ComputedRef, InjectionKey, onUnmounted, ref, Ref, unref, watch } from "vue";

export type SplitterInjectionValue = {
    layout: ComputedRef<"horizontal" | "vertical">;
    gutterSize: ComputedRef<number>;
    gutterHoverSize: ComputedRef<number>;
    mountedPanelSize: Ref<number>;
    notifyMounted: () => void;
}

export const SplitterInjectionKey: InjectionKey<SplitterInjectionValue> = Symbol("Splitter");
const GUTTER_CLASS_PREFIX = "gutter-";

export const useSplitterController = () => {
    const mountedPanelSize = ref<number>(0);
    const notifyMounted = () => {
        mountedPanelSize.value += 1;
    };
    const splitterRef = ref();
    const gutters = computed<HTMLDivElement[] | undefined>(() => splitterRef.value?.$refs.gutter)
    const isMouseovers = ref<boolean[]>([]);
    const isResizing = ref<boolean>(false);

    const handleGutterMouseEvent = (e: MouseEvent) => {
        if (e.target) {
            const gutter = e.target as HTMLDivElement;
            const index = Number(gutter.className.split(GUTTER_CLASS_PREFIX)[1]);
            if (isNaN(index)) return;
            if (e.type === "mouseover") {
                isMouseovers.value[index] = true;
            } else {
                isMouseovers.value[index] = false;
            }
        }
    };

    const stop = watch(gutters, () => {
        if (gutters.value && mountedPanelSize.value - 1 === gutters.value.length) {
            /** mouseover, mouseleave addeventlistener */
            gutters.value.forEach((gutter, index) => {
                gutter.classList.add(`${GUTTER_CLASS_PREFIX}${index}`);
                gutter.addEventListener("mouseover", handleGutterMouseEvent);
                gutter.addEventListener("mouseleave", handleGutterMouseEvent);
                isMouseovers.value.push(false);
            })
            stop();
        }
    });

    const isHovers = computed(() => {
        return isMouseovers.value.map((isMouseover) => isMouseover || unref(isResizing))
    });

    onUnmounted(() => {
        if (gutters.value && mountedPanelSize.value - 1 === gutters.value.length) {
            /** mouseover, mouseleave removeeventlistener */
            gutters.value.forEach((gutter) => {
                gutter.removeEventListener("mouseover", handleGutterMouseEvent, false);
                gutter.removeEventListener("mouseleave", handleGutterMouseEvent, false);
            })
        }
    })
    return {
        mountedPanelSize,
        notifyMounted,
        splitterRef,
        isMouseovers,
        isResizing,
        isHovers,
    };
}