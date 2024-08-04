import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { franc } from "franc";
import { ReactNode, isValidElement, cloneElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectLang(node: ReactNode) {
  console.log(node);

  const text =
    typeof node === "string"
      ? node
      : Array.isArray(node)
      ? node.find((element) => typeof element === "string")
      : isValidElement(node)
      ? node.props.children?.toString()
      : null;
  return text ? franc(text, { minLength: 3, only: ["eng", "jpn"] }) : "eng";
}

export const getLength = (children: ReactNode): number => {
  if (typeof children === "string") {
    return children.length;
  } else if (isValidElement(children)) {
    return getLength(children.props.children);
  } else if (Array.isArray(children)) {
    return children.reduce((acc, child) => acc + getLength(child), 0);
  } else {
    return 0;
  }
};

export const sliceChildren = (
  children: ReactNode,
  length: number
): ReactNode => {
  if (typeof children === "string") {
    return children.slice(
      0,
      children.length > length ? length : children.length
    );
  } else if (isValidElement(children)) {
    return cloneElement(
      children,
      children.props,
      sliceChildren(children.props.children, length)
    );
  } else if (Array.isArray(children)) {
    let remainingLength = length;
    return children.map((child) => {
      if (remainingLength <= 0) return null;
      const returnedChildren = sliceChildren(child, remainingLength);
      remainingLength -= getLength(returnedChildren);
      return returnedChildren;
    });
  }
};

export type Language = "en" | "ja";
