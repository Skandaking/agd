'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MediaDialog } from '@/components/dashboard/AddMediaDialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Download,
  Image as ImageIcon,
  Video,
  FileText,
  Tag,
  Grid3X3,
  List,
  Filter,
  Upload
} from 'lucide-react';
import { MediaItem } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  photo: 'Photo',
  video: 'Video',
};

const statusLabels: Record<MediaItem['status'], string> = {
  active: 'Active',
  archived: 'Archived',
};

const getStatusVariant = (status: MediaItem['status']) => {
  switch (status) {
    case 'active':
      return 'default';
    case 'archived':
      return 'outline';
  }
};

const getCategoryVariant = (category: string) => {
  switch (category) {
    case 'photo':
      return 'default';
    case 'video':
      return 'secondary';
    default:
      return 'outline';
  }
};

export default function MediaPage() {
  const { setPageTitle, setBreadcrumbs, showToast } = useDashboard();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Confirmation dialog state for delete
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; media: MediaItem | null }>({ isOpen: false, media: null });
  
  // View dialog state for viewing media details
  const [viewDialog, setViewDialog] = useState<{ isOpen: boolean; media: MediaItem | null }>({ isOpen: false, media: null });

  const fetchMediaItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/media');
      const result = await response.json();
      
      if (result.success) {
        console.log('API Response:', result.items);
        setMediaItems(result.items);
      } else {
        showToast.error('Failed to fetch media items');
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      showToast.error('Failed to fetch media items');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    setPageTitle('Media Gallery');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
      { label: 'Media' },
    ]);
    fetchMediaItems();
  }, [setPageTitle, setBreadcrumbs, fetchMediaItems]);

  const filteredMedia = mediaItems.filter((media) => {
    const matchesSearch = 
      media.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (media.description && media.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (media.alt_text && media.alt_text.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || media.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMediaItems(mediaItems.filter(media => media.id !== id));
        showToast.success('Media item deleted successfully');
      } else {
        showToast.error(result.error || 'Failed to delete media item');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      showToast.error('Failed to delete media item');
    }
  };

  const handleDeleteClick = (media: MediaItem) => {
    setDeleteDialog({ isOpen: true, media });
  };

  const handleViewClick = (media: MediaItem) => {
    setViewDialog({ isOpen: true, media });
  };

  const handleStatusChange = async (id: string, newStatus: MediaItem['status']) => {
    try {
      // Find the current media item to get all its data
      const currentMedia = mediaItems.find(media => media.id === id);
      if (!currentMedia) {
        showToast.error('Media item not found');
        return;
      }

      // Send complete media data with updated status
      const response = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentMedia,
          status: newStatus
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMediaItems(mediaItems.map(media => 
          media.id === id ? result.item : media
        ));
        showToast.success(`Media status changed to ${newStatus}`);
      } else {
        showToast.error(result.error || 'Failed to update media status');
      }
    } catch (error) {
      console.error('Error updating media status:', error);
      showToast.error('Failed to update media status');
    }
  };

  const handleCreateMedia = async (mediaData: MediaItem) => {
    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaData),
      });

      const result = await response.json();
      
      if (result.success) {
        setMediaItems([result.item, ...mediaItems]);
        showToast.success('Media item created successfully');
      } else {
        showToast.error(result.error || 'Failed to create media item');
      }
    } catch (error) {
      console.error('Error creating media:', error);
      showToast.error('Failed to create media item');
    }
  };

  const handleUpdateMedia = async (mediaId: string, mediaData: Partial<MediaItem>) => {
    try {
      console.log('Updating media:', { mediaId, mediaData });
      
      const response = await fetch(`/api/media/${mediaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaData),
      });

      const result = await response.json();
      console.log('Update response:', result);
      
      if (result.success) {
        setMediaItems(mediaItems.map(media => 
          media.id === mediaId ? result.item : media
        ));
        showToast.success('Media item updated successfully');
      } else {
        showToast.error(result.error || 'Failed to update media item');
      }
    } catch (error) {
      console.error('Error updating media:', error);
      showToast.error('Failed to update media item');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getMediaIcon = (mime: string) => {
    if (mime.startsWith('image/')) return <ImageIcon className="h-4 w-4 text-blue-600" />;
    if (mime.startsWith('video/')) return <Video className="h-4 w-4 text-red-600" />;
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  };

  const getMediaTypeName = (mime: string) => {
    if (mime.startsWith('image/')) return 'Image';
    if (mime.startsWith('video/')) return 'Video';
    if (mime.startsWith('audio/')) return 'Audio';
    return 'File';
  };

  const isImage = (mime: string) => mime.startsWith('image/');
  const isVideo = (mime: string) => mime.startsWith('video/');

  const handleDownload = (media: MediaItem) => {
    if (media.id) {
      window.open(media.file_url, '_blank');
    }
  };

  const categories = Array.from(new Set(mediaItems.map(item => item.category)));

  return (
    <div className="space-y-6 w-full">
      {/* Page Header with Stats */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Gallery</h1>
          <p className="text-muted-foreground">
            Upload, manage, and organize your media files.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search media..."
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
          <MediaDialog 
            mode={editingMedia ? "edit" : "add"}
            existingMedia={editingMedia}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onMediaCreate={handleCreateMedia}
            onMediaUpdate={handleUpdateMedia}
            onClose={() => {
              setEditingMedia(null);
              setIsDialogOpen(false);
            }}
          />
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {categoryFilter === 'all' ? 'All Categories' : categoryLabels[categoryFilter] || categoryFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                All Categories
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                  {categoryLabels[category] || category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Media Grid/List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Media Items ({filteredMedia.length}
                {searchQuery && filteredMedia.length !== mediaItems.length && (
                  <span className="text-muted-foreground"> of {mediaItems.length}</span>
                )}
                )
              </CardTitle>
              <CardDescription>
                {searchQuery ? (
                  <>Showing results for &quot;{searchQuery}&quot;</>
                ) : (
                  <>Manage your media files and their metadata.</>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading media items...
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {mediaItems.length === 0 ? (
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <div>
                    <h3 className="text-lg font-medium">No media files yet</h3>
                    <p className="text-sm">Upload your first photo or video to get started.</p>
                  </div>
                </div>
              ) : (
                'No media items found matching your criteria.'
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((media) => (
                <Card key={media.id} className="group relative overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square relative bg-gray-100">
                    {isImage(media.file_mime) ? (
                      <Image
                        src={media.file_url}
                        alt={media.alt_text || media.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                    ) : isVideo(media.file_mime) ? (
                      <div className="flex items-center justify-center h-full bg-gray-900">
                        <Video className="h-12 w-12 text-white" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => handleViewClick(media)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => {
                          setEditingMedia(media);
                          setIsDialogOpen(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="secondary">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleDownload(media)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {media.status === 'active' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(media.id || '', 'archived')}>
                                Archive
                              </DropdownMenuItem>
                            )}
                            {media.status === 'archived' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(media.id || '', 'active')}>
                                Restore
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteClick(media)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm line-clamp-1" title={media.title}>
                          {media.title}
                        </h3>
                        <Badge variant={getStatusVariant(media.status)} className="text-xs">
                          {statusLabels[media.status]}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {getMediaIcon(media.file_mime)}
                        <span>{getMediaTypeName(media.file_mime)}</span>
                        <span>•</span>
                        <span>{formatFileSize(media.file_size_bytes)}</span>
                      </div>
                      
                      <Badge variant={getCategoryVariant(media.category)} className="text-xs">
                        {categoryLabels[media.category] || media.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMedia.map((media) => (
                <Card key={media.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {isImage(media.file_mime) ? (
                          <Image
                            src={media.file_url}
                            alt={media.alt_text || media.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            {getMediaIcon(media.file_mime)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium text-sm">{media.title}</h3>
                            {media.description && (
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {media.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                {getMediaIcon(media.file_mime)}
                                {getMediaTypeName(media.file_mime)}
                              </span>
                              <span>{formatFileSize(media.file_size_bytes)}</span>
                              {media.width && media.height && (
                                <span>{media.width} × {media.height}</span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {media.createdAt ? new Date(media.createdAt).toLocaleDateString() : '—'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant={getCategoryVariant(media.category)} className="text-xs">
                              {categoryLabels[media.category] || media.category}
                            </Badge>
                            <Badge variant={getStatusVariant(media.status)} className="text-xs">
                              {statusLabels[media.status]}
                            </Badge>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewClick(media)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  setEditingMedia(media);
                                  setIsDialogOpen(true);
                                }}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Media
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(media)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {media.status === 'active' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(media.id || '', 'archived')}>
                                    Archive
                                  </DropdownMenuItem>
                                )}
                                {media.status === 'archived' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(media.id || '', 'active')}>
                                    Restore
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteClick(media)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, media: null })}
        onConfirm={async () => {
          if (deleteDialog.media) {
            await handleDelete(deleteDialog.media.id || '');
            setDeleteDialog({ isOpen: false, media: null });
          }
        }}
        title="Delete Media Item"
        description={`Are you sure you want to delete "${deleteDialog.media?.title}"? This action cannot be undone and will also delete the associated file.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* View Media Dialog */}
      <Dialog open={viewDialog.isOpen} onOpenChange={(open) => setViewDialog({ isOpen: open, media: viewDialog.media })}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary text-2xl font-bold">
              <ImageIcon className="h-5 w-5 text-secondary" />
              Media Details
            </DialogTitle>
            <DialogDescription>
              View complete information about the selected media item
            </DialogDescription>
          </DialogHeader>
          
          {viewDialog.media && (
            <div className="space-y-6">
              {/* Media Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span className="text-2xl">{getMediaIcon(viewDialog.media.file_mime)}</span>
                      {viewDialog.media.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{viewDialog.media.created_by_name || 'Unknown'}</span>
                      </div>
                      {viewDialog.media.createdAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(viewDialog.media.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getCategoryVariant(viewDialog.media.category)}>
                      {categoryLabels[viewDialog.media.category] || viewDialog.media.category}
                    </Badge>
                    <Badge variant={getStatusVariant(viewDialog.media.status)}>
                      {statusLabels[viewDialog.media.status]}
                    </Badge>
                  </div>
                </div>
                
                {/* Description */}
                {viewDialog.media.description && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{viewDialog.media.description}</p>
                  </div>
                )}
              </div>

              {/* Two-column layout for large screens */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Media Preview */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Preview</h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-gray-100">
                      {isImage(viewDialog.media.file_mime) ? (
                        <Image
                          src={viewDialog.media.file_url}
                          alt={viewDialog.media.alt_text || viewDialog.media.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                      ) : isVideo(viewDialog.media.file_mime) ? (
                        <video
                          src={viewDialog.media.file_url}
                          controls
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <FileText className="h-16 w-16 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Preview not available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Information */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">File Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">File Name</label>
                          <p className="text-sm font-mono">{viewDialog.media.file_name}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">File Size</label>
                          <p className="text-sm">{formatFileSize(viewDialog.media.file_size_bytes)}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">File Type</label>
                          <p className="text-sm">{getMediaTypeName(viewDialog.media.file_mime)}</p>
                        </div>
                        {viewDialog.media.width && viewDialog.media.height && (
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Dimensions</label>
                            <p className="text-sm">{viewDialog.media.width} × {viewDialog.media.height}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={() => handleDownload(viewDialog.media!)}
                          className="w-full"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download File
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {viewDialog.media.tags && viewDialog.media.tags.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {viewDialog.media.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Metadata</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Alt Text</label>
                        <p className="text-sm">{viewDialog.media.alt_text || '—'}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Usage Count</label>
                        <p className="text-sm">{viewDialog.media.usage_count || 0}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Created at</label>
                        <p className="text-sm">
                          {viewDialog.media.createdAt ? (
                            <>
                              {new Date(viewDialog.media.createdAt as unknown as string).toLocaleDateString()} at {new Date(viewDialog.media.createdAt as unknown as string).toLocaleTimeString()}
                            </>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Last updated</label>
                        <p className="text-sm">
                          {viewDialog.media.updatedAt ? (
                            <>
                              {new Date(viewDialog.media.updatedAt as unknown as string).toLocaleDateString()} at {new Date(viewDialog.media.updatedAt as unknown as string).toLocaleTimeString()}
                            </>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setViewDialog({ isOpen: false, media: null })}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(viewDialog.media!)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  onClick={() => {
                    setViewDialog({ isOpen: false, media: null });
                    setEditingMedia(viewDialog.media);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Media
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
