import { ref } from "vue";

/** https://stackoverflow.com/questions/36836011/checking-validity-of-string-literal-union-type-at-runtime */
/** 型推論のためのutil */
export const StringUnion = <UnionType extends string>(
    ...values: UnionType[]
  ) => {
    Object.freeze(values);
    const valueSet: Set<string> = new Set(values);
  
    const guard = (value: string): value is UnionType => {
      return valueSet.has(value);
    };
  
    const guardArr = (value: string[]): value is UnionType[] => {
      return value.every((v) => valueSet.has(v));
    };
  
    const check = (value: string): UnionType => {
      if (!guard(value)) {
        const actual = JSON.stringify(value);
        const expected = values.map((s) => JSON.stringify(s)).join(" | ");
        throw new TypeError(
          `Value '${actual}' is not assignable to type '${expected}'.`
        );
      }
      return value;
    };

    const checkArr = (value: string[]): UnionType[] => {
        if (!guardArr(value)) {
          const actual = JSON.stringify(value);
          const expected = values.map((s) => JSON.stringify(s)).join(" | ");
          throw new TypeError(
            `Value '${actual}' is not assignable to type '${expected}'.`
          );
        }
        return value;
      };
  
    const unionNamespace = { guard, guardArr, check, checkArr, values };
    return Object.freeze(
      unionNamespace as typeof unionNamespace & { type: UnionType }
    );
  };

export const isStringArray = (value: unknown[]) : value is Array<string> => {
return value.every((v) => typeof v === "string")
}
export const typeValues = StringUnion("inner", "louter", "router");
export type TypeValue = typeof typeValues.type;

export const activeMonthValues = StringUnion("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
export type ActiveMonthValue = typeof activeMonthValues.type;

export type FormData = {
    title: string;
    count: number;
    type: TypeValue;
    activeMonth: ActiveMonthValue[];
};

export const useFormData = () => {
    const formData = ref<FormData>({
        title: "",
        count: 0,
        type: "inner",
        activeMonth: [],
    });

    const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        formData.value[key] = value;
    }

    return {
        formData,
        updateFormData,
    }
}