'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
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
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  TrendingUp
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'announcement' | 'update' | 'report' | 'event' | 'policy';
  status: 'draft' | 'published' | 'archived';
  author: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  featured: boolean;
}

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
  const [statusFilter, setStatusFilter] = useState<NewsArticle['status'] | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<NewsArticle['category'] | 'all'>('all');

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
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
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

  const stats = {
    total: news.length,
    published: news.filter(n => n.status === 'published').length,
    drafts: news.filter(n => n.status === 'draft').length,
    totalViews: news.reduce((sum, n) => sum + n.views, 0),
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and publish news articles and announcements.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/news/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Article
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All articles in system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
            <p className="text-xs text-muted-foreground">
              Live articles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drafts}</div>
            <p className="text-xs text-muted-foreground">
              Work in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All time views
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Articles</CardTitle>
          <CardDescription>
            Use the filters below to find specific articles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as NewsArticle['status'] | 'all')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as NewsArticle['category'] | 'all')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">All Categories</option>
                <option value="announcement">Announcement</option>
                <option value="update">System Update</option>
                <option value="report">Report</option>
                <option value="event">Event</option>
                <option value="policy">Policy</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredNews.length})</CardTitle>
          <CardDescription>
            Manage your news articles and their publication status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Views</TableHead>
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
                            {article.title}
                            {article.featured && (
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
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
                          <User className="h-4 w-4 text-muted-foreground" />
                          {article.author}
                        </div>
                      </TableCell>
                      <TableCell>
                        {article.publishedAt ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {article.publishedAt.toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not published</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          {article.views.toLocaleString()}
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
                              <Link href={`/dashboard/news/${article.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/news/${article.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {article.status === 'draft' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(article.id, 'published')}
                              >
                                Publish
                              </DropdownMenuItem>
                            )}
                            {article.status === 'published' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(article.id, 'draft')}
                              >
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(article.id)}
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