'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { EventDialog } from '@/components/dashboard/AddEventDialog';
import { EventItem } from '@/lib/types';

const stateLabels: Record<EventItem['state'], string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  past: 'Past',
  cancelled: 'Cancelled',
  postponed: 'Postponed',
};

const statusLabels: Record<EventItem['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

const getStatusVariant = (status: EventItem['status']) => {
  switch (status) {
    case 'published': return 'default';
    case 'draft': return 'secondary';
    case 'archived': return 'outline';
  }
};

const getStateVariant = (state: EventItem['state']) => {
  switch (state) {
    case 'upcoming': return 'default';
    case 'ongoing': return 'secondary';
    case 'past': return 'outline';
    case 'cancelled': return 'outline';
    case 'postponed': return 'secondary';
  }
};

export default function EventsPage() {
  const { setPageTitle, setBreadcrumbs, showToast } = useDashboard();
  const [items, setItems] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; item: EventItem | null }>({ isOpen: false, item: null });
  const [viewDialog, setViewDialog] = useState<{ isOpen: boolean; item: EventItem | null }>({ isOpen: false, item: null });

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/events');
      const json = await res.json();
      if (json.success) setItems(json.items);
      else showToast.error('Failed to fetch events');
    } catch (e) {
      console.error('Error fetching events:', e);
      showToast.error('Failed to fetch events');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    setPageTitle('Events Management');
    setBreadcrumbs([{ label: 'Home', href: '/dashboard' }, { label: 'Events' }]);
    fetchEvents();
  }, [setPageTitle, setBreadcrumbs, fetchEvents]);

  const filtered = items.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.type || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setItems(items.filter((x) => x.id !== id));
        showToast.success('Event deleted successfully');
      } else {
        showToast.error(json.error || 'Failed to delete event');
      }
    } catch (e) {
      console.error('Error deleting event:', e);
      showToast.error('Failed to delete event');
    }
  };

  const handleDeleteClick = (item: EventItem) => setDeleteDialog({ isOpen: true, item });
  const handleViewClick = (item: EventItem) => setViewDialog({ isOpen: true, item });

  const handleStatusChange = async (id: string, newStatus: EventItem['status']) => {
    try {
      const current = items.find((x) => x.id === id);
      if (!current) { showToast.error('Event not found'); return; }
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setItems(items.map((x) => (x.id === id ? json.item : x)));
        showToast.success(`Event status changed to ${newStatus}`);
      } else {
        showToast.error(json.error || 'Failed to update event status');
      }
    } catch (e) {
      console.error('Error updating event status:', e);
      showToast.error('Failed to update event status');
    }
  };

  const handleCreate = async (data: EventItem) => {
    try {
      const res = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (json.success) { setItems([json.item, ...items]); showToast.success('Event created successfully'); }
      else showToast.error(json.error || 'Failed to create event');
    } catch (e) {
      console.error('Error creating event:', e);
      showToast.error('Failed to create event');
    }
  };

  const handleUpdate = async (id: string, data: Partial<EventItem>) => {
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (json.success) { setItems(items.map((x) => (x.id === id ? json.item : x))); showToast.success('Event updated successfully'); }
      else showToast.error(json.error || 'Failed to update event');
    } catch (e) {
      console.error('Error updating event:', e);
      showToast.error('Failed to update event');
    }
  };

  const formatDateTime = (iso?: string | null) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
          <p className="text-muted-foreground">Create, schedule, and publish AGD events.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-10" />
            {searchQuery && (
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')} className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-muted">
                <span className="text-muted-foreground">×</span>
              </Button>
            )}
          </div>
          <EventDialog mode={editing ? 'edit' : 'add'} existingEvent={editing} onEventCreate={handleCreate} onEventUpdate={handleUpdate} onClose={() => setEditing(null)} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Events ({filtered.length}
                {searchQuery && filtered.length !== items.length && (<span className="text-muted-foreground"> of {items.length}</span>)})
              </CardTitle>
              <CardDescription>
                {searchQuery ? <>Showing results for &quot;{searchQuery}&quot;</> : <>Manage your events and their publication status.</>}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[38%]">Event</TableHead>
                  <TableHead className="w-[14%]">Type</TableHead>
                  <TableHead className="w-[12%]">State</TableHead>
                  <TableHead className="w-[12%]">Status</TableHead>
                  <TableHead className="w-[16%]">Start</TableHead>
                  <TableHead className="w-[8%]">Views</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading events...</TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No events found.</TableCell></TableRow>
                ) : (
                  filtered.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            <span className="truncate">{e.title}</span>
                            {e.featured && (<Badge variant="secondary" className="text-xs shrink-0">Featured</Badge>)}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{e.excerpt}</div>
                          <div className="text-xs text-muted-foreground flex gap-3">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.location}</span>
                            <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" />{formatDateTime(e.start_at)}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{e.type}</Badge></TableCell>
                      <TableCell><Badge variant={getStateVariant(e.state)}>{stateLabels[e.state]}</Badge></TableCell>
                      <TableCell><Badge variant={getStatusVariant(e.status)}>{statusLabels[e.status]}</Badge></TableCell>
                      <TableCell>{formatDateTime(e.start_at)}</TableCell>
                      <TableCell>{(e.views || 0).toLocaleString()}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewClick(e)} className="cursor-pointer"><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditing(e)} className="cursor-pointer"><Edit className="mr-2 h-4 w-4" />Edit Event</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {e.status === 'draft' && (<DropdownMenuItem onClick={() => handleStatusChange(e.id || '', 'published')} className="cursor-pointer">Publish</DropdownMenuItem>)}
                            {e.status === 'published' && (<DropdownMenuItem onClick={() => handleStatusChange(e.id || '', 'draft')} className="cursor-pointer">Unpublish</DropdownMenuItem>)}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(e)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
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

      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, item: null })}
        onConfirm={async () => { if (deleteDialog.item?.id) { await handleDelete(deleteDialog.item.id); setDeleteDialog({ isOpen: false, item: null }); } }}
        title="Delete Event"
        description={`Are you sure you want to delete "${deleteDialog.item?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      <Dialog open={viewDialog.isOpen} onOpenChange={(open) => setViewDialog({ isOpen: open, item: viewDialog.item })}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary text-2xl font-bold">
              <CalendarIcon className="h-5 w-5 text-secondary" />
              Event Details
            </DialogTitle>
            <DialogDescription>View complete information about the selected event</DialogDescription>
          </DialogHeader>

          {viewDialog.item && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{viewDialog.item.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{viewDialog.item.location}</span></div>
                      <div className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" /><span>{formatDateTime(viewDialog.item.start_at)}</span></div>
                      <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{viewDialog.item.end_at ? formatDateTime(viewDialog.item.end_at) : '—'}</span></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStateVariant(viewDialog.item.state)}>{stateLabels[viewDialog.item.state]}</Badge>
                    <Badge variant={getStatusVariant(viewDialog.item.status)}>{statusLabels[viewDialog.item.status]}</Badge>
                    {viewDialog.item.featured && (<Badge variant="secondary">Featured</Badge>)}
                  </div>
                </div>
                {viewDialog.item.excerpt && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">{viewDialog.item.excerpt}</p>
                  </div>
                )}
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  {viewDialog.item.image_url && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Image</h3>
                      <div className="relative aspect-video rounded-lg overflow-hidden border">
                        <Image src={viewDialog.item.image_url} alt={viewDialog.item.title} fill className="object-cover" />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Details</h3>
                    <div className="prose prose-sm max-w-none">
                      <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: viewDialog.item.content }} />
                    </div>
                  </div>
                  {viewDialog.item.tags && viewDialog.item.tags.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Tags</h3>
                      <div className="flex flex-wrap gap-2">{viewDialog.item.tags.map((t, i) => (<Badge key={i} variant="outline" className="text-xs"><Tag className="mr-1 h-3 w-3" />{t}</Badge>))}</div>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Metadata</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div><label className="text-xs font-medium text-muted-foreground">Created by</label><p className="text-sm">{viewDialog.item.created_by_name || 'Unknown'}</p></div>
                      <div><label className="text-xs font-medium text-muted-foreground">Created at</label><p className="text-sm">{viewDialog.item.createdAt ? `${new Date(viewDialog.item.createdAt as unknown as string).toLocaleDateString()} at ${new Date(viewDialog.item.createdAt as unknown as string).toLocaleTimeString()}` : '—'}</p></div>
                      <div><label className="text-xs font-medium text-muted-foreground">Last updated</label><p className="text-sm">{viewDialog.item.updatedAt ? `${new Date(viewDialog.item.updatedAt as unknown as string).toLocaleDateString()} at ${new Date(viewDialog.item.updatedAt as unknown as string).toLocaleTimeString()}` : '—'}</p></div>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">SEO Information</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div><label className="text-xs font-medium text-muted-foreground">Meta Title</label><p className="text-sm">{viewDialog.item.meta_title || 'Not set'}</p></div>
                      <div><label className="text-xs font-medium text-muted-foreground">Meta Description</label><p className="text-sm">{viewDialog.item.meta_description || 'Not set'}</p></div>
                      <div><label className="text-xs font-medium text-muted-foreground">Slug</label><p className="text-sm font-mono">{viewDialog.item.slug}</p></div>
                      <div><label className="text-xs font-medium text-muted-foreground">Views</label><p className="text-sm">{(viewDialog.item.views || 0).toLocaleString()}</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setViewDialog({ isOpen: false, item: null })}>Close</Button>
                {viewDialog.item.status === 'published' && (
                  <Button variant="outline" asChild>
                    <Link href={`/events/${viewDialog.item.slug}`} target="_blank"><ExternalLink className="mr-2 h-4 w-4" />View Public</Link>
                  </Button>
                )}
                <Button onClick={() => { setViewDialog({ isOpen: false, item: null }); setEditing(viewDialog.item); }}><Edit className="mr-2 h-4 w-4" />Edit Event</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


