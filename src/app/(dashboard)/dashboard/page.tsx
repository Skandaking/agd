'use client';

import { useEffect } from 'react';
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
  Image as ImageIcon
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const stats: StatCard[] = [
  {
    title: 'Total News Articles',
    value: '24',
    change: '+3 this month',
    changeType: 'increase',
    icon: Newspaper,
    href: '/dashboard/news',
  },
  {
    title: 'Documents',
    value: '156',
    change: '+12 this month',
    changeType: 'increase',
    icon: FileText,
    href: '/dashboard/documents',
  },
  {
    title: 'Press Releases',
    value: '18',
    change: '+2 this month',
    changeType: 'increase',
    icon: BarChart3,
    href: '/dashboard/press-releases',
  },
  {
    title: 'Upcoming Events',
    value: '8',
    change: '+5 this month',
    changeType: 'increase',
    icon: Calendar,
    href: '/dashboard/events',
  },
];

interface Activity {
  id: string;
  action: string;
  user: string;
  timestamp: Date;
  type: 'news' | 'document' | 'event' | 'media';
}

const recentActivities: Activity[] = [
  {
    id: '1',
    action: 'Published new financial report',
    user: 'Admin User',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    type: 'document',
  },
  {
    id: '2',
    action: 'Created press release about IFMIS update',
    user: 'John Doe',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    type: 'news',
  },
  {
    id: '3',
    action: 'Scheduled training workshop event',
    user: 'Jane Smith',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    type: 'event',
  },
  {
    id: '4',
    action: 'Uploaded new gallery images',
    user: 'Media Team',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    type: 'media',
  },
  {
    id: '5',
    action: 'Updated organization policies',
    user: 'Admin User',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    type: 'document',
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'news':
      return Newspaper;
    case 'document':
      return FileText;
    case 'event':
      return Calendar;
    case 'media':
      return ImageIcon;
    default:
      return Activity;
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export default function DashboardPage() {
  const { setPageTitle, setBreadcrumbs } = useDashboard();

  useEffect(() => {
    setPageTitle('Dashboard');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
    ]);
  }, [setPageTitle, setBreadcrumbs]);

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
        {stats.map((stat) => {
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
                    <TrendingUp className="h-3 w-3" />
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

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions performed in the system
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/activity">
                View all
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="rounded-full bg-muted p-2">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          by {activity.user}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {formatTimeAgo(activity.timestamp)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
              Summary of published content this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">News Articles</span>
              </div>
              <span className="text-sm font-medium">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Press Releases</span>
              </div>
              <span className="text-sm font-medium">18</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Documents</span>
              </div>
              <span className="text-sm font-medium">156</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Events</span>
              </div>
              <span className="text-sm font-medium">8</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 