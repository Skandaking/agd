'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  Newspaper, 
  Calendar, 
  TrendingUp,
  ArrowUpRight,
  Activity,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { NewsArticle, DocumentItem, EventItem, MediaItem } from '@/lib/types';

interface DashboardStats {
  news: {
    total: number;
    published: number;
    thisMonth: number;
  };
  documents: {
    total: number;
    published: number;
    thisMonth: number;
  };
  pressReleases: {
    total: number;
    published: number;
    thisMonth: number;
  };
  events: {
    total: number;
    upcoming: number;
    thisMonth: number;
  };
  media: {
    total: number;
    thisMonth: number;
  };
}

interface RecentItem {
  id: string;
  title: string;
  type: 'news' | 'document' | 'event' | 'press-release' | 'media';
  status: string;
  createdAt: Date;
  author: string;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const getItemIcon = (type: RecentItem['type']) => {
  switch (type) {
    case 'news':
      return Newspaper;
    case 'document':
      return FileText;
    case 'event':
      return Calendar;
    case 'media':
      return ImageIcon;
    case 'press-release':
      return BarChart3;
    default:
      return Activity;
  }
};

const getTypeLabel = (type: RecentItem['type']) => {
  switch (type) {
    case 'news':
      return 'News Article';
    case 'document':
      return 'Document';
    case 'event':
      return 'Event';
    case 'media':
      return 'Media';
    case 'press-release':
      return 'Press Release';
    default:
      return 'Item';
  }
};

const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' => {
  switch (status.toLowerCase()) {
    case 'published':
      return 'default';
    case 'draft':
      return 'secondary';
    case 'archived':
      return 'outline';
    case 'active':
      return 'default';
    default:
      return 'outline';
  }
};

const formatTimeAgo = (date: Date, currentTime?: Date) => {
  const now = currentTime || new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const calculateThisMonth = (items: Array<Record<string, Date | string | number | undefined>>, dateField: string = 'createdAt'): number => {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return items.filter(item => {
    const dateValue = item[dateField];
    if (!dateValue) return false;
    const itemDate = new Date(dateValue as string | number | Date);
    return itemDate >= thisMonth;
  }).length;
};

export default function DashboardPage() {
  const { setPageTitle, setBreadcrumbs, showToast } = useDashboard();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Fetch all data in parallel
      const [newsRes, documentsRes, pressReleasesRes, eventsRes, mediaRes] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/documents'), 
        fetch('/api/press-releases'),
        fetch('/api/events'),
        fetch('/api/media')
      ]);

      const [newsData, documentsData, pressReleasesData, eventsData, mediaData] = await Promise.all([
        newsRes.json(),
        documentsRes.json(),
        pressReleasesRes.json(),
        eventsRes.json(),
        mediaRes.json()
      ]);

      // Process the data
      const newsItems = newsData.success ? newsData.news || [] : [];
      const documentItems = documentsData.success ? documentsData.items || [] : [];
      const pressReleaseItems = pressReleasesData.success ? pressReleasesData.items || [] : [];
      const eventItems = eventsData.success ? eventsData.items || [] : [];
      const mediaItems = mediaData.success ? mediaData.items || [] : [];

      // Calculate stats
      const dashboardStats: DashboardStats = {
        news: {
          total: newsItems.length,
          published: newsItems.filter((item: NewsArticle) => item.status === 'published').length,
          thisMonth: calculateThisMonth(newsItems)
        },
        documents: {
          total: documentItems.length,
          published: documentItems.filter((item: DocumentItem) => item.status === 'published').length,
          thisMonth: calculateThisMonth(documentItems)
        },
        pressReleases: {
          total: pressReleaseItems.length,
          published: pressReleaseItems.filter((item: {status: string}) => item.status === 'published').length,
          thisMonth: calculateThisMonth(pressReleaseItems)
        },
        events: {
          total: eventItems.length,
          upcoming: eventItems.filter((item: EventItem) => 
            item.state === 'upcoming' && new Date(item.start_at) > new Date()
          ).length,
          thisMonth: calculateThisMonth(eventItems)
        },
        media: {
          total: mediaItems.length,
          thisMonth: calculateThisMonth(mediaItems)
        }
      };

      setStats(dashboardStats);

      // Combine and sort recent items
      const allRecentItems: RecentItem[] = [
        ...newsItems.slice(0, 3).map((item: NewsArticle) => ({
          id: item.id || '',
          title: item.title,
          type: 'news' as const,
          status: item.status,
          createdAt: new Date(item.createdAt || Date.now()),
          author: item.created_by_name || item.author
        })),
        ...documentItems.slice(0, 3).map((item: DocumentItem) => ({
          id: item.id || '',
          title: item.title,
          type: 'document' as const,
          status: item.status,
          createdAt: new Date(item.createdAt || Date.now()),
          author: item.created_by_name || item.author || 'Unknown'
        })),
        ...pressReleaseItems.slice(0, 2).map((item: {id?: string; title: string; status: string; createdAt?: Date; created_by_name?: string; author?: string}) => ({
          id: item.id || '',
          title: item.title,
          type: 'press-release' as const,
          status: item.status,
          createdAt: new Date(item.createdAt || Date.now()),
          author: item.created_by_name || item.author
        })),
        ...eventItems.slice(0, 2).map((item: EventItem) => ({
          id: item.id || '',
          title: item.title,
          type: 'event' as const,
          status: item.status,
          createdAt: new Date(item.createdAt || Date.now()),
          author: item.created_by_name || 'Unknown'
        })),
        ...mediaItems.slice(0, 2).map((item: MediaItem) => ({
          id: item.id || '',
          title: item.title,
          type: 'media' as const,
          status: item.status || 'active',
          createdAt: new Date(item.createdAt || Date.now()),
          author: item.created_by_name || 'Unknown'
        }))
      ];

      // Sort by creation date and take the 8 most recent
      const sortedRecentItems = allRecentItems
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 8);

      setRecentItems(sortedRecentItems);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showToast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    setPageTitle('Dashboard');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
    ]);
    
    fetchDashboardData();
  }, [setPageTitle, setBreadcrumbs, fetchDashboardData]);

  // Set current time on client-side only to prevent hydration mismatch
  useEffect(() => {
    setCurrentTime(new Date());
    
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Generate stat cards from real data
  const getStatCards = (): StatCard[] => {
    if (!stats) return [];
    
    return [
      {
        title: 'News Articles',
        value: stats.news.total.toString(),
        change: stats.news.thisMonth > 0 ? `+${stats.news.thisMonth} this month` : 'No new articles this month',
        changeType: stats.news.thisMonth > 0 ? 'increase' : 'neutral',
        icon: Newspaper,
        href: '/dashboard/news',
      },
      {
        title: 'Documents',
        value: stats.documents.total.toString(),
        change: stats.documents.thisMonth > 0 ? `+${stats.documents.thisMonth} this month` : 'No new documents this month',
        changeType: stats.documents.thisMonth > 0 ? 'increase' : 'neutral',
        icon: FileText,
        href: '/dashboard/documents',
      },
      {
        title: 'Press Releases',
        value: stats.pressReleases.total.toString(),
        change: stats.pressReleases.thisMonth > 0 ? `+${stats.pressReleases.thisMonth} this month` : 'No new releases this month',
        changeType: stats.pressReleases.thisMonth > 0 ? 'increase' : 'neutral',
        icon: BarChart3,
        href: '/dashboard/press-releases',
      },
      {
        title: 'Upcoming Events',
        value: stats.events.upcoming.toString(),
        change: stats.events.thisMonth > 0 ? `+${stats.events.thisMonth} this month` : 'No new events this month',
        changeType: stats.events.thisMonth > 0 ? 'increase' : 'neutral',
        icon: Calendar,
        href: '/dashboard/events',
      },
    ];
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Loading your dashboard data...
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  const statCards = getStatCards();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your AGD administration today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : stat.changeType === 'decrease' ? (
                      <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
                    ) : (
                      <Activity className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used administration tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/news">
                <Newspaper className="mr-2 h-4 w-4" />
                Add News Article
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/documents">
                <FileText className="mr-2 h-4 w-4" />
                Upload Document
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/events">
                <Calendar className="mr-2 h-4 w-4" />
                Create Event
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/press-releases">
                <BarChart3 className="mr-2 h-4 w-4" />
                New Press Release
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Items */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>
                Latest items created in the system
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => fetchDashboardData()}
              disabled={isLoading}
            >
              Refresh
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {recentItems.length > 0 ? (
              <div className="space-y-4">
                {recentItems.map((item) => {
                  const Icon = getItemIcon(item.type);
                  return (
                    <div key={`${item.type}-${item.id}`} className="flex items-start gap-3">
                      <div className="rounded-full bg-muted p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none line-clamp-1">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusVariant(item.status)} className="text-xs">
                            {getTypeLabel(item.type)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            by {item.author}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {currentTime ? formatTimeAgo(item.createdAt, currentTime) : 'Loading...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No recent content found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Widgets */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Overview of system health and performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">File Storage</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Service</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">IFMIS Integration</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Operational
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Content Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
            <CardDescription>
              Summary of content in the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">News Articles</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{stats?.news.total || 0}</div>
                <div className="text-xs text-muted-foreground">{stats?.news.published || 0} published</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Press Releases</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{stats?.pressReleases.total || 0}</div>
                <div className="text-xs text-muted-foreground">{stats?.pressReleases.published || 0} published</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Documents</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{stats?.documents.total || 0}</div>
                <div className="text-xs text-muted-foreground">{stats?.documents.published || 0} published</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Events</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{stats?.events.total || 0}</div>
                <div className="text-xs text-muted-foreground">{stats?.events.upcoming || 0} upcoming</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Media Files</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{stats?.media.total || 0}</div>
                <div className="text-xs text-muted-foreground">total files</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 