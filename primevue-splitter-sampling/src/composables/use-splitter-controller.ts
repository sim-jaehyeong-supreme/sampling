import { computed, ComputedRef, InjectionKey, onUnmounted, ref, Ref, unref, watch } from "vue";

export type SplitterInjectionValue = {
    layout: ComputedRef<"horizontal" | "vertical">;
    gutterSize: ComputedRef<number>;
    gutterHoverSize: ComputedRef<number>;
    mountedPanelSize: Ref<number>;
    notifyMounted: () => void;
    isHovers: Ref<boolean[]>;
}

export const SplitterInjectionKey: InjectionKey<SplitterInjectionValue> = Symbol("Splitter");
export const GUTTER_CLASS_PREFIX = "gutter-";

export const useSplitterController = () => {
    const mountedPanelSize = ref<number>(0);
    const notifyMounted = () => {
        mountedPanelSize.value += 1;
    };
    const splitterRef = ref();
    const gutters = computed<HTMLDivElement[] | undefined>(() => splitterRef.value?.$refs.gutter)
    const isHovers = ref<boolean[]>([]);
    const isResizing = ref<boolean>(false);

    const handleGutterMouseEvent = (e: MouseEvent) => {
        if (e.target) {
            const gutter = e.target as HTMLDivElement;
            const index = (() => {
                let temp = Number(gutter.className.split(GUTTER_CLASS_PREFIX)[1])
                if (isNaN(temp)) {
                    temp = Number(gutter.parentElement?.className.split(GUTTER_CLASS_PREFIX)[1])
                }
                return temp;
            })();
            if (isNaN(index)) return;
            if (e.type === "mouseover") {
                isHovers.value[index] = true;
            } else if (e.type === "mouseleave") {
                if(unref(isResizing)) return;
                isHovers.value[index] = false;
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
                isHovers.value.push(false);
            })
            stop();
        }
    });

    watch(isResizing, () => {
        if (!isResizing.value) {
            isHovers.value.fill(false);
        }
    });

    // const isHovers = computed(() => {
    //     return isMouseovers.value.map((isMouseover) => (isMouseover || unref(isResizing)))
    // });

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
        gutters,
        isHovers,
        isResizing,
        // isHovers,
    };
}