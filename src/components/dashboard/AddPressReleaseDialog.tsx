'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Megaphone, Upload, X } from 'lucide-react';

interface PressRelease {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
  featured: boolean;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  image_url?: string;
  reading_time_minutes: number;
  created_by_name?: string;
  updated_by_name?: string;
}

interface PressReleaseDialogProps {
  onReleaseCreate?: (releaseData: PressRelease) => Promise<void>;
  onReleaseUpdate?: (releaseId: string, releaseData: Partial<PressRelease>) => Promise<void>;
  onClose?: () => void;
  existingRelease?: PressRelease | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

const categories = [
  { value: 'announcement', label: 'Announcement' },
  { value: 'update', label: 'System Update' },
  { value: 'policy', label: 'Policy' },
  { value: 'event', label: 'Event' },
  { value: 'achievement', label: 'Achievement' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'technology', label: 'Technology' },
  { value: 'financial', label: 'Financial' },
];

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export function PressReleaseDialog({ 
  onReleaseCreate, 
  onReleaseUpdate, 
  onClose,
  existingRelease, 
  mode = 'add',
  trigger 
}: PressReleaseDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState<Partial<PressRelease>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'announcement',
    status: 'draft',
    author: '',
    featured: false,
    slug: '',
    meta_title: '',
    meta_description: '',
    tags: [],
    image_url: '',
    reading_time_minutes: 1,
  });

  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (existingRelease && mode === 'edit') {
      setFormData({
        title: existingRelease.title || '',
        excerpt: existingRelease.excerpt || '',
        content: existingRelease.content || '',
        category: existingRelease.category || 'announcement',
        status: existingRelease.status || 'draft',
        author: existingRelease.author || '',
        featured: existingRelease.featured || false,
        slug: existingRelease.slug || '',
        meta_title: existingRelease.meta_title || '',
        meta_description: existingRelease.meta_description || '',
        tags: existingRelease.tags || [],
        image_url: existingRelease.image_url || '',
        reading_time_minutes: existingRelease.reading_time_minutes || 1,
      });
      setTagsInput(existingRelease.tags?.join(', ') || '');
    } else {
      // Reset form for new release
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'announcement',
        status: 'draft',
        author: '',
        featured: false,
        slug: '',
        meta_title: '',
        meta_description: '',
        tags: [],
        image_url: '',
        reading_time_minutes: 1,
      });
      setTagsInput('');
    }
  }, [existingRelease, mode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const releaseData: PressRelease = {
        ...formData,
        tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      } as PressRelease;

      if (mode === 'edit' && existingRelease?.id) {
        await onReleaseUpdate?.(existingRelease.id, releaseData);
      } else {
        await onReleaseCreate?.(releaseData);
      }

      handleClose();
    } catch (error) {
      console.error('Error saving press release:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
    
    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'announcement',
      status: 'draft',
      author: '',
      featured: false,
      slug: '',
      meta_title: '',
      meta_description: '',
      tags: [],
      image_url: '',
      reading_time_minutes: 1,
    });
    setTagsInput('');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleClose();
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'press-release');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image_url: result.url }));
      } else {
        console.error('Upload failed:', result.error);
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Megaphone className="mr-2 h-4 w-4" />
            Add Press Release
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Press Release' : 'Create New Press Release'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' 
              ? 'Update the press release information below.' 
              : 'Fill in the information to create a new press release.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter press release title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured Press Release</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                <Input
                  id="reading_time"
                  type="number"
                  min="1"
                  value={formData.reading_time_minutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, reading_time_minutes: parseInt(e.target.value) || 1 }))}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="SEO optimized title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Brief description for search engines"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <div className="space-y-2">
                  {formData.image_url ? (
                    <div className="relative">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Upload an image
                            </span>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              disabled={uploadingImage}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                  {uploadingImage && (
                    <p className="text-sm text-blue-600">Uploading image...</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief summary of the press release"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Full press release content (HTML allowed)"
                rows={10}
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (mode === 'edit' ? 'Updating...' : 'Creating...') 
                : (mode === 'edit' ? 'Update Press Release' : 'Create Press Release')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
