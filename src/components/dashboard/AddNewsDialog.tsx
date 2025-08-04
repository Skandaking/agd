'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NewsArticle } from '@/lib/types';

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
  const { user } = useAuth();
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
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

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
      
      // Check if category is custom
      if (!DEFAULT_CATEGORIES.includes(existingNews.category)) {
        setCustomCategory(existingNews.category);
        setShowCustomCategory(true);
      }
      
      // Only auto-open if we haven't opened for this news yet
      if (!hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
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
      setHasAutoOpened(false);
    }
  }, [mode, existingNews, hasAutoOpened]);

  // Reset hasAutoOpened when existingNews changes to a different news or becomes null
  useEffect(() => {
    setHasAutoOpened(false);
  }, [existingNews?.id]);

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
  }, [newsData.title]);

  // Auto-generate meta title from title
  useEffect(() => {
    if (newsData.title && !newsData.meta_title) {
      setNewsData(prev => ({ ...prev, meta_title: newsData.title }));
    }
  }, [newsData.title]);

  // Auto-generate meta description from excerpt
  useEffect(() => {
    if (newsData.excerpt && !newsData.meta_description) {
      const metaDesc = newsData.excerpt.length > 160 
        ? newsData.excerpt.substring(0, 157) + '...'
        : newsData.excerpt;
      setNewsData(prev => ({ ...prev, meta_description: metaDesc }));
    }
  }, [newsData.excerpt]);

  // Calculate reading time based on content length
  useEffect(() => {
    if (newsData.content) {
      const wordsPerMinute = 200;
      const wordCount = newsData.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      setNewsData(prev => ({ ...prev, reading_time_minutes: readingTime }));
    }
  }, [newsData.content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newsData.title || !newsData.excerpt || !newsData.content || !newsData.author) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (mode === 'add' && onNewsCreate) {
        await onNewsCreate(newsData);
      } else if (mode === 'edit' && existingNews?.id && onNewsUpdate) {
        await onNewsUpdate(existingNews.id, newsData);
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
    if (onClose) {
      onClose();
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {mode === 'add' ? 'Add News' : 'Edit News'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Article' : 'Edit Article'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newsData.title}
                onChange={(e) => setNewsData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter article title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={newsData.author}
                onChange={(e) => setNewsData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="e.g., Accountant General, John Smith"
                required
              />
            </div>
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="reading_time">Reading Time (minutes)</Label>
              <Input
                id="reading_time"
                type="number"
                min="0"
                value={newsData.reading_time_minutes}
                onChange={(e) => setNewsData(prev => ({ ...prev, reading_time_minutes: parseInt(e.target.value) || 0 }))}
                placeholder="Auto-calculated"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={newsData.excerpt}
              onChange={(e) => setNewsData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the article"
              rows={3}
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={newsData.content}
              onChange={(e) => setNewsData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Full article content"
              rows={10}
              required
            />
          </div>

          {/* SEO and Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={newsData.slug}
                onChange={(e) => setNewsData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="URL-friendly version of title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image_url">Featured Image URL</Label>
              <Input
                id="image_url"
                value={newsData.image_url}
                onChange={(e) => setNewsData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={newsData.meta_title}
                onChange={(e) => setNewsData(prev => ({ ...prev, meta_title: e.target.value }))}
                placeholder="SEO title for search engines"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={getTagsDisplay()}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={newsData.meta_description}
              onChange={(e) => setNewsData(prev => ({ ...prev, meta_description: e.target.value }))}
              placeholder="SEO description for search engines"
              rows={2}
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={newsData.featured}
              onCheckedChange={(checked) => setNewsData(prev => ({ ...prev, featured: checked }))}
            />
            <Label htmlFor="featured">Featured Article</Label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
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