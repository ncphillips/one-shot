import { Ref, ref, provide, inject } from "vue";

type Toaster = {
  toast: Ref<string | null>;
  showToast: (message: string) => void;
};

export function provideToaster() {
  const toaster: Toaster = {
    toast: ref<string | null>(null),
    showToast: (message: string) => {
      toaster.toast.value = message;
      setTimeout(() => {
        toaster.toast.value = null;
      }, 3000);
    },
  };

  provide("toaster", toaster);
}

export function useToaster(): Toaster {
  return inject("toaster") as {
    toast: Ref<string | null>;
    showToast: (message: string) => void;
  };
}
