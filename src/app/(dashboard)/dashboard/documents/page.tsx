'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Calendar, User, Download, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  date: string;
  downloads: number;
  featured: boolean;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Annual Financial Statement 2023",
    description: "Comprehensive financial statement for the fiscal year 2023, including revenue, expenditure, and asset management reports.",
    category: "Financial Reports",
    fileType: "PDF",
    fileSize: "2.4 MB",
    status: "published",
    author: "Admin User",
    date: "2024-06-10",
    downloads: 1247,
    featured: true
  },
  {
    id: 2,
    title: "Budget Implementation Report 2024",
    description: "Detailed analysis of budget implementation and financial performance for the year 2024.",
    category: "Budget Reports",
    fileType: "PDF",
    fileSize: "3.7 MB",
    status: "published",
    author: "Jane Smith",
    date: "2024-05-22",
    downloads: 892,
    featured: true
  },
  {
    id: 3,
    title: "Procurement Guidelines 2024",
    description: "Updated guidelines for government procurement processes, ensuring transparency and compliance.",
    category: "Guidelines",
    fileType: "PDF",
    fileSize: "1.8 MB",
    status: "draft",
    author: "John Doe",
    date: "2024-04-15",
    downloads: 0,
    featured: false
  }
];

export default function DocumentsManagementPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Financial Reports', 'Budget Reports', 'Guidelines', 'Manuals', 'Legal Documents', 'Performance Reports', 'Policies', 'Training Materials', 'Audit Reports'];
  const statuses = ['all', 'published', 'draft', 'archived'];

  const filteredDocuments = documents.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(item => item.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'DOC': return 'bg-blue-100 text-blue-800';
      case 'DOCX': return 'bg-blue-100 text-blue-800';
      case 'XLS': return 'bg-green-100 text-green-800';
      case 'XLSX': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents Management</h1>
          <p className="text-gray-600">Manage official documents, reports, and publications</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === 'published').length}</p>
            </div>
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{documents.filter(d => d.status === 'published').length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.featured).length}</p>
            </div>
            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{documents.filter(d => d.featured).length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{documents.reduce((sum, d) => sum + d.downloads, 0).toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Download className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                        {item.featured && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 truncate">{item.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFileTypeColor(item.fileType)}`}>
                        {item.fileType}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{item.fileSize}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      {item.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400 mr-2" />
                      {item.downloads.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No documents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 