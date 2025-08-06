'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { NewsDialog } from '@/components/dashboard/AddNewsDialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewsArticle } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Clock,
  Tag,
  FileText,
  ExternalLink
} from 'lucide-react';

const categoryLabels: Record<NewsArticle['category'], string> = {
  announcement: 'Announcement',
  update: 'System Update',
  report: 'Report',
  event: 'Event',
  policy: 'Policy',
};

const statusLabels: Record<NewsArticle['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

const getStatusVariant = (status: NewsArticle['status']) => {
  switch (status) {
    case 'published':
      return 'default';
    case 'draft':
      return 'secondary';
    case 'archived':
      return 'outline';
  }
};

const getCategoryVariant = (category: NewsArticle['category']) => {
  switch (category) {
    case 'announcement':
      return 'default';
    case 'update':
      return 'secondary';
    case 'report':
      return 'outline';
    case 'event':
      return 'secondary';
    case 'policy':
      return 'outline';
  }
};

export default function NewsPage() {
  const { setPageTitle, setBreadcrumbs, showToast } = useDashboard();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Confirmation dialog state for delete
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; article: NewsArticle | null }>({ isOpen: false, article: null });
  
  // View dialog state for viewing article details
  const [viewDialog, setViewDialog] = useState<{ isOpen: boolean; article: NewsArticle | null }>({ isOpen: false, article: null });

  useEffect(() => {
    setPageTitle('News Management');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
      { label: 'News' },
    ]);
    fetchNews();
  }, [setPageTitle, setBreadcrumbs]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/news');
      const result = await response.json();
      
      if (result.success) {
        console.log('API Response:', result.news);
        setNews(result.news);
      } else {
        showToast.error('Failed to fetch news articles');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      showToast.error('Failed to fetch news articles');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNews = news.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setNews(news.filter(article => article.id !== id));
        showToast.success('Article deleted successfully');
      } else {
        showToast.error(result.error || 'Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      showToast.error('Failed to delete article');
    }
  };

  const handleDeleteClick = (article: NewsArticle) => {
    setDeleteDialog({ isOpen: true, article });
  };

  const handleViewClick = (article: NewsArticle) => {
    setViewDialog({ isOpen: true, article });
  };

  const handleStatusChange = async (id: string, newStatus: NewsArticle['status']) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();
      
      if (result.success) {
        setNews(news.map(article => 
          article.id === id ? result.news : article
        ));
        showToast.success(`Article status changed to ${newStatus}`);
      } else {
        showToast.error(result.error || 'Failed to update article status');
      }
    } catch (error) {
      console.error('Error updating news status:', error);
      showToast.error('Failed to update article status');
    }
  };

  const handleCreateNews = async (newsData: NewsArticle) => {
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      const result = await response.json();
      
      if (result.success) {
        setNews([result.news, ...news]);
        showToast.success('Article created successfully');
      } else {
        showToast.error(result.error || 'Failed to create article');
      }
    } catch (error) {
      console.error('Error creating news:', error);
      showToast.error('Failed to create article');
    }
  };

  const handleUpdateNews = async (newsId: string, newsData: Partial<NewsArticle>) => {
    try {
      console.log('Updating news:', { newsId, newsData });
      
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      const result = await response.json();
      console.log('Update response:', result);
      
      if (result.success) {
        setNews(news.map(article => 
          article.id === newsId ? result.news : article
        ));
        showToast.success('Article updated successfully');
      } else {
        showToast.error(result.error || 'Failed to update article');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      showToast.error('Failed to update article');
    }
  };



  return (
    <div className="space-y-6 w-full">
      {/* Page Header with Stats */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and publish news articles and announcements.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-muted"
              >
                <span className="text-muted-foreground">×</span>
              </Button>
            )}
          </div>
          <NewsDialog 
            mode={editingNews ? "edit" : "add"}
            existingNews={editingNews}
            onNewsCreate={handleCreateNews}
            onNewsUpdate={handleUpdateNews}
            onClose={() => {
              setEditingNews(null);
            }}
          />
        </div>
      </div>
      {/* Articles Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Articles ({filteredNews.length}
                {searchQuery && filteredNews.length !== news.length && (
                  <span className="text-muted-foreground"> of {news.length}</span>
                )}
                )
              </CardTitle>
              <CardDescription>
                {searchQuery ? (
                  <>Showing results for &quot;{searchQuery}&quot;</>
                ) : (
                  <>Manage your news articles and their publication status.</>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Article</TableHead>
                  <TableHead className="w-[12%]">Category</TableHead>
                  <TableHead className="w-[12%]">Status</TableHead>
                  <TableHead className="w-[15%]">Author</TableHead>
                  <TableHead className="w-[12%]">Published</TableHead>
                  <TableHead className="w-[9%]">Views</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Loading articles...
                    </TableCell>
                  </TableRow>
                ) : filteredNews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No articles found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNews.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            <span className="truncate">{article.title}</span>
                            {article.featured && (
                              <Badge variant="secondary" className="text-xs shrink-0">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {article.excerpt}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getCategoryVariant(article.category)}>
                          {categoryLabels[article.category]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(article.status)}>
                          {statusLabels[article.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{article.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {article.publishedAt ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not published</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm">{(article.views || 0).toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleViewClick(article)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setEditingNews(article)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Article
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {article.status === 'draft' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(article.id || '', 'published')}
                              >
                                Publish
                              </DropdownMenuItem>
                            )}
                            {article.status === 'published' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(article.id || '', 'draft')}
                              >
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteClick(article)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, article: null })}
        onConfirm={async () => {
          if (deleteDialog.article) {
            await handleDelete(deleteDialog.article.id || '');
            setDeleteDialog({ isOpen: false, article: null });
          }
        }}
        title="Delete Article"
        description={`Are you sure you want to delete "${deleteDialog.article?.title}"? This action cannot be undone and will also delete the associated image file.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* View Article Dialog */}
      <Dialog open={viewDialog.isOpen} onOpenChange={(open) => setViewDialog({ isOpen: open, article: viewDialog.article })}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Article Details
            </DialogTitle>
            <DialogDescription>
              View complete information about the selected article
            </DialogDescription>
          </DialogHeader>
          
          {viewDialog.article && (
            <div className="space-y-6">
              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{viewDialog.article.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{viewDialog.article.author}</span>
                      </div>
                      {viewDialog.article.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(viewDialog.article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{viewDialog.article.readingTime || '5'} min read</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getCategoryVariant(viewDialog.article.category)}>
                      {categoryLabels[viewDialog.article.category]}
                    </Badge>
                    <Badge variant={getStatusVariant(viewDialog.article.status)}>
                      {statusLabels[viewDialog.article.status]}
                    </Badge>
                    {viewDialog.article.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                </div>
                
                {/* Excerpt */}
                {viewDialog.article.excerpt && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Excerpt</h3>
                    <p className="text-muted-foreground leading-relaxed">{viewDialog.article.excerpt}</p>
                  </div>
                )}
              </div>

              {/* Article Image */}
              {viewDialog.article.imageUrl && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Featured Image</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={viewDialog.article.imageUrl}
                      alt={viewDialog.article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Content</h3>
                <div className="prose prose-sm max-w-none">
                  <div 
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: viewDialog.article.content }}
                  />
                </div>
              </div>

              {/* SEO Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">SEO Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Title</label>
                    <p className="text-sm text-muted-foreground">{viewDialog.article.metaTitle || 'Not set'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Description</label>
                    <p className="text-sm text-muted-foreground">{viewDialog.article.metaDescription || 'Not set'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <p className="text-sm text-muted-foreground font-mono">{viewDialog.article.slug}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Views</label>
                    <p className="text-sm text-muted-foreground">{(viewDialog.article.views || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {viewDialog.article.tags && viewDialog.article.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewDialog.article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setViewDialog({ isOpen: false, article: null })}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setViewDialog({ isOpen: false, article: null });
                    setEditingNews(viewDialog.article);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Article
                </Button>
                {viewDialog.article.status === 'published' && (
                  <Button variant="outline" asChild>
                    <Link href={`/news/${viewDialog.article.slug}`} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Public
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 