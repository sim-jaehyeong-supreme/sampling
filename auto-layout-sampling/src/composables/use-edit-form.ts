import { Condition, ConditionType, ConditionValueInputType, Data } from "@/composables/use-auto-layout-controller";
import { ref } from "vue";

export type EditFormTarget = {
    type: ConditionType;
    currentData: Data;
};

const getInitCondition = (type: ConditionType): Condition => {
    switch (type) {
        case "customer": {
            return {
                type: type,
                conditionValues: [
                    {
                        inputType: "input",
                        position: 0,
                        key: "customer_title",
                        labels: {
                            title: "CUSTOMER TITLE",
                            input: "customer title input",
                        },
                        value: "",
                    },
                    {
                        inputType: "rangeInput",
                        position: 1,
                        key: {
                            begin: "customer_visit_begin",
                            end: "customer_visit_end",
                        },
                        labels: {
                            title: "CUSTOMER VISIT",
                            begin: "customer visit begin",
                            end: "customer visit end",
                        },
                        value: {
                            begin: "",
                            end: "",
                        }
                    },
                    {
                        inputType: "select",
                        position: 2,
                        key: "customer_type",
                        options: [
                            { label: "TEST", value: "test" },
                            { label: "Good Customer", value: "good_customer" },
                            { label: "Morning Visit", value: "morning_visit" },
                        ],
                        labels: {
                            title: "CUSTOMER TYPE",
                            select: "customer type select"
                        },
                        value: "",
                    },
                ],
            }
        }
        case "product": {
            return {
                type: type,
                conditionValues: [
                    {
                        inputType: "input",
                        position: 0,
                        key: "product_title",
                        labels: {
                            title: "Product TITLE",
                            input: "product title input",
                        },
                        value: "",
                    },
                    {
                        inputType: "rangeInput",
                        position: 1,
                        key: {
                            begin: "product_buy_begin",
                            end: "product_buy_end",
                        },
                        labels: {
                            title: "PRODUCT BUY",
                            begin: "product buy begin",
                            end: "product buy end",
                        },
                        value: {
                            begin: "",
                            end: "",
                        }
                    },
                    {
                        inputType: "checkbox",
                        position: 2,
                        key: "bought_product_type",
                        options: [
                            {
                                label: "Tomato",
                                value: "tomato",
                            },
                            {
                                label: "Orange",
                                value: "orange",
                            },
                            {
                                label: "Pen",
                                value: "pen",
                            },
                        ],
                        labels: {
                            title: "Bought Product Type",
                            checkbox: "bought product type checkbox",
                        },
                        value: [],
                    },
                    {
                        inputType: "radio",
                        position: 3,
                        key: "incoming_date",
                        options: [
                            { label: "月", value: "mon" },
                            { label: "火", value: "tue" },
                            { label: "水", value: "wed" },
                            { label: "木", value: "thu" },
                            { label: "金", value: "fri" },
                            { label: "土", value: "sat" },
                            { label: "日", value: "sun" },
                        ],
                        labels: {
                            title: "Incoming Date",
                            radio: "incoming date radio",
                        },
                        value: "",
                    },
                ],
            }
        }
        case "service": {
            return {
                type: type,
                conditionValues: [
                    {
                        inputType: "input",
                        position: 0,
                        key: "service_title",
                        labels: {
                            title: "service TITLE",
                            input: "service title input",
                        },
                        value: "",
                    },
                    {
                        inputType: "rangeInput",
                        position: 1,
                        key: {
                            begin: "service_buy_begin",
                            end: "service_buy_end",
                        },
                        labels: {
                            title: "service BUY",
                            begin: "service buy begin",
                            end: "service buy end",
                        },
                        value: {
                            begin: "",
                            end: "",
                        }
                    },
                    {
                        inputType: "checkbox",
                        position: 2,
                        key: "bought_service_type",
                        options: [
                            {
                                label: "Tomato",
                                value: "tomato",
                            },
                            {
                                label: "Orange",
                                value: "orange",
                            },
                            {
                                label: "Pen",
                                value: "pen",
                            },
                        ],
                        labels: {
                            title: "Bought service Type",
                            checkbox: "bought service type checkbox",
                        },
                        value: [],
                    },
                    {
                        inputType: "radio",
                        position: 3,
                        key: "incoming_date",
                        options: [
                            { label: "月", value: "mon" },
                            { label: "火", value: "tue" },
                            { label: "水", value: "wed" },
                            { label: "木", value: "thu" },
                            { label: "金", value: "fri" },
                            { label: "土", value: "sat" },
                            { label: "日", value: "sun" },
                        ],
                        labels: {
                            title: "Incoming Date",
                            radio: "incoming date radio",
                        },
                        value: "",
                    },
                ],
            }
        }
    }
}

export const useEditForm = (target: EditFormTarget) => {
    const editCondition = ref<Condition>(
        target.currentData.condition ?? getInitCondition(target.type)
    );

    const updateValue = <IT extends ConditionValueInputType>(inputType: IT, position: number, key:
        {
            input: string;
            rangeInput: {
                begin: string;
                end: string;
            };
            select: string;
            checkbox: string;
            radio: string;
        }[IT], value: {
            input: string;
            rangeInput: {
                begin: string;
                end: string;
            };
            select: string;
            checkbox: string[];
            radio: string;
        }[IT]) => {
            console.log("updateValue", inputType, position, key, value);
        if (editCondition.value.conditionValues[position].key === key && editCondition.value.conditionValues[position].inputType === inputType) {
            editCondition.value.conditionValues[position].value = value;
        }
    }

    return {
        editCondition,
        updateValue,
    };
}