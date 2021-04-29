import { register } from "ts-node";
import { BaseOptions } from "./types";

export function useTypescriptResolver(options: BaseOptions) {
  return register({
    project: options.project,
  });
}
