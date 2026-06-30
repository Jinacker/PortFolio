declare module "react-scrollama" {
  import type { ReactElement, ReactNode } from "react";

  export interface ScrollamaEvent<T = unknown> {
    element: HTMLElement;
    data: T;
    direction: "up" | "down";
    entry: IntersectionObserverEntry;
    progress?: number;
  }

  interface ScrollamaProps<T = unknown> {
    children: ReactNode;
    offset?: number | string;
    threshold?: number;
    onStepEnter?: (event: ScrollamaEvent<T>) => void;
    onStepExit?: (event: ScrollamaEvent<T>) => void;
    onStepProgress?: (event: ScrollamaEvent<T>) => void;
    debug?: boolean;
  }

  interface StepProps<T = unknown> {
    children: ReactElement;
    data: T;
  }

  export function Scrollama<T = unknown>(props: ScrollamaProps<T>): ReactElement;
  export function Step<T = unknown>(props: StepProps<T>): ReactElement;
}
