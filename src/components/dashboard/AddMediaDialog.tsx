'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MediaItem } from '@/lib/types';
import { useDashboard } from '@/contexts/DashboardContext';
import { Upload, X, FileText, Video, Image as ImageIcon, Loader2 } from 'lucide-react';

interface MediaDialogProps {
  onMediaCreate?: (mediaData: MediaItem) => Promise<void>;
  onMediaUpdate?: (mediaId: string, mediaData: Partial<MediaItem>) => Promise<void>;
  onClose?: () => void;
  existingMedia?: MediaItem | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

const categoryOptions = [
  { value: 'photo', label: 'Photo' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'logo', label: 'Logo' },
  { value: 'banner', label: 'Banner' },
  { value: 'document', label: 'Document' },
  { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' },
  { value: 'other', label: 'Other' },
];

export function MediaDialog({ 
  onMediaCreate, 
  onMediaUpdate, 
  onClose,
  existingMedia, 
  mode = 'add',
  trigger 
}: MediaDialogProps) {
  const { showToast } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<MediaItem>({
    title: '',
    alt_text: '',
    description: '',
    category: 'photo',
    file_name: '',
    file_url: '',
    file_mime: '',
    file_size_bytes: 0,
    width: null,
    height: null,
    duration: null,
    status: 'active',
    tags: [],
    usage_count: 0,
  });

  // Additional state for form handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Load existing media data when editing
  useEffect(() => {
    if (mode === 'edit' && existingMedia) {
      setFormData({
        ...existingMedia,
        tags: existingMedia.tags || [],
      });
      setTags(existingMedia.tags ? existingMedia.tags.join(', ') : '');
      setPreviewUrl(existingMedia.file_url);
      
      // Check if category is custom
      const standardCategories = categoryOptions.map(cat => cat.value);
      if (!standardCategories.includes(existingMedia.category)) {
        setCustomCategory(existingMedia.category);
        setShowCustomCategory(true);
      }
    } else {
      // Reset form for add mode
      setFormData({
        title: '',
        alt_text: '',
        description: '',
        category: 'photo',
        file_name: '',
        file_url: '',
        file_mime: '',
        file_size_bytes: 0,
        width: null,
        height: null,
        duration: null,
        status: 'active',
        tags: [],
        usage_count: 0,
      });
      setTags('');
      setSelectedFile(null);
      setPreviewUrl('');
      setCustomCategory('');
      setShowCustomCategory(false);
    }
  }, [mode, existingMedia, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      showToast.error('Please enter a title');
      return;
    }

    if (mode === 'add' && !selectedFile) {
      showToast.error('Please select a file to upload');
      return;
    }

    setIsSubmitting(true);

    try {
      let fileData = {
        file_name: formData.file_name,
        file_url: formData.file_url,
        file_mime: formData.file_mime,
        file_size_bytes: formData.file_size_bytes,
        width: formData.width,
        height: formData.height,
        duration: formData.duration,
      };

      // Upload file if new file is selected
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);
        uploadFormData.append('type', 'media');

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload file');
        }

        fileData = {
          file_name: uploadResult.file_name,
          file_url: uploadResult.file_url,
          file_mime: uploadResult.file_mime,
          file_size_bytes: uploadResult.file_size_bytes,
          width: uploadResult.width,
          height: uploadResult.height,
          duration: uploadResult.duration,
        };
      }

      const mediaData: MediaItem = {
        ...formData,
        ...fileData,
        category: showCustomCategory ? customCategory : formData.category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      };

      if (mode === 'edit' && existingMedia?.id) {
        await onMediaUpdate?.(existingMedia.id, mediaData);
      } else {
        await onMediaCreate?.(mediaData);
      }

      handleClose();
    } catch (error) {
      console.error('Error submitting media:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to save media item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      onClose?.();
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomCategory(true);
      setFormData({ ...formData, category: '' });
    } else {
      setShowCustomCategory(false);
      setFormData({ ...formData, category: value });
    }
  };

  const handleCustomCategoryChange = (value: string) => {
    setCustomCategory(value);
  };

  const handleTagsChange = (value: string) => {
    setTags(value);
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Auto-fill title from filename if empty
      if (!formData.title.trim()) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        setFormData(prev => ({ ...prev, title: nameWithoutExt }));
      }

      // Get file dimensions for images
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          setFormData(prev => ({ 
            ...prev, 
            width: img.width,
            height: img.height 
          }));
        };
        img.src = url;
      }

      // Get video duration for videos
      if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          setFormData(prev => ({ 
            ...prev, 
            duration: Math.round(video.duration) 
          }));
        };
        video.src = url;
      }

    } catch (error) {
      console.error('Error processing file:', error);
      showToast.error('Failed to process file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const isImage = (mime: string) => mime.startsWith('image/');
  const isVideo = (mime: string) => mime.startsWith('video/');

  const getFileIcon = (mime: string) => {
    if (mime.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-blue-600" />;
    if (mime.startsWith('video/')) return <Video className="h-8 w-8 text-red-600" />;
    return <FileText className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            {mode === 'edit' ? 'Edit Media' : 'Upload Media'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Media Item' : 'Upload New Media'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' 
              ? 'Update the media item details and metadata.' 
              : 'Upload a new image, video, or document to your media library.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - File Upload/Preview */}
            <div className="space-y-4">
              <div>
                <Label>File {mode === 'add' && <span className="text-red-500">*</span>}</Label>
                {mode === 'add' || selectedFile ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Processing file...</p>
                      </div>
                    ) : previewUrl ? (
                      <div className="space-y-3">
                        <div className="relative max-w-xs mx-auto">
                          {isImage(selectedFile?.type || formData.file_mime) ? (
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              width={200}
                              height={200}
                              className="object-cover rounded-md"
                            />
                          ) : isVideo(selectedFile?.type || formData.file_mime) ? (
                            <video
                              src={previewUrl}
                              className="max-w-full h-auto rounded-md"
                              controls
                            />
                          ) : (
                            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md">
                              {getFileIcon(selectedFile?.type || formData.file_mime)}
                              <p className="mt-2 text-sm text-gray-600">
                                {selectedFile?.name || formData.file_name}
                              </p>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {selectedFile?.name || formData.file_name}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            setPreviewUrl('');
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag and drop a file here, or click to select
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Images, videos, and documents are supported
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative max-w-xs">
                      {isImage(formData.file_mime) ? (
                        <Image
                          src={formData.file_url}
                          alt={formData.title}
                          width={200}
                          height={200}
                          className="object-cover rounded-md"
                        />
                      ) : isVideo(formData.file_mime) ? (
                        <video
                          src={formData.file_url}
                          className="max-w-full h-auto rounded-md"
                          controls
                        />
                      ) : (
                        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md">
                          {getFileIcon(formData.file_mime)}
                          <p className="mt-2 text-sm text-gray-600">
                            {formData.file_name}
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Replace File
                    </Button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="alt_text">Alt Text</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text || ''}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Describe the image for accessibility"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description of the media item"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={showCustomCategory ? 'custom' : formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Category</SelectItem>
                  </SelectContent>
                </Select>
                {showCustomCategory && (
                  <Input
                    value={customCategory}
                    onChange={(e) => handleCustomCategoryChange(e.target.value)}
                    placeholder="Enter custom category"
                    className="mt-2"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
                {tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.split(',').map((tag, index) => {
                      const trimmedTag = tag.trim();
                      return trimmedTag ? (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trimmedTag}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {(formData.width && formData.height) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Width</Label>
                    <Input value={formData.width} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input value={formData.height} readOnly className="bg-gray-50" />
                  </div>
                </div>
              )}

              {formData.duration && (
                <div>
                  <Label>Duration</Label>
                  <Input 
                    value={`${Math.floor(formData.duration / 60)}:${(formData.duration % 60).toString().padStart(2, '0')}`} 
                    readOnly 
                    className="bg-gray-50" 
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'edit' ? 'Updating...' : 'Uploading...'}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {mode === 'edit' ? 'Update Media' : 'Upload Media'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
