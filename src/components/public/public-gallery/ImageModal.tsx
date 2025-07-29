import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ImageModalProps {
  image: {
    id: string;
    src: string;
    title: string;
    date: string;
    location: string;
    category: string;
    description: string;
    albumImageCount: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full p-0 bg-primary">
        <DialogTitle className="sr-only">{image.title}</DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 95vw, 90vw"
            style={{ 
              filter: 'none',
              imageRendering: 'auto'
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 