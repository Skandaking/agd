'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { NewsDialog } from '@/components/dashboard/AddNewsDialog';
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
  User
} from 'lucide-react';

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'AGD Launches New Financial Management System',
    excerpt: 'The Accountant General\'s Department has successfully launched a new financial management system to enhance transparency and efficiency in government financial operations.',
    content: 'Full article content here...',
    category: 'announcement',
    status: 'published',
    author: 'Admin User',
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-15'),
    views: 1247,
    featured: true,
    reading_time_minutes: 5,
  },
  {
    id: '2',
    title: 'Annual Public Sector Financial Report Released',
    excerpt: 'The AGD has released the comprehensive annual financial report for the public sector, highlighting key achievements and financial performance metrics.',
    content: 'Full article content here...',
    category: 'report',
    status: 'published',
    author: 'John Doe',
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-10'),
    views: 892,
    featured: false,
    reading_time_minutes: 8,
  },
  {
    id: '3',
    title: 'Training Workshop for Government Accountants',
    excerpt: 'Over 200 government accountants participated in a comprehensive capacity building workshop organized by the AGD to enhance financial management skills.',
    content: 'Full article content here...',
    category: 'event',
    status: 'draft',
    author: 'Jane Smith',
    publishedAt: null,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    views: 0,
    featured: false,
    reading_time_minutes: 3,
  },
];

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
  const [news, setNews] = useState<NewsArticle[]>(mockNews);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);

  useEffect(() => {
    setPageTitle('News Management');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
      { label: 'News' },
    ]);
  }, [setPageTitle, setBreadcrumbs]);

  const filteredNews = news.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleDelete = (id: string) => {
    setNews(news.filter(article => article.id !== id));
    showToast.success('Article deleted successfully');
  };

  const handleStatusChange = (id: string, newStatus: NewsArticle['status']) => {
    setNews(news.map(article => 
      article.id === id 
        ? { 
            ...article, 
            status: newStatus,
            publishedAt: newStatus === 'published' ? new Date() : article.publishedAt
          }
        : article
    ));
    showToast.success(`Article status changed to ${newStatus}`);
  };

  const handleCreateNews = async (newsData: NewsArticle) => {
    const newNews: NewsArticle = {
      ...newsData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: newsData.status === 'published' ? new Date() : null,
      views: 0,
    };
    setNews([newNews, ...news]);
    showToast.success('Article created successfully');
  };

  const handleUpdateNews = async (newsId: string, newsData: Partial<NewsArticle>) => {
    setNews(news.map(article => 
      article.id === newsId 
        ? { 
            ...article, 
            ...newsData,
            updatedAt: new Date(),
            publishedAt: newsData.status === 'published' ? new Date() : article.publishedAt
          }
        : article
    ));
    showToast.success('Article updated successfully');
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
            onClose={() => setEditingNews(null)}
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
                {filteredNews.length === 0 ? (
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
                            <span className="text-sm">{article.publishedAt.toLocaleDateString()}</span>
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
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/news/${article.id || ''}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingNews(article)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
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
                              onClick={() => handleDelete(article.id || '')}
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
    </div>
  );
} 