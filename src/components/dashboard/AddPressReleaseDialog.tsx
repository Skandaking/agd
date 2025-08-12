'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Save, X, Upload, Edit } from 'lucide-react';
import Image from 'next/image';

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

// Default categories
const DEFAULT_CATEGORIES = [
  'announcement',
  'update', 
  'policy',
  'event',
  'achievement',
  'partnership',
  'technology',
  'financial'
];

// Default statuses
const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' }
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
  const [releaseData, setReleaseData] = useState<PressRelease>({
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
    reading_time_minutes: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [autoComputeReadingTime, setAutoComputeReadingTime] = useState(mode === 'add');

  // Update form data when existingRelease changes or mode changes
  useEffect(() => {
    if (mode === 'edit' && existingRelease) {
      setReleaseData({
        id: existingRelease.id,
        title: existingRelease.title,
        excerpt: existingRelease.excerpt,
        content: existingRelease.content,
        category: existingRelease.category,
        status: existingRelease.status,
        author: existingRelease.author,
        featured: existingRelease.featured,
        slug: existingRelease.slug || '',
        meta_title: existingRelease.meta_title || '',
        meta_description: existingRelease.meta_description || '',
        tags: existingRelease.tags || [],
        image_url: existingRelease.image_url || '',
        reading_time_minutes: existingRelease.reading_time_minutes,
      });
      // Keep saved reading time on initial open in edit mode
      setAutoComputeReadingTime(false);
      
      // Check if category is custom
      if (!DEFAULT_CATEGORIES.includes(existingRelease.category)) {
        setCustomCategory(existingRelease.category);
        setShowCustomCategory(true);
      } else {
        setCustomCategory('');
        setShowCustomCategory(false);
      }
      
      // Auto-open for edit mode
      setIsOpen(true);
    } else if (mode === 'add') {
      // Reset form for add mode
      setReleaseData({
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
        reading_time_minutes: 0,
      });
      setCustomCategory('');
      setShowCustomCategory(false);
      setAutoComputeReadingTime(true);
    }
  }, [mode, existingRelease]);

  // Auto-generate slug from title
  useEffect(() => {
    if (releaseData.title && !releaseData.slug) {
      const slug = releaseData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setReleaseData(prev => ({ ...prev, slug }));
    }
  }, [releaseData.title, releaseData.slug]);

  // Auto-generate meta title from title
  useEffect(() => {
    if (releaseData.title && !releaseData.meta_title) {
      setReleaseData(prev => ({ ...prev, meta_title: releaseData.title }));
    }
  }, [releaseData.title, releaseData.meta_title]);

  // Auto-generate meta description from excerpt
  useEffect(() => {
    if (releaseData.excerpt && !releaseData.meta_description) {
      const metaDesc = releaseData.excerpt.length > 160 
        ? releaseData.excerpt.substring(0, 157) + '...'
        : releaseData.excerpt;
      setReleaseData(prev => ({ ...prev, meta_description: metaDesc }));
    }
  }, [releaseData.excerpt, releaseData.meta_description]);

  // Calculate reading time based on visible text content
  useEffect(() => {
    if (!autoComputeReadingTime) return;
    const raw = releaseData.content || '';
    const text = raw
      .replace(/<[^>]*>/g, ' ') // strip HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (text.length === 0) {
      setReleaseData(prev => ({ ...prev, reading_time_minutes: 0 }));
      return;
    }

    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    setReleaseData(prev => ({ ...prev, reading_time_minutes: readingTime }));
  }, [releaseData.content, autoComputeReadingTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors([]);
    
    // Validate form
    const errors: string[] = [];
    if (!releaseData.title?.trim()) errors.push('Title is required');
    if (!releaseData.excerpt?.trim()) errors.push('Excerpt is required');
    if (!releaseData.content?.trim()) errors.push('Content is required');
    if (!releaseData.author?.trim()) errors.push('Author is required');
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      console.error('Form validation failed:', { releaseData, errors });
      return;
    }

    // Ensure required fields are present
    const finalReleaseData: PressRelease = {
      ...releaseData,
      title: releaseData.title?.trim() || '',
      excerpt: releaseData.excerpt?.trim() || '',
      content: releaseData.content?.trim() || '',
      author: releaseData.author?.trim() || '',
      category: showCustomCategory ? customCategory : releaseData.category,
    };

    setIsSubmitting(true);

    try {
      if (mode === 'edit' && existingRelease?.id) {
        await onReleaseUpdate?.(existingRelease.id, finalReleaseData);
      } else {
        await onReleaseCreate?.(finalReleaseData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving press release:', error);
      // Error handling is done by parent component via toast
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
    setValidationErrors([]);
    setUploadProgress(0);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleClose();
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomCategory(true);
      setReleaseData(prev => ({ ...prev, category: customCategory || '' }));
    } else {
      setShowCustomCategory(false);
      setReleaseData(prev => ({ ...prev, category: value }));
    }
  };

  const handleCustomCategoryChange = (value: string) => {
    setCustomCategory(value);
    setReleaseData(prev => ({ ...prev, category: value }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setReleaseData(prev => ({ ...prev, tags }));
  };

  const getTagsDisplay = () => {
    return releaseData.tags?.join(', ') || '';
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'press-releases');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setReleaseData(prev => ({ ...prev, image_url: result.url }));
        setUploadProgress(100);
      } else {
        console.error('Upload failed:', result.error);
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            {mode === 'add' ? (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Press Release
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Press Release
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">
            {mode === 'add' ? 'Create New Press Release' : 'Edit Press Release'}
          </DialogTitle>
          {mode === 'edit' && existingRelease && (
            <p className="text-sm text-muted-foreground">
              Editing: {existingRelease.title}
            </p>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title <span className="text-secondary">*</span></Label>
              <Input
                id="title"
                value={releaseData.title}
                onChange={(e) => setReleaseData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter press release title"
                required
                className={!releaseData.title ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="author">Author <span className="text-secondary">*</span></Label>
              <Input
                id="author"
                value={releaseData.author}
                onChange={(e) => setReleaseData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="e.g., Accountant General, John Smith"
                required
                className={!releaseData.author ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={releaseData.slug}
                onChange={(e) => setReleaseData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          {/* Category, Status, Reading Time, and Featured */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="category">Category <span className="text-secondary">*</span></Label>
              <Select value={releaseData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
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
            
            <div className="space-y-1.5">
              <Label htmlFor="status">Status <span className="text-secondary">*</span></Label>
              <Select value={releaseData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => 
                setReleaseData(prev => ({ ...prev, status: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="reading_time">Reading Time</Label>
              <Input
                id="reading_time"
                type="number"
                min="0"
                value={releaseData.reading_time_minutes}
                onChange={(e) => {
                  setReleaseData(prev => ({ ...prev, reading_time_minutes: parseInt(e.target.value) || 0 }));
                  // User manually changed reading time; stop auto-calculation
                  setAutoComputeReadingTime(false);
                }}
                placeholder="Auto-calculated"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Featured</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="featured"
                  checked={releaseData.featured}
                  onCheckedChange={(checked) => setReleaseData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured" className="text-sm">Mark as featured</Label>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Image Upload</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
                {releaseData.image_url && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setReleaseData(prev => ({ ...prev, image_url: '' }))}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Excerpt and Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="excerpt">Excerpt <span className="text-secondary">*</span></Label>
              <Textarea
                id="excerpt"
                value={releaseData.excerpt}
                onChange={(e) => setReleaseData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief summary of the press release"
                rows={3}
                required
                className={!releaseData.excerpt ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="content">Content <span className="text-secondary">*</span></Label>
              <Textarea
                id="content"
                value={releaseData.content}
                onChange={(e) => {
                  setReleaseData(prev => ({ ...prev, content: e.target.value }));
                  // Re-enable auto-calc when content changes
                  setAutoComputeReadingTime(true);
                }}
                placeholder="Full press release content"
                rows={6}
                required
                className={!releaseData.content ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>
          </div>

          {/* Image Preview and SEO Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Image Preview */}
            {releaseData.image_url && (
              <div className="space-y-1.5">
                <Label>Image Preview</Label>
                <div className="relative w-full h-24 border rounded-md overflow-hidden">
                  <Image
                    src={releaseData.image_url}
                    alt="Featured image preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <Input
                  value={releaseData.image_url}
                  onChange={(e) => setReleaseData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="Image URL"
                  className="text-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Supported: JPG, PNG, GIF, WebP. Max: 5MB
                </p>
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}

            {/* SEO Fields */}
            <div className="space-y-1.5">
              <Label htmlFor="meta_title">Meta Title (SEO)</Label>
              <Input
                id="meta_title"
                value={releaseData.meta_title}
                onChange={(e) => setReleaseData(prev => ({ ...prev, meta_title: e.target.value }))}
                placeholder="SEO optimized title"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={getTagsDisplay()}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <Label htmlFor="meta_description">Meta Description (SEO)</Label>
            <Textarea
              id="meta_description"
              value={releaseData.meta_description}
              onChange={(e) => setReleaseData(prev => ({ ...prev, meta_description: e.target.value }))}
              placeholder="Brief description for search engines"
              rows={2}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-2 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : mode === 'add' ? 'Create Press Release' : 'Update Press Release'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}