'use client';

import { useState } from 'react';
import { Edit, Trash2, Eye, Search, Upload, Image, Video, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaItem {
  id: number;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
  uploadDate: string;
  category: string;
  alt?: string;
  description?: string;
}

const mockMedia: MediaItem[] = [
  {
    id: 1,
    name: "AGD Building Front View",
    type: "image",
    url: "/hero/1.JPG",
    size: "2.4 MB",
    uploadDate: "2024-06-15",
    category: "Building",
    alt: "AGD main building front view",
    description: "Main entrance of the Accountant General's Department building"
  },
  {
    id: 2,
    name: "Conference Room",
    type: "image",
    url: "/hero/2.JPG",
    size: "1.8 MB",
    uploadDate: "2024-06-10",
    category: "Interior",
    alt: "AGD conference room",
    description: "Main conference room for meetings and presentations"
  },
  {
    id: 3,
    name: "Training Session",
    type: "image",
    url: "/hero/3.JPG",
    size: "3.2 MB",
    uploadDate: "2024-06-05",
    category: "Events",
    alt: "Staff training session",
    description: "Staff participating in a training workshop"
  },
  {
    id: 4,
    name: "Office Space",
    type: "image",
    url: "/hero/4.JPG",
    size: "2.1 MB",
    uploadDate: "2024-05-28",
    category: "Interior",
    alt: "AGD office workspace",
    description: "Modern office workspace at AGD"
  }
];

export default function MediaManagementPage() {
  const [media, setMedia] = useState<MediaItem[]>(mockMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const types = ['all', 'image', 'video', 'document'];
  const categories = ['all', 'Building', 'Interior', 'Events', 'Staff', 'Equipment', 'Documents'];

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      setMedia(media.filter(item => item.id !== id));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <File className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Gallery Management</h1>
          <p className="text-gray-600">Manage images, videos, and media files</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90">
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Media</p>
              <p className="text-2xl font-bold text-gray-900">{media.length}</p>
            </div>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Image className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-2xl font-bold text-gray-900">{media.filter(m => m.type === 'image').length}</p>
            </div>
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <Image className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-900">{media.filter(m => m.type === 'video').length}</p>
            </div>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Video className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">{media.filter(m => m.type === 'document').length}</p>
            </div>
            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
              <File className="h-4 w-4 text-white" />
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
                placeholder="Search media..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            
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
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-200">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.alt || item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {getTypeIcon(item.type)}
                    <p className="text-sm text-gray-500 mt-2">{item.type.toUpperCase()}</p>
                  </div>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
              
              <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                <span>{item.size}</span>
                <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
              </div>
              
              <div className="mt-2">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {item.category}
                </span>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="h-4 w-4" />
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
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No media found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 