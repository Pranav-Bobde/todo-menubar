import { InjectionKey } from "vue";

const handleEditDoneKey: InjectionKey<(id: string, newTitle: string) => void> =
  Symbol("handleEditDone");


export {
    handleEditDoneKey,
};
