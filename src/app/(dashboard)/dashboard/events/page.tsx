'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Calendar, User, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationRequired: boolean;
  maxAttendees: number;
  currentAttendees: number;
  author: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Financial Management Training Workshop",
    description: "Comprehensive training on financial management best practices for government accountants and financial officers.",
    type: "Training",
    date: "2024-07-15",
    time: "09:00 AM - 05:00 PM",
    location: "AGD Training Center, Lilongwe",
    status: "upcoming",
    registrationRequired: true,
    maxAttendees: 150,
    currentAttendees: 89,
    author: "Admin User"
  },
  {
    id: 2,
    title: "IFMIS User Conference 2024",
    description: "Annual conference bringing together IFMIS users from across all government departments to share experiences and best practices.",
    type: "Conference",
    date: "2024-07-22",
    time: "08:00 AM - 04:00 PM",
    location: "Bingu International Convention Centre",
    status: "upcoming",
    registrationRequired: true,
    maxAttendees: 500,
    currentAttendees: 342,
    author: "Jane Smith"
  },
  {
    id: 3,
    title: "Budget Planning Seminar",
    description: "Seminar on budget planning and execution strategies for the upcoming fiscal year.",
    type: "Seminar",
    date: "2024-05-20",
    time: "10:00 AM - 03:00 PM",
    location: "AGD Main Conference Room",
    status: "completed",
    registrationRequired: true,
    maxAttendees: 100,
    currentAttendees: 95,
    author: "John Doe"
  }
];

export default function EventsManagementPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const types = ['all', 'Training', 'Conference', 'Seminar', 'Forum', 'Workshop', 'Meeting'];
  const statuses = ['all', 'upcoming', 'ongoing', 'completed', 'cancelled'];

  const filteredEvents = events.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(item => item.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Training': return 'bg-purple-100 text-purple-800';
      case 'Conference': return 'bg-indigo-100 text-indigo-800';
      case 'Seminar': return 'bg-green-100 text-green-800';
      case 'Forum': return 'bg-yellow-100 text-yellow-800';
      case 'Workshop': return 'bg-pink-100 text-pink-800';
      case 'Meeting': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 w-full max-w-none px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600">Manage training sessions, conferences, and workshops</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{events.filter(e => e.status === 'upcoming').length}</p>
            </div>
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{events.filter(e => e.status === 'upcoming').length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">{events.reduce((sum, e) => sum + e.currentAttendees, 0)}</p>
            </div>
            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Capacity Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((events.reduce((sum, e) => sum + e.currentAttendees, 0) / events.reduce((sum, e) => sum + e.maxAttendees, 0)) * 100)}%
              </p>
            </div>
            <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">%</span>
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
                placeholder="Search events..."
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
                  {type === 'all' ? 'All Types' : type}
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

      {/* Events List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        {/* Vertically scrollable table, no horizontal scroll */}
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                      <div className="text-sm text-gray-500 truncate">{item.description}</div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {item.author}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div>{new Date(item.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="max-w-xs truncate">{item.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div>{item.currentAttendees}/{item.maxAttendees}</div>
                        <div className="text-xs text-gray-500">
                          {Math.round((item.currentAttendees / item.maxAttendees) * 100)}% full
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 