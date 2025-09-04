'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DocumentDialog } from '@/components/dashboard/AddDocumentDialog';
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
  Download,
  FileText,
  Tag,
  Building
} from 'lucide-react';
import { File as FileIcon, FileSpreadsheet } from 'lucide-react';
import { DocumentItem } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  report: 'Report',
  policy: 'Policy',
  guideline: 'Guideline',
  circular: 'Circular',
  form: 'Form',
  manual: 'Manual',
  procedure: 'Procedure',
  regulation: 'Regulation',
  other: 'Other',
};

const statusLabels: Record<DocumentItem['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

const getStatusVariant = (status: DocumentItem['status']) => {
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
    case 'report':
      return 'default';
    case 'policy':
      return 'secondary';
    case 'guideline':
      return 'outline';
    case 'circular':
      return 'secondary';
    case 'form':
      return 'outline';
    default:
      return 'secondary';
  }
};

export default function DocumentsPage() {
  const { setPageTitle, setBreadcrumbs, showToast } = useDashboard();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDocument, setEditingDocument] = useState<DocumentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Confirmation dialog state for delete
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; document: DocumentItem | null }>({ isOpen: false, document: null });
  
  // View dialog state for viewing document details
  const [viewDialog, setViewDialog] = useState<{ isOpen: boolean; document: DocumentItem | null }>({ isOpen: false, document: null });
  const [previewDialog, setPreviewDialog] = useState<{ isOpen: boolean; document: DocumentItem | null }>({ isOpen: false, document: null });

  const fetchDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/documents');
      const result = await response.json();
      
      if (result.success) {
        console.log('API Response:', result.items);
        setDocuments(result.items);
      } else {
        showToast.error('Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      showToast.error('Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    setPageTitle('Documents Management');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
      { label: 'Documents' },
    ]);
    fetchDocuments();
  }, [setPageTitle, setBreadcrumbs, fetchDocuments]);

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch = 
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (document.summary && document.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (document.category && document.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setDocuments(documents.filter(document => document.id !== id));
        showToast.success('Document deleted successfully');
      } else {
        showToast.error(result.error || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      showToast.error('Failed to delete document');
    }
  };

  const handleDeleteClick = (document: DocumentItem) => {
    setDeleteDialog({ isOpen: true, document });
  };

  const handleViewClick = (document: DocumentItem) => {
    setViewDialog({ isOpen: true, document });
  };

  const handlePreviewClick = (document: DocumentItem) => {
    // For PDFs, open directly in a new tab for better viewing experience
    if (document.file_mime.includes('pdf')) {
      window.open(document.file_url, '_blank');
      return;
    }
    
    // For other files, use the preview dialog
    setPreviewDialog({ isOpen: true, document });
  };

  const handleStatusChange = async (id: string, newStatus: DocumentItem['status']) => {
    try {
      // Find the current document to get all its data
      const currentDocument = documents.find(document => document.id === id);
      if (!currentDocument) {
        showToast.error('Document not found');
        return;
      }

      // Send complete document data with updated status
      const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentDocument,
          status: newStatus
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setDocuments(documents.map(document => 
          document.id === id ? result.item : document
        ));
        showToast.success(`Document status changed to ${newStatus}`);
      } else {
        showToast.error(result.error || 'Failed to update document status');
      }
    } catch (error) {
      console.error('Error updating document status:', error);
      showToast.error('Failed to update document status');
    }
  };

  const handleCreateDocument = async (documentData: DocumentItem) => {
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      const result = await response.json();
      
      if (result.success) {
        setDocuments([result.item, ...documents]);
        showToast.success('Document created successfully');
      } else {
        showToast.error(result.error || 'Failed to create document');
      }
    } catch (error) {
      console.error('Error creating document:', error);
      showToast.error('Failed to create document');
    }
  };

  const handleUpdateDocument = async (documentId: string, documentData: Partial<DocumentItem>) => {
    try {
      console.log('Updating document:', { documentId, documentData });
      
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      const result = await response.json();
      console.log('Update response:', result);
      
      if (result.success) {
        setDocuments(documents.map(document => 
          document.id === documentId ? result.item : document
        ));
        showToast.success('Document updated successfully');
      } else {
        showToast.error(result.error || 'Failed to update document');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      showToast.error('Failed to update document');
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
    if (mime.includes('pdf')) return <FileText className="h-4 w-4 text-red-600" />;
    if (mime.includes('word')) return <FileText className="h-4 w-4 text-blue-600" />;
    if (mime.includes('excel') || mime.includes('sheet') || mime.includes('csv')) return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
    return <FileIcon className="h-4 w-4 text-muted-foreground" />;
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

  const getAbsoluteUrl = (relativeOrAbsoluteUrl: string) => {
    if (relativeOrAbsoluteUrl.startsWith('http')) return relativeOrAbsoluteUrl;
    if (typeof window === 'undefined') return relativeOrAbsoluteUrl;
    return `${window.location.origin}${relativeOrAbsoluteUrl}`;
  };

  const canPreviewFile = (mime: string) => {
    // Only PDFs and text files can be previewed directly in localhost
    return mime.includes('pdf') || mime.startsWith('text/') || mime.includes('csv');
  };

  const getPreviewIframeSrc = (mime: string, fileUrl: string) => {
    const url = getAbsoluteUrl(fileUrl);
    if (mime.includes('pdf') || mime.startsWith('text/') || mime.includes('csv')) {
      return url; // Browser can preview PDFs and text/csv directly
    }
    return url; // Fallback to direct URL
  };

  const handleDownload = (document: DocumentItem) => {
    if (document.id) {
      window.open(`/api/documents/${document.id}/download`, '_blank');
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Header with Stats */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents Management</h1>
          <p className="text-muted-foreground">
            Upload, manage, and publish official documents and publications.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
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
          <DocumentDialog 
            mode={editingDocument ? "edit" : "add"}
            existingDocument={editingDocument}
            onDocumentCreate={handleCreateDocument}
            onDocumentUpdate={handleUpdateDocument}
            onClose={() => {
              setEditingDocument(null);
            }}
          />
        </div>
      </div>
      
      {/* Documents Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Documents ({filteredDocuments.length}
                {searchQuery && filteredDocuments.length !== documents.length && (
                  <span className="text-muted-foreground"> of {documents.length}</span>
                )}
                )
              </CardTitle>
              <CardDescription>
                {searchQuery ? (
                  <>Showing results for &quot;{searchQuery}&quot;</>
                ) : (
                  <>Manage your documents and their publication status.</>
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
                  <TableHead className="w-[35%]">Document</TableHead>
                  <TableHead className="w-[12%]">Category</TableHead>
                  <TableHead className="w-[10%]">Type</TableHead>
                  <TableHead className="w-[10%]">Status</TableHead>
                  <TableHead className="w-[12%]">Published</TableHead>
                  <TableHead className="w-[8%]">Size</TableHead>
                  <TableHead className="w-[8%]">Downloads</TableHead>
                  <TableHead className="w-[5%]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Loading documents...
                    </TableCell>
                  </TableRow>
                ) : filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No documents found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            <span className="text-lg">{getFileIcon(document.file_mime)}</span>
                            <span className="truncate">{document.title}</span>
                          </div>
                          {document.summary && (
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {document.summary}
                            </div>
                          )}
                          {document.department && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Building className="h-3 w-3" />
                              <span>{document.department}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getCategoryVariant(document.category)}>
                          {categoryLabels[document.category] || document.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {getFileTypeName(document.file_mime, document.file_name)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(document.status)}>
                          {statusLabels[document.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {document.publishedAt ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm">
                              {new Date(document.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not published</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatFileSize(document.file_size_bytes)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm">{(document.downloads || 0).toLocaleString()}</span>
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
                              onClick={() => handleViewClick(document)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handlePreviewClick(document)}
                              className="cursor-pointer"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              {document.file_mime.includes('pdf') ? 'Open in New Tab' : 'Preview'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDownload(document)}
                              className="cursor-pointer"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setEditingDocument(document)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Document
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {document.status === 'draft' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(document.id || '', 'published')}
                                className="cursor-pointer"
                              >
                                Publish
                              </DropdownMenuItem>
                            )}
                            {document.status === 'published' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(document.id || '', 'draft')}
                                className="cursor-pointer"
                              >
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteClick(document)}
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
        onClose={() => setDeleteDialog({ isOpen: false, document: null })}
        onConfirm={async () => {
          if (deleteDialog.document) {
            await handleDelete(deleteDialog.document.id || '');
            setDeleteDialog({ isOpen: false, document: null });
          }
        }}
        title="Delete Document"
        description={`Are you sure you want to delete "${deleteDialog.document?.title}"? This action cannot be undone and will also delete the associated file.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* View Document Dialog */}
      <Dialog open={viewDialog.isOpen} onOpenChange={(open) => setViewDialog({ isOpen: open, document: viewDialog.document })}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary text-2xl font-bold">
              <FileText className="h-5 w-5 text-secondary" />
              Document Details
            </DialogTitle>
            <DialogDescription>
              View complete information about the selected document
            </DialogDescription>
          </DialogHeader>
          
          {viewDialog.document && (
            <div className="space-y-6">
              {/* Document Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <span className="text-2xl">{getFileIcon(viewDialog.document.file_mime)}</span>
                      {viewDialog.document.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {viewDialog.document.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{viewDialog.document.author}</span>
                        </div>
                      )}
                      {viewDialog.document.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(viewDialog.document.publishedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      {viewDialog.document.year && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{viewDialog.document.year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getCategoryVariant(viewDialog.document.category)}>
                      {categoryLabels[viewDialog.document.category] || viewDialog.document.category}
                    </Badge>
                    <Badge variant={getStatusVariant(viewDialog.document.status)}>
                      {statusLabels[viewDialog.document.status]}
                    </Badge>
                  </div>
                </div>
                
                {/* Summary */}
                {viewDialog.document.summary && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">{viewDialog.document.summary}</p>
                  </div>
                )}
              </div>

              {/* Two-column layout for large screens */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* File Information */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">File Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">File Name</label>
                          <p className="text-sm font-mono">{viewDialog.document.file_name}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">File Size</label>
                          <p className="text-sm">{formatFileSize(viewDialog.document.file_size_bytes)}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">File Type</label>
                          <p className="text-sm">{getFileTypeName(viewDialog.document.file_mime, viewDialog.document.file_name)}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Downloads</label>
                          <p className="text-sm">{(viewDialog.document.downloads || 0).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={() => handleDownload(viewDialog.document!)}
                          className="w-full"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download File
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {viewDialog.document.tags && viewDialog.document.tags.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {viewDialog.document.tags.map((tag, index) => (
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
                        <label className="text-xs font-medium text-muted-foreground">Created by</label>
                        <p className="text-sm">{viewDialog.document.created_by_name || 'Unknown'}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Created at</label>
                        <p className="text-sm">
                          {viewDialog.document.createdAt ? (
                            <>
                              {new Date(viewDialog.document.createdAt as unknown as string).toLocaleDateString()} at {new Date(viewDialog.document.createdAt as unknown as string).toLocaleTimeString()}
                            </>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Last updated</label>
                        <p className="text-sm">
                          {viewDialog.document.updatedAt ? (
                            <>
                              {new Date(viewDialog.document.updatedAt as unknown as string).toLocaleDateString()} at {new Date(viewDialog.document.updatedAt as unknown as string).toLocaleTimeString()}
                            </>
                          ) : (
                            '—'
                          )}
                        </p>
                      </div>
                      {viewDialog.document.department && (
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Department</label>
                          <p className="text-sm">{viewDialog.document.department}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setViewDialog({ isOpen: false, document: null })}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(viewDialog.document!)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  onClick={() => {
                    setViewDialog({ isOpen: false, document: null });
                    setEditingDocument(viewDialog.document);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Document
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Document Dialog */}
      <Dialog open={previewDialog.isOpen} onOpenChange={(open) => setPreviewDialog({ isOpen: open, document: previewDialog.document })}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>
              Preview of {previewDialog.document?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                <div className="font-semibold">Preview: {previewDialog.document?.title}</div>
              </div>
              <div className="text-xs text-muted-foreground pr-1">
                {previewDialog.document && getFileTypeName(previewDialog.document.file_mime, previewDialog.document.file_name)}
              </div>
            </div>
            <div className="flex-1 bg-white">
              {previewDialog.document ? (
                canPreviewFile(previewDialog.document.file_mime) ? (
                  <iframe
                    title="Document Preview"
                    src={getPreviewIframeSrc(previewDialog.document.file_mime, previewDialog.document.file_url)}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="text-6xl mb-4">
                      <div className="flex justify-center">
                        {previewDialog.document.file_mime.includes('pdf') ? (
                          <FileText className="h-16 w-16 text-red-600" />
                        ) : previewDialog.document.file_mime.includes('word') ? (
                          <FileText className="h-16 w-16 text-blue-600" />
                        ) : previewDialog.document.file_mime.includes('excel') || previewDialog.document.file_mime.includes('sheet') || previewDialog.document.file_mime.includes('csv') ? (
                          <FileSpreadsheet className="h-16 w-16 text-green-600" />
                        ) : (
                          <FileIcon className="h-16 w-16 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Preview Not Available</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      {previewDialog.document.file_mime.includes('word') || previewDialog.document.file_mime.includes('excel') ? 
                        'Word and Excel documents cannot be previewed directly. Please download the file to view it.' :
                        'This file type cannot be previewed directly. Please download the file to view it.'
                      }
                    </p>
                    <div className="space-x-3">
                      <Button onClick={() => handleDownload(previewDialog.document!)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download File
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setPreviewDialog({ isOpen: false, document: null })}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
