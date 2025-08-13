'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Save, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { EventItem } from '@/lib/types';

interface EventDialogProps {
  onEventCreate?: (data: EventItem) => Promise<void>;
  onEventUpdate?: (id: string, data: Partial<EventItem>) => Promise<void>;
  onClose?: () => void;
  existingEvent?: EventItem | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

const STATE_OPTIONS: Array<{ value: EventItem['state']; label: string }> = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'past', label: 'Past' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'postponed', label: 'Postponed' },
];

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' }
];

const DEFAULT_TYPES = ['Training', 'Conference', 'Seminar', 'Forum', 'Workshop', 'Meeting'];

export function EventDialog({ onEventCreate, onEventUpdate, onClose, existingEvent, mode = 'add', trigger }: EventDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customType, setCustomType] = useState('');
  const [showCustomType, setShowCustomType] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const getInitialData = (): EventItem => ({
    title: '',
    excerpt: '',
    content: '',
    type: 'Training',
    state: 'upcoming',
    status: 'draft',
    start_at: '',
    end_at: '',
    location: '',
    venue: '',
    registration_required: false,
    registration_deadline: '',
    registration_url: '',
    max_attendees: null,
    current_attendees: 0,
    featured: false,
    image_url: '',
  });
  const [data, setData] = useState<EventItem>(getInitialData());

  useEffect(() => {
    if (mode === 'edit' && existingEvent) {
      setData({
        ...existingEvent,
        start_at: existingEvent.start_at,
        end_at: existingEvent.end_at || '',
        registration_deadline: existingEvent.registration_deadline || '',
      });
      if (existingEvent.type && !DEFAULT_TYPES.includes(existingEvent.type)) {
        setCustomType(existingEvent.type);
        setShowCustomType(true);
      } else {
        setCustomType('');
        setShowCustomType(false);
      }
      setIsOpen(true);
    } else if (mode === 'add') {
      setData((d) => ({ ...d, start_at: '', end_at: '' }));
      setCustomType('');
      setShowCustomType(false);
    }
  }, [mode, existingEvent]);

  // no SEO auto-generation needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    const errors: string[] = [];
    if (!data.title?.trim()) errors.push('Title is required');
    if (!data.excerpt?.trim()) errors.push('Excerpt is required');
    if (!data.content?.trim()) errors.push('Content is required');
    if (!data.type?.trim()) errors.push('Type is required');
    if (!data.start_at?.trim()) errors.push('Start date/time is required');
    if (!data.location?.trim()) errors.push('Location is required');
    if (errors.length) { setValidationErrors(errors); return; }

    const finalData: EventItem = {
      ...data,
      type: showCustomType ? customType : data.type,
      registration_required: Boolean(data.registration_required),
      current_attendees: data.current_attendees ?? 0,
    };

    if (mode === 'edit' && existingEvent?.id) await onEventUpdate?.(existingEvent.id, finalData);
    else await onEventCreate?.(finalData);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    // reset form back to initial when closing
    setData(getInitialData());
    setCustomType('');
    setShowCustomType(false);
    setValidationErrors([]);
    setUploadProgress(0);
    setIsUploading(false);
    onClose?.();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) handleClose();
  };

  const handleTypeChange = (value: string) => {
    if (value === 'custom') { setShowCustomType(true); setData((p) => ({ ...p, type: customType })); }
    else { setShowCustomType(false); setData((p) => ({ ...p, type: value })); }
  };

  // no tags handling

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'events');
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) { setData((p) => ({ ...p, image_url: result.url })); setUploadProgress(100); }
      else throw new Error(result.error || 'Upload failed');
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            {mode === 'add' ? (<><Plus className="mr-2 h-4 w-4" />Add Event</>) : (<><Upload className="mr-2 h-4 w-4" />Edit Event</>)}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">{mode === 'add' ? 'Create New Event' : 'Edit Event'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {validationErrors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {validationErrors.map((err, i) => (<li key={i}>• {err}</li>))}
              </ul>
            </div>
          )}

          {/* Basic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title <span className="text-secondary">*</span></Label>
              <Input id="title" value={data.title} onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))} placeholder="Event title" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="type">Type <span className="text-secondary">*</span></Label>
              <Select value={data.type} onValueChange={handleTypeChange}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {DEFAULT_TYPES.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                  <SelectItem value="custom">Custom Type</SelectItem>
                </SelectContent>
              </Select>
              {showCustomType && (
                <Input value={customType} onChange={(e) => setCustomType(e.target.value)} placeholder="Enter custom type" className="mt-2" />
              )}
            </div>
            {/* Slug removed */}
          </div>

          {/* Scheduling + Status */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-1.5">
              <Label>State</Label>
              <Select value={data.state} onValueChange={(v: EventItem['state']) => setData((p) => ({ ...p, state: v }))}>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {STATE_OPTIONS.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={data.status} onValueChange={(v: 'draft' | 'published' | 'archived') => setData((p) => ({ ...p, status: v }))}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="start_at">Start (YYYY-MM-DD HH:MM)</Label>
              <Input id="start_at" value={data.start_at} onChange={(e) => setData((p) => ({ ...p, start_at: e.target.value }))} placeholder="2025-01-31 09:00" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="end_at">End (optional)</Label>
              <Input id="end_at" value={data.end_at || ''} onChange={(e) => setData((p) => ({ ...p, end_at: e.target.value }))} placeholder="2025-01-31 17:00" />
            </div>
            <div className="space-y-1.5">
              <Label>Featured</Label>
              <div className="flex items-center gap-2 pt-2"><Switch id="featured" checked={data.featured} onCheckedChange={(c) => setData((p) => ({ ...p, featured: c }))} /><Label htmlFor="featured" className="text-sm">Highlight</Label></div>
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="location">Location <span className="text-secondary">*</span></Label>
              <Input id="location" value={data.location} onChange={(e) => setData((p) => ({ ...p, location: e.target.value }))} placeholder="City, Building" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" value={data.venue || ''} onChange={(e) => setData((p) => ({ ...p, venue: e.target.value }))} placeholder="Hall name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="image">Image Upload</Label>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('event-image-upload')?.click()} disabled={isUploading} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />{isUploading ? 'Uploading...' : 'Upload'}
                </Button>
                {data.image_url && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setData((p) => ({ ...p, image_url: '' }))}>Remove</Button>
                )}
              </div>
              <input id="event-image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          </div>

          {/* Excerpt / Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="excerpt">Excerpt <span className="text-secondary">*</span></Label>
              <Textarea id="excerpt" value={data.excerpt} onChange={(e) => setData((p) => ({ ...p, excerpt: e.target.value }))} rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="content">Content <span className="text-secondary">*</span></Label>
              <Textarea id="content" value={data.content} onChange={(e) => setData((p) => ({ ...p, content: e.target.value }))} rows={6} />
            </div>
          </div>

          {/* Preview + Registration */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {data.image_url && (
              <div className="space-y-1.5">
                <Label>Image Preview</Label>
                <div className="relative w-full h-24 border rounded-md overflow-hidden">
                  <Image src={data.image_url} alt="Event image" fill className="object-cover" unoptimized sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <Input value={data.image_url} onChange={(e) => setData((p) => ({ ...p, image_url: e.target.value }))} className="text-xs" />
                {isUploading && (<div className="w-full bg-gray-200 rounded-full h-1"><div className="bg-blue-600 h-1 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div></div>)}
              </div>
            )}
            <div className="space-y-1.5 lg:col-span-2">
              <div className="mt-1 space-y-2">
                <div className="flex items-center gap-2"><Switch id="reg_required" checked={data.registration_required} onCheckedChange={(c) => setData((p) => ({ ...p, registration_required: c }))} /><Label htmlFor="reg_required" className="text-sm">Registration required</Label></div>
                <Input placeholder="Registration URL" value={data.registration_url || ''} onChange={(e) => setData((p) => ({ ...p, registration_url: e.target.value }))} />
                <Input placeholder="Registration deadline (YYYY-MM-DD HH:MM)" value={data.registration_deadline || ''} onChange={(e) => setData((p) => ({ ...p, registration_deadline: e.target.value }))} />
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Max attendees" value={data.max_attendees ?? ''} onChange={(e) => setData((p) => ({ ...p, max_attendees: e.target.value ? parseInt(e.target.value) : null }))} />
                  <Input type="number" placeholder="Current" value={data.current_attendees ?? 0} onChange={(e) => setData((p) => ({ ...p, current_attendees: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button type="button" variant="outline" onClick={handleClose}><X className="mr-2 h-4 w-4" />Cancel</Button>
            <Button type="submit"><Save className="mr-2 h-4 w-4" />{mode === 'add' ? 'Create Event' : 'Update Event'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


