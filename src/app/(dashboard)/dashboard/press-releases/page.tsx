'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Calendar, User, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PressRelease {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'published' | 'draft' | 'archived';
  author: string;
  date: string;
  views: number;
}

const mockPressReleases: PressRelease[] = [
  {
    id: 1,
    title: "AGD Announces Successful Implementation of New IFMIS Module",
    excerpt: "The Accountant General's Department is pleased to announce the successful implementation of the new Asset Management module...",
    category: "System Updates",
    priority: "high",
    status: "published",
    author: "Admin User",
    date: "2024-06-20",
    views: 1567
  },
  {
    id: 2,
    title: "Public Sector Financial Performance Shows Significant Improvement",
    excerpt: "Latest quarterly reports indicate a marked improvement in public sector financial management...",
    category: "Performance",
    priority: "high",
    status: "published",
    author: "Jane Smith",
    date: "2024-06-15",
    views: 892
  },
  {
    id: 3,
    title: "AGD Launches Comprehensive Training Program for Government Accountants",
    excerpt: "A new comprehensive training program has been launched to enhance the skills and capabilities...",
    category: "Training",
    priority: "medium",
    status: "draft",
    author: "John Doe",
    date: "2024-05-28",
    views: 0
  }
];

export default function PressReleasesManagementPage() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>(mockPressReleases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const categories = ['all', 'System Updates', 'Performance', 'Training', 'Policy', 'Awards', 'Technology', 'Partnerships', 'Budget'];
  const statuses = ['all', 'published', 'draft', 'archived'];
  const priorities = ['all', 'high', 'medium', 'low'];

  const filteredPressReleases = pressReleases.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this press release?')) {
      setPressReleases(pressReleases.filter(item => item.id !== id));
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">Press Releases Management</h1>
          <p className="text-sm md:text-base text-gray-600">Manage official announcements and press releases</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 flex-shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Add Press Release</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Total Releases</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">{pressReleases.length}</p>
            </div>
            <div className="h-6 w-6 md:h-8 md:w-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Megaphone className="h-3 w-3 md:h-4 md:w-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Published</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">{pressReleases.filter(p => p.status === 'published').length}</p>
            </div>
            <div className="h-6 w-6 md:h-8 md:w-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs md:text-sm font-bold">{pressReleases.filter(p => p.status === 'published').length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">High Priority</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">{pressReleases.filter(p => p.priority === 'high').length}</p>
            </div>
            <div className="h-6 w-6 md:h-8 md:w-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs md:text-sm font-bold">{pressReleases.filter(p => p.priority === 'high').length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Total Views</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">{pressReleases.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</p>
            </div>
            <div className="h-6 w-6 md:h-8 md:w-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="h-3 w-3 md:h-4 md:w-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search press releases..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Filter dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-sm"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-sm"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Press Releases List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Press Release
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Priority
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Author
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                  Views
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPressReleases.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                      <div className="text-sm text-gray-500 truncate">{item.excerpt}</div>
                      {/* Mobile-only info */}
                      <div className="sm:hidden mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {item.category}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.author} • {new Date(item.date).toLocaleDateString()} • {item.views.toLocaleString()} views
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      {item.author}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 text-gray-400 mr-2" />
                      {item.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Eye className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1">
                        <Edit className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredPressReleases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No press releases found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 