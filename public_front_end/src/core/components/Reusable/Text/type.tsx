export interface TextType {
  content: string;
  styleClasses?: string;
  wrapperStyleClasses?: string;
  tag?: keyof JSX.IntrinsicElements;
  wrapperTag?: keyof JSX.IntrinsicElements;
}
