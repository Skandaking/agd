'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, FileText } from 'lucide-react';
import { DocumentItem } from '@/lib/types';

interface DocumentDialogProps {
  onDocumentCreate?: (data: DocumentItem) => Promise<void>;
  onDocumentUpdate?: (id: string, data: Partial<DocumentItem>) => Promise<void>;
  onClose?: () => void;
  existingDocument?: DocumentItem | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

const documentCategories = [
  'report',
  'policy',
  'guideline',
  'circular',
  'form',
  'manual',
  'procedure',
  'regulation',
  'other'
];

const departments = [
  'Accounting Services',
  'Pay Services',
  'Banking and Asset Management',
  'IFMIS',
  'Administration',
  'Human Resources',
  'ICT',
  'Other'
];

export function DocumentDialog({ 
  onDocumentCreate, 
  onDocumentUpdate, 
  onClose,
  existingDocument, 
  mode = 'add',
  trigger 
}: DocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<DocumentItem>({
    title: '',
    summary: '',
    category: 'report',
    department: '',
    status: 'draft',
    author: '',
    year: new Date().getFullYear(),
    file_name: '',
    file_url: '',
    file_mime: '',
    file_size_bytes: 0,
    tags: [],
  });

  const [customCategory, setCustomCategory] = useState('');
  const [customDepartment, setCustomDepartment] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (existingDocument && mode === 'edit') {
      setFormData({
        ...existingDocument,
        tags: existingDocument.tags || [],
      });
      setTagsInput(existingDocument.tags?.join(', ') || '');
      
      // Set custom values if they don't match predefined options
      if (existingDocument.category && !documentCategories.includes(existingDocument.category)) {
        setCustomCategory(existingDocument.category);
      }
      if (existingDocument.department && !departments.includes(existingDocument.department)) {
        setCustomDepartment(existingDocument.department);
      }
    } else {
      // Reset form for add mode
      setFormData({
        title: '',
        summary: '',
        category: 'report',
        department: '',
        status: 'draft',
        author: '',
        year: new Date().getFullYear(),
        file_name: '',
        file_url: '',
        file_mime: '',
        file_size_bytes: 0,
        tags: [],
      });
      setTagsInput('');
      setCustomCategory('');
      setCustomDepartment('');
    }
  }, [existingDocument, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.file_url && mode === 'add') {
      alert('Please upload a file');
      return;
    }

    setIsLoading(true);

    try {
      const documentData: DocumentItem = {
        ...formData,
        title: formData.title.trim(),
        summary: formData.summary?.trim() || null,
        category: customCategory || formData.category,
        department: customDepartment || formData.department || null,
        author: formData.author?.trim() || null,
        tags: formData.tags?.filter(tag => tag.trim() !== '') || [],
      };

      if (mode === 'edit' && existingDocument?.id && onDocumentUpdate) {
        await onDocumentUpdate(existingDocument.id, documentData);
      } else if (mode === 'add' && onDocumentCreate) {
        await onDocumentCreate(documentData);
      }

      handleClose();
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      handleClose();
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'custom') {
      setCustomCategory('');
    } else {
      setCustomCategory('');
      setFormData(prev => ({ ...prev, category: value }));
    }
  };

  const handleCustomCategoryChange = (value: string) => {
    setCustomCategory(value);
  };

  const handleDepartmentChange = (value: string) => {
    if (value === 'custom') {
      setCustomDepartment('');
    } else {
      setCustomDepartment('');
      setFormData(prev => ({ ...prev, department: value }));
    }
  };

  const handleCustomDepartmentChange = (value: string) => {
    setCustomDepartment(value);
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);

      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'documents');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          file_name: result.file_name || file.name,
          file_url: result.url,
          file_mime: result.file_mime || file.type,
          file_size_bytes: result.file_size || file.size,
        }));
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mime: string) => {
    if (mime.includes('pdf')) return '📄';
    if (mime.includes('word')) return '📝';
    if (mime.includes('excel') || mime.includes('sheet')) return '📊';
    if (mime.includes('csv')) return '📋';
    return '📎';
  };

  const getFileTypeName = (mime: string, fileName: string) => {
    // Get file extension from filename as backup
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    // Map MIME types to user-friendly names
    const mimeTypeMap: Record<string, string> = {
      'application/pdf': 'PDF',
      'application/msword': 'Word Document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
      'application/vnd.ms-excel': 'Excel Spreadsheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Spreadsheet',
      'text/csv': 'CSV File',
      'text/plain': 'Text File',
      'text/txt': 'Text File',
    };

    // First try to match exact MIME type
    if (mimeTypeMap[mime]) {
      return mimeTypeMap[mime];
    }

    // Fallback to extension-based mapping
    const extensionMap: Record<string, string> = {
      'pdf': 'PDF',
      'doc': 'Word Document',
      'docx': 'Word Document', 
      'xls': 'Excel Spreadsheet',
      'xlsx': 'Excel Spreadsheet',
      'csv': 'CSV File',
      'txt': 'Text File',
    };

    if (extensionMap[extension]) {
      return extensionMap[extension];
    }

    // Final fallback - use extension or generic
    return extension ? extension.toUpperCase() : 'Document';
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Document
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {mode === 'edit' ? 'Edit Document' : 'Add New Document'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' 
              ? 'Update the document information and file if needed.'
              : 'Upload and configure a new document for the AGD portal.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter document title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary" 
                  value={formData.summary || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief description of the document"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={customCategory ? 'custom' : formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom...</SelectItem>
                    </SelectContent>
                  </Select>
                  {customCategory !== '' && (
                    <Input
                      value={customCategory}
                      onChange={(e) => handleCustomCategoryChange(e.target.value)}
                      placeholder="Enter custom category"
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || null }))}
                    placeholder="2024"
                    min="1990"
                    max="2050"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={customDepartment ? 'custom' : formData.department || ''} onValueChange={handleDepartmentChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom...</SelectItem>
                  </SelectContent>
                </Select>
                {customDepartment !== '' && (
                  <Input
                    value={customDepartment}
                    onChange={(e) => handleCustomDepartmentChange(e.target.value)}
                    placeholder="Enter custom department"
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Document author or source"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>File Upload {mode === 'add' && '*'}</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {formData.file_url ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">{getFileIcon(formData.file_mime)}</span>
                        <div className="text-left">
                          <div className="font-medium text-sm">{formData.file_name}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatFileSize(formData.file_size_bytes)} • {getFileTypeName(formData.file_mime, formData.file_name)}
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? 'Uploading...' : 'Replace File'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                        >
                          {uploading ? 'Uploading...' : 'Choose File'}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          PDF, Word, Excel, CSV files up to 20MB
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || uploading}>
              {isLoading ? 'Saving...' : mode === 'edit' ? 'Update Document' : 'Add Document'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
