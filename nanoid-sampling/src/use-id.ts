import { customAlphabet, customRandom } from "nanoid";
import { Ref, ref } from "vue";

const customNanoId = customAlphabet(
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    10
  );

type UseIdOptions = {
    random?: (seed: Ref<number>) => (bytes: number) => Uint8Array;
    seed?: Ref<number>;
  };
  
  const globalUseIdOptions: UseIdOptions = {
    random: undefined,
    seed: undefined,
  };

export const useId = (options?: UseIdOptions) => {
  const mergedOptions = {
    ...globalUseIdOptions,
    ...options,
  };
  const seed = mergedOptions.seed ?? ref(0);

  let random = customNanoId;
  if (mergedOptions?.random !== undefined) {
    random = customRandom(
      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      10,
      mergedOptions.random(seed)
    );
  }

  const generate = () => {
    seed.value += 1;
    return random();
  };

  return {
    generate,
  };
};