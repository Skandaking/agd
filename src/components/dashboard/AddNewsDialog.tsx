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
import { NewsArticle } from '@/lib/types';
import Image from 'next/image';

interface NewsDialogProps {
  onNewsCreate?: (newsData: NewsArticle) => Promise<void>;
  onNewsUpdate?: (newsId: string, newsData: Partial<NewsArticle>) => Promise<void>;
  onClose?: () => void;
  existingNews?: NewsArticle | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

// Default categories
const DEFAULT_CATEGORIES = [
  'announcement',
  'update', 
  'report',
  'event',
  'policy'
];

// Default statuses
const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' }
];

export function NewsDialog({ 
  onNewsCreate, 
  onNewsUpdate, 
  onClose,
  existingNews, 
  mode = 'add',
  trigger 
}: NewsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newsData, setNewsData] = useState<NewsArticle>({
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

  // Update form data when existingNews changes or mode changes
  useEffect(() => {
    if (mode === 'edit' && existingNews) {
      setNewsData({
        id: existingNews.id,
        title: existingNews.title,
        excerpt: existingNews.excerpt,
        content: existingNews.content,
        category: existingNews.category,
        status: existingNews.status,
        author: existingNews.author,
        featured: existingNews.featured,
        slug: existingNews.slug || '',
        meta_title: existingNews.meta_title || '',
        meta_description: existingNews.meta_description || '',
        tags: existingNews.tags || [],
        image_url: existingNews.image_url || '',
        reading_time_minutes: existingNews.reading_time_minutes,
      });
      // Keep saved reading time on initial open in edit mode
      setAutoComputeReadingTime(false);
      
      // Check if category is custom
      if (!DEFAULT_CATEGORIES.includes(existingNews.category)) {
        setCustomCategory(existingNews.category);
        setShowCustomCategory(true);
      } else {
        setCustomCategory('');
        setShowCustomCategory(false);
      }
      
      // Auto-open for edit mode
      setIsOpen(true);
    } else if (mode === 'add') {
      // Reset form for add mode
      setNewsData({
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
  }, [mode, existingNews]);



  // Auto-generate slug from title
  useEffect(() => {
    if (newsData.title && !newsData.slug) {
      const slug = newsData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setNewsData(prev => ({ ...prev, slug }));
    }
  }, [newsData.title, newsData.slug]);

  // Auto-generate meta title from title
  useEffect(() => {
    if (newsData.title && !newsData.meta_title) {
      setNewsData(prev => ({ ...prev, meta_title: newsData.title }));
    }
  }, [newsData.title, newsData.meta_title]);

  // Auto-generate meta description from excerpt
  useEffect(() => {
    if (newsData.excerpt && !newsData.meta_description) {
      const metaDesc = newsData.excerpt.length > 160 
        ? newsData.excerpt.substring(0, 157) + '...'
        : newsData.excerpt;
      setNewsData(prev => ({ ...prev, meta_description: metaDesc }));
    }
  }, [newsData.excerpt, newsData.meta_description]);

  // Calculate reading time based on visible text content
  useEffect(() => {
    if (!autoComputeReadingTime) return;
    const raw = newsData.content || '';
    const text = raw
      .replace(/<[^>]*>/g, ' ') // strip HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (text.length === 0) {
      setNewsData(prev => ({ ...prev, reading_time_minutes: 0 }));
      return;
    }

    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    setNewsData(prev => ({ ...prev, reading_time_minutes: readingTime }));
  }, [newsData.content, autoComputeReadingTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors([]);
    
    // Validate form
    const errors: string[] = [];
    if (!newsData.title?.trim()) errors.push('Title is required');
    if (!newsData.excerpt?.trim()) errors.push('Excerpt is required');
    if (!newsData.content?.trim()) errors.push('Content is required');
    if (!newsData.author?.trim()) errors.push('Author is required');
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      console.error('Form validation failed:', { newsData, errors });
      return;
    }

    // Ensure required fields are present
    const submitData = {
      ...newsData,
      title: newsData.title.trim(),
      excerpt: newsData.excerpt.trim(),
      content: newsData.content.trim(),
      author: newsData.author.trim(),
      category: newsData.category || 'announcement',
      status: newsData.status || 'draft',
      featured: Boolean(newsData.featured),
      reading_time_minutes: newsData.reading_time_minutes || 0,
    };

    setIsSubmitting(true);
    
    try {
      console.log('Submitting news:', { mode, submitData, existingNews });
      
      if (mode === 'add' && onNewsCreate) {
        await onNewsCreate(submitData);
        console.log('Article created successfully');
      } else if (mode === 'edit' && existingNews?.id && onNewsUpdate) {
        await onNewsUpdate(existingNews.id, submitData);
        console.log('Article updated successfully');
      } else {
        console.error('Invalid mode or missing callbacks:', { mode, hasCreate: !!onNewsCreate, hasUpdate: !!onNewsUpdate, existingNewsId: existingNews?.id });
      }
      
      handleClose();
    } catch (error) {
      console.error('Error saving news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form when closing
    if (mode === 'add') {
      setNewsData({
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
    }
    if (onClose) {
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleClose();
    } else if (mode === 'edit' && !existingNews) {
      // If opening in edit mode but no existing news, close the dialog
      setIsOpen(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomCategory(true);
      setNewsData(prev => ({ ...prev, category: customCategory }));
    } else {
      setShowCustomCategory(false);
      setNewsData(prev => ({ ...prev, category: value }));
    }
  };

  const handleCustomCategoryChange = (value: string) => {
    setCustomCategory(value);
    setNewsData(prev => ({ ...prev, category: value }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setNewsData(prev => ({ ...prev, tags }));
  };

  const getTagsDisplay = () => {
    return newsData.tags?.join(', ') || '';
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setNewsData(prev => ({ ...prev, image_url: result.url }));
        setUploadProgress(100);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      // You can add toast notification here
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
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
                Add News
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit News
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">
            {mode === 'add' ? 'Add New Article' : 'Edit Article'}
          </DialogTitle>
          {mode === 'edit' && existingNews && (
            <p className="text-sm text-muted-foreground">
              Editing: {existingNews.title}
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
                value={newsData.title}
                onChange={(e) => setNewsData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter article title"
                required
                className={!newsData.title ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="author">Author <span className="text-secondary">*</span></Label>
              <Input
                id="author"
                value={newsData.author}
                onChange={(e) => setNewsData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="e.g., Accountant General, John Smith"
                required
                className={!newsData.author ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={newsData.slug}
                onChange={(e) => setNewsData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="URL-friendly version of title"
              />
            </div>
          </div>

          {/* Category, Status, Reading Time, and Featured */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="category">Category <span className="text-secondary">*</span></Label>
              <Select value={newsData.category} onValueChange={handleCategoryChange}>
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
              <Select value={newsData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => 
                setNewsData(prev => ({ ...prev, status: value }))
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
                value={newsData.reading_time_minutes}
                onChange={(e) => {
                  setNewsData(prev => ({ ...prev, reading_time_minutes: parseInt(e.target.value) || 0 }));
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
                  checked={newsData.featured}
                  onCheckedChange={(checked) => setNewsData(prev => ({ ...prev, featured: checked }))}
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
                {newsData.image_url && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewsData(prev => ({ ...prev, image_url: '' }))}
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
                value={newsData.excerpt}
                onChange={(e) => setNewsData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief summary of the article"
                rows={3}
                required
                className={!newsData.excerpt ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="content">Content <span className="text-secondary">*</span></Label>
              <Textarea
                id="content"
                value={newsData.content}
                onChange={(e) => {
                  setNewsData(prev => ({ ...prev, content: e.target.value }));
                  // Re-enable auto-calc when content changes
                  setAutoComputeReadingTime(true);
                }}
                placeholder="Full article content"
                rows={6}
                required
                className={!newsData.content ? 'border-red-300 focus:border-red-500' : ''}
              />
            </div>
          </div>

          {/* Image Preview and SEO Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Image Preview */}
            {newsData.image_url && (
              <div className="space-y-1.5">
                <Label>Image Preview</Label>
                                 <div className="relative w-full h-24 border rounded-md overflow-hidden">
                   <Image
                     src={newsData.image_url}
                     alt="Featured image preview"
                     fill
                     className="object-cover"
                   />
                 </div>
                <Input
                  value={newsData.image_url}
                  onChange={(e) => setNewsData(prev => ({ ...prev, image_url: e.target.value }))}
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
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={newsData.meta_title}
                onChange={(e) => setNewsData(prev => ({ ...prev, meta_title: e.target.value }))}
                placeholder="SEO title for search engines"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="tags">Tags</Label>
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
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={newsData.meta_description}
              onChange={(e) => setNewsData(prev => ({ ...prev, meta_description: e.target.value }))}
              placeholder="SEO description for search engines"
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
              {isSubmitting ? 'Saving...' : mode === 'add' ? 'Create Article' : 'Update Article'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 