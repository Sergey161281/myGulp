import {deleteAsync, deleteSync} from "del";

export const reset = () => {
  return deleteAsync(app.path.clean);
}
