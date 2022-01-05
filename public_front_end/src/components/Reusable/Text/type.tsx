export interface TextType {
  content: string;
  styleClasses?: string;
  tag?: keyof JSX.IntrinsicElements;
}
