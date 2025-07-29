import Image from 'next/image';
import { Calendar, MapPin, Camera, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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

const getFilenameFromSrc = (src: string) => src.split('/').pop() || 'download.jpg';

export function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Image Section - Top (Fixed Height) */}
          <div className="relative w-full h-[60vh] min-h-[400px] bg-black flex-shrink-0">
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Content Section - Bottom (Fixed Height) */}
          <div className="flex-shrink-0 bg-white p-6 h-[40vh] min-h-[300px] flex flex-col">
            <DialogHeader className="mb-4 flex-shrink-0">
              <DialogTitle className="text-2xl font-bold text-[var(--accent)] mb-4">
                {image.title}
              </DialogTitle>
              
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-[var(--primary)]"/>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Date</p>
                    <p className="text-gray-600 text-sm">{image.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[var(--secondary)]"/>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Location</p>
                    <p className="text-gray-600 text-sm">{image.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="h-5 w-5 text-[var(--accent)]"/>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Album</p>
                    <p className="text-gray-600 text-sm">{image.albumImageCount} photos</p>
                  </div>
                </div>
              </div>
            </DialogHeader>
            
            {/* Description - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed text-sm">{image.description}</p>
            </div>
            
            {/* Action Button - Fixed at bottom */}
            <div className="flex-shrink-0 pt-4 border-t border-gray-100">
              <a
                href={image.src}
                download={getFilenameFromSrc(image.src)}
                className="block"
              >
                <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download High Resolution Image
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 