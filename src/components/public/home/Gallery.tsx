import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const Gallery = () => {
  // Images from public/images folder
  const imagesFromImages = [
    '/images/t1.jpg',
    '/images/t2.jpg',
    '/images/t3.jpg',
    '/images/t4.jpg',
    '/images/t5.jpg',
    '/images/t6.jpg',
    '/images/t7.jpg',
    '/images/t8.jpg',
    '/images/t9.jpg',
    '/images/t10.jpg',
    '/images/t11.jpg',
    '/images/t12.jpg'
  ];

  // Images from public/pictures folder
  const imagesFromPictures = [
    '/pictures/DSC_1173.jpg',
    '/pictures/DSC_1208.jpg',
    '/pictures/DSC_1214.jpg',
    '/pictures/DSC_1223.jpg',
    '/pictures/DSC_1225.jpg',
    '/pictures/DSC_1244.jpg',
    '/pictures/DSC_1245.jpg',
    '/pictures/DSC_1280.jpg',
    '/pictures/DSC_1284.jpg',
    '/pictures/DSC_1307.jpg',
    '/pictures/DSC_1396.jpg',
    '/pictures/DSC_1443.jpg'
  ];

  return (
    <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex flex-col overflow-hidden">
      <div className="p-6 pb-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-[var(--primary)] rounded-full" />
          <h2 className="text-2xl font-bold text-[var(--accent)]">
            Gallery
          </h2>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-hidden">
        <div className="space-y-6 h-full">
          {/* First row - sliding left */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="flex animate-slide-left space-x-4">
              {/* Duplicate arrays for seamless loop */}
              {[...imagesFromImages, ...imagesFromImages].map((src, index) => (
                <div
                  key={`left-${index}`}
                  className="flex-shrink-0 w-64 h-48 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second row - sliding right */}
          <div className="relative overflow-hidden rounded-lg">
            <div className="flex animate-slide-right space-x-4">
              {/* Duplicate arrays for seamless loop */}
              {[...imagesFromPictures, ...imagesFromPictures].map((src, index) => (
                <div
                  key={`right-${index}`}
                  className="flex-shrink-0 w-64 h-48 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <Link
          href="/gallery"
          className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--primary)]/10 text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)]/20 transition-all duration-300"
        >
          View All Gallery
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}; 