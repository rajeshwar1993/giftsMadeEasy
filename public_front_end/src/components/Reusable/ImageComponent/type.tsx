export interface ImageComponentType {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | undefined;
  styleClasses?: string;
}
