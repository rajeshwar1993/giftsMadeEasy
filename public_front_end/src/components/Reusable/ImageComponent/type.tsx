export interface ImageComponentType {
  src: string;
  alt: string;
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | undefined;
  styleClasses?: string;
}
