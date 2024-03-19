import { ref } from "vue"
import { useId } from "@/composables/use-id";
import { EditFormTarget } from "@/composables/use-edit-form";

export type Data = {
    id: string;
    title: string;
    targetValue: number;
    condition?: Condition;
};

export type ConditionType = "customer" | "product" | "service";

export type Condition = {
    type: ConditionType;
    conditionValues: ConditionValue[];
};

export type ConditionValue = ConditionValueInput
| ConditionValueRangeInput
| ConditionValueSelect
| ConditionValueCheckbox
| ConditionValueRadio
;

export type ConditionValueInputType = "input" | "rangeInput" | "select" | "checkbox" | "radio";


export type ConditionValueInput = {
    inputType: "input";
    position: number;
    key: string;
    labels: {
        title?: string;
        input?: string;
    };
    value: string;
};

export type ConditionValueRangeInput = {
    inputType: "rangeInput";
    position: number;
    key: {
        begin: string;
        end: string;
    };
    labels: {
        title: string;
        begin: string;
        end: string;
    };
    value: {
        begin: string;
        end: string;
    };
};

export type Option = {
    label: string;
    value: string;
}

export type ConditionValueSelect = {
    inputType: "select";
    position: number;
    key: string;
    options: Option[];
    labels: {
        title: string;
        select: string;
    };
    value: string;
};

export type ConditionValueCheckbox = {
    inputType: "checkbox";
    position: number;
    key: string;
    options: Option[];
    labels: {
        title: string;
        checkbox: string;
    };
    value: string[];
};

export type ConditionValueRadio = {
    inputType: "radio";
    position: number;
    key: string;
    options: Option[];
    labels: {
        title: string;
        radio: string;
    };
    value: string;
};


export const useAutoLayoutController = () => {
    const { generate } = useId();
    const data = ref<Data[]>([{
        id: generate(),
        title: "",
        targetValue: 0,
        condition: undefined
    }]);


    const addItem = () => {
        data.value.push({
            id: generate(),
            title: "",
            targetValue: 0,
            condition: undefined
        });
    };

    const updateData = <K extends keyof Data>(idx: number, key: K, value: Data[K]) => {
        data.value[idx][key] = value;
    }

    const visibleEditForm = ref<boolean>(false);
    const editFormTarget = ref<EditFormTarget | undefined>(undefined);

    const openEditForm = (type: ConditionType, currentData: Data) => {
        if (editFormTarget.value) {
            // clear
            closeEditForm();
        }
        visibleEditForm.value = true;
        editFormTarget.value = {
            type,
            currentData
        };
    }

    const closeEditForm = () => {
        visibleEditForm.value = false;
        editFormTarget.value = undefined;
    }

    return { data, addItem, updateData, editFormTarget, openEditForm, closeEditForm, visibleEditForm };
};