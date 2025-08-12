'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PressReleaseDialog } from '@/components/dashboard/AddPressReleaseDialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  ExternalLink,
  Megaphone
} from 'lucide-react';

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

const categoryLabels: Record<string, string> = {
  announcement: 'Announcement',
  update: 'System Update',
  policy: 'Policy',
  event: 'Event',
  achievement: 'Achievement',
  partnership: 'Partnership',
  technology: 'Technology',
  financial: 'Financial',
};

const statusLabels: Record<PressRelease['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

const getStatusVariant = (status: PressRelease['status']) => {
  switch (status) {
    case 'published':
      return 'default';
    case 'draft':
      return 'secondary';
    case 'archived':
      return 'outline';
  }
};

const getCategoryVariant = (category: string) => {
  switch (category) {
    case 'announcement':
      return 'default';
    case 'update':
      return 'secondary';
    case 'policy':
      return 'outline';
    case 'event':
      return 'secondary';
    case 'achievement':
      return 'default';
    case 'partnership':
      return 'outline';
    case 'technology':
      return 'secondary';
    case 'financial':
      return 'outline';
  }
};

export default function PressReleasesPage() {
  const { setPageTitle, setBreadcrumbs, showToast } = useDashboard();
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRelease, setEditingRelease] = useState<PressRelease | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Confirmation dialog state for delete
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; release: PressRelease | null }>({ isOpen: false, release: null });
  
  // View dialog state for viewing press release details
  const [viewDialog, setViewDialog] = useState<{ isOpen: boolean; release: PressRelease | null }>({ isOpen: false, release: null });

  const fetchReleases = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/press-releases');
      const result = await response.json();
      
      if (result.success) {
        console.log('API Response:', result.items);
        setReleases(result.items);
      } else {
        showToast.error('Failed to fetch press releases');
      }
    } catch (error) {
      console.error('Error fetching press releases:', error);
      showToast.error('Failed to fetch press releases');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    setPageTitle('Press Releases Management');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
      { label: 'Press Releases' },
    ]);
    fetchReleases();
  }, [setPageTitle, setBreadcrumbs, fetchReleases]);

  const filteredReleases = releases.filter((release) => {
    const matchesSearch = 
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/press-releases/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setReleases(releases.filter(release => release.id !== id));
        showToast.success('Press release deleted successfully');
      } else {
        showToast.error(result.error || 'Failed to delete press release');
      }
    } catch (error) {
      console.error('Error deleting press release:', error);
      showToast.error('Failed to delete press release');
    }
  };

  const handleDeleteClick = (release: PressRelease) => {
    setDeleteDialog({ isOpen: true, release });
  };

  const handleViewClick = (release: PressRelease) => {
    setViewDialog({ isOpen: true, release });
  };

  const handleStatusChange = async (id: string, newStatus: PressRelease['status']) => {
    try {
      // Find the current release to get all its data
      const currentRelease = releases.find(release => release.id === id);
      if (!currentRelease) {
        showToast.error('Release not found');
        return;
      }

      // Send complete release data with updated status
      const response = await fetch(`/api/press-releases/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentRelease,
          status: newStatus
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setReleases(releases.map(release => 
          release.id === id ? result.item : release
        ));
        showToast.success(`Press release status changed to ${newStatus}`);
      } else {
        showToast.error(result.error || 'Failed to update press release status');
      }
    } catch (error) {
      console.error('Error updating press release status:', error);
      showToast.error('Failed to update press release status');
    }
  };

  const handleCreateRelease = async (releaseData: PressRelease) => {
    try {
      const response = await fetch('/api/press-releases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(releaseData),
      });

      const result = await response.json();
      
      if (result.success) {
        setReleases([result.item, ...releases]);
        showToast.success('Press release created successfully');
      } else {
        showToast.error(result.error || 'Failed to create press release');
      }
    } catch (error) {
      console.error('Error creating press release:', error);
      showToast.error('Failed to create press release');
    }
  };

  const handleUpdateRelease = async (releaseId: string, releaseData: Partial<PressRelease>) => {
    try {
      console.log('Updating press release:', { releaseId, releaseData });
      
      const response = await fetch(`/api/press-releases/${releaseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(releaseData),
      });

      const result = await response.json();
      console.log('Update response:', result);
      
      if (result.success) {
        setReleases(releases.map(release => 
          release.id === releaseId ? result.item : release
        ));
        showToast.success('Press release updated successfully');
      } else {
        showToast.error(result.error || 'Failed to update press release');
      }
    } catch (error) {
      console.error('Error updating press release:', error);
      showToast.error('Failed to update press release');
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Header with Stats */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Press Releases Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and publish press releases and official announcements.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search press releases..."
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
          <PressReleaseDialog 
            mode={editingRelease ? "edit" : "add"}
            existingRelease={editingRelease}
            onReleaseCreate={handleCreateRelease}
            onReleaseUpdate={handleUpdateRelease}
            onClose={() => {
              setEditingRelease(null);
            }}
          />
        </div>
      </div>
      
      {/* Press Releases Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Press Releases ({filteredReleases.length}
                {searchQuery && filteredReleases.length !== releases.length && (
                  <span className="text-muted-foreground"> of {releases.length}</span>
                )}
                )
              </CardTitle>
              <CardDescription>
                {searchQuery ? (
                  <>Showing results for &quot;{searchQuery}&quot;</>
                ) : (
                  <>Manage your press releases and their publication status.</>
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
                  <TableHead className="w-[40%]">Press Release</TableHead>
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
                      Loading press releases...
                    </TableCell>
                  </TableRow>
                ) : filteredReleases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No press releases found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReleases.map((release) => (
                    <TableRow key={release.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            <span className="truncate">{release.title}</span>
                            {release.featured && (
                              <Badge variant="secondary" className="text-xs shrink-0">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {release.excerpt}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getCategoryVariant(release.category)}>
                          {categoryLabels[release.category] || release.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(release.status)}>
                          {statusLabels[release.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{release.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {release.publishedAt ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm">
                              {new Date(release.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not published</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm">{(release.views || 0).toLocaleString()}</span>
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
                              onClick={() => handleViewClick(release)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setEditingRelease(release)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Press Release
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {release.status === 'draft' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(release.id || '', 'published')}
                                className="cursor-pointer"
                              >
                                Publish
                              </DropdownMenuItem>
                            )}
                            {release.status === 'published' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(release.id || '', 'draft')}
                                className="cursor-pointer"
                              >
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteClick(release)}
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
        onClose={() => setDeleteDialog({ isOpen: false, release: null })}
        onConfirm={async () => {
          if (deleteDialog.release) {
            await handleDelete(deleteDialog.release.id || '');
            setDeleteDialog({ isOpen: false, release: null });
          }
        }}
        title="Delete Press Release"
        description={`Are you sure you want to delete "${deleteDialog.release?.title}"? This action cannot be undone and will also delete the associated image file.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* View Press Release Dialog */}
      <Dialog open={viewDialog.isOpen} onOpenChange={(open) => setViewDialog({ isOpen: open, release: viewDialog.release })}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Press Release Details
            </DialogTitle>
            <DialogDescription>
              View complete information about the selected press release
            </DialogDescription>
          </DialogHeader>
          
          {viewDialog.release && (
            <div className="space-y-6">
              {/* Press Release Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{viewDialog.release.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{viewDialog.release.author}</span>
                      </div>
                      {viewDialog.release.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(viewDialog.release.publishedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{viewDialog.release.reading_time_minutes || '5'} min read</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getCategoryVariant(viewDialog.release.category)}>
                      {categoryLabels[viewDialog.release.category] || viewDialog.release.category}
                    </Badge>
                    <Badge variant={getStatusVariant(viewDialog.release.status)}>
                      {statusLabels[viewDialog.release.status]}
                    </Badge>
                    {viewDialog.release.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                </div>
                
                {/* Excerpt */}
                {viewDialog.release.excerpt && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Excerpt</h3>
                    <p className="text-muted-foreground leading-relaxed">{viewDialog.release.excerpt}</p>
                  </div>
                )}
              </div>

              {/* Press Release Image */}
              {viewDialog.release.image_url && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Featured Image</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <Image
                      src={viewDialog.release.image_url}
                      alt={viewDialog.release.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Press Release Content */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Content</h3>
                <div className="prose prose-sm max-w-none">
                  <div 
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: viewDialog.release.content }}
                  />
                </div>
              </div>

              {/* Press Release Metadata */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Created by</label>
                    <p className="text-sm text-muted-foreground">{viewDialog.release.created_by_name || 'Unknown'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Created at</label>
                    <p className="text-sm text-muted-foreground">
                      {viewDialog.release.createdAt ? (
                        <>
                          {new Date(viewDialog.release.createdAt as unknown as string).toLocaleDateString()} at {new Date(viewDialog.release.createdAt as unknown as string).toLocaleTimeString()}
                        </>
                      ) : (
                        '—'
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last updated</label>
                    <p className="text-sm text-muted-foreground">
                      {viewDialog.release.updatedAt ? (
                        <>
                          {new Date(viewDialog.release.updatedAt as unknown as string).toLocaleDateString()} at {new Date(viewDialog.release.updatedAt as unknown as string).toLocaleTimeString()}
                        </>
                      ) : (
                        '—'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* SEO Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">SEO Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Title</label>
                    <p className="text-sm text-muted-foreground">{viewDialog.release.meta_title || 'Not set'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Description</label>
                    <p className="text-sm text-muted-foreground">{viewDialog.release.meta_description || 'Not set'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <p className="text-sm text-muted-foreground font-mono">{viewDialog.release.slug}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Views</label>
                    <p className="text-sm text-muted-foreground">{(viewDialog.release.views || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {viewDialog.release.tags && viewDialog.release.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewDialog.release.tags.map((tag, index) => (
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
                  onClick={() => setViewDialog({ isOpen: false, release: null })}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setViewDialog({ isOpen: false, release: null });
                    setEditingRelease(viewDialog.release);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Press Release
                </Button>
                {viewDialog.release.status === 'published' && (
                  <Button variant="outline" asChild>
                    <Link href={`/press-releases/${viewDialog.release.slug}`} target="_blank">
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
