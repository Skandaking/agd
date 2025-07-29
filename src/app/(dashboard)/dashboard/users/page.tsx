'use client';

import { useEffect, useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  User,
  Clock,
  Shield,
  UserCheck,
  UserX,
  Lock
} from 'lucide-react';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'administrator';
  is_active: boolean;
  login_attempts: number;
  locked_until: Date | null;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

interface NewUser {
  email: string;
  password: string;
  full_name: string;
  role: 'user' | 'administrator';
  is_active: boolean;
}

// Mock data - replace with actual API calls
const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@agd.gov.mw',
    full_name: 'System Administrator',
    role: 'administrator',
    is_active: true,
    login_attempts: 0,
    locked_until: null,
    last_login: new Date('2024-01-15T10:30:00'),
    created_at: new Date('2024-01-01T00:00:00'),
    updated_at: new Date('2024-01-15T10:30:00'),
  },
  {
    id: 2,
    email: 'john.doe@agd.gov.mw',
    full_name: 'John Doe',
    role: 'user',
    is_active: true,
    login_attempts: 1,
    locked_until: null,
    last_login: new Date('2024-01-14T15:20:00'),
    created_at: new Date('2024-01-10T00:00:00'),
    updated_at: new Date('2024-01-14T15:20:00'),
  },
  {
    id: 3,
    email: 'jane.smith@agd.gov.mw',
    full_name: 'Jane Smith',
    role: 'user',
    is_active: false,
    login_attempts: 3,
    locked_until: new Date('2024-01-20T00:00:00'),
    last_login: new Date('2024-01-12T09:15:00'),
    created_at: new Date('2024-01-08T00:00:00'),
    updated_at: new Date('2024-01-12T09:15:00'),
  },
];

const getRoleVariant = (role: User['role']) => {
  switch (role) {
    case 'administrator':
      return 'default';
    case 'user':
      return 'secondary';
  }
};

const getStatusVariant = (isActive: boolean, isLocked: boolean) => {
  if (isLocked) return 'destructive';
  return isActive ? 'default' : 'outline';
};

const getStatusText = (isActive: boolean, isLocked: boolean) => {
  if (isLocked) return 'Locked';
  return isActive ? 'Active' : 'Inactive';
};

export default function UsersPage() {
  const { setPageTitle, setBreadcrumbs, showToast } = useDashboard();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<User['role'] | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'locked'>('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    email: '',
    password: '',
    full_name: '',
    role: 'user',
    is_active: true,
  });

  useEffect(() => {
    setPageTitle('User Management');
    setBreadcrumbs([
      { label: 'Home', href: '/dashboard' },
      { label: 'Users' },
    ]);
  }, [setPageTitle, setBreadcrumbs]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'active') {
      matchesStatus = user.is_active && !user.locked_until;
    } else if (statusFilter === 'inactive') {
      matchesStatus = !user.is_active;
    } else if (statusFilter === 'locked') {
      matchesStatus = !!user.locked_until && new Date() < user.locked_until;
    }
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newUser.email || !newUser.password || !newUser.full_name) {
      showToast.error('Please fill in all required fields');
      return;
    }

    // Check if email already exists
    if (users.some(user => user.email === newUser.email)) {
      showToast.error('A user with this email already exists');
      return;
    }

    // Create new user
    const user: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...newUser,
      login_attempts: 0,
      locked_until: null,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    setUsers([...users, user]);
    showToast.success('User created successfully');
    setIsAddUserOpen(false);
    setNewUser({
      email: '',
      password: '',
      full_name: '',
      role: 'user',
      is_active: true,
    });
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, is_active: !user.is_active, updated_at: new Date() }
        : user
    ));
    showToast.success('User status updated successfully');
  };

  const handleUnlockUser = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, locked_until: null, login_attempts: 0, updated_at: new Date() }
        : user
    ));
    showToast.success('User unlocked successfully');
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    showToast.success('User deleted successfully');
  };

  const stats = {
    total: users.length,
    administrators: users.filter(u => u.role === 'administrator').length,
    activeUsers: users.filter(u => u.is_active && !u.locked_until).length,
    lockedUsers: users.filter(u => u.locked_until && new Date() < u.locked_until).length,
  };

  const isUserLocked = (user: User) => {
    return !!(user.locked_until && new Date() < user.locked_until);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions for the AGD administration system.
          </p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="john.doe@agd.gov.mw"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'user' | 'administrator' })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="user">User</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={newUser.is_active}
                    onChange={(e) => setNewUser({ ...newUser, is_active: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="is_active">Active User</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddUserOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All users in system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.administrators}</div>
            <p className="text-xs text-muted-foreground">
              Admin users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locked Users</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lockedUsers}</div>
            <p className="text-xs text-muted-foreground">
              Temporarily locked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
          <CardDescription>
            Use the filters below to find specific users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as User['role'] | 'all')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">All Roles</option>
                <option value="administrator">Administrator</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="locked">Locked</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts and their access permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Login Attempts</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No users found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{user.full_name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleVariant(user.role)}>
                          {user.role === 'administrator' ? 'Administrator' : 'User'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(user.is_active, isUserLocked(user))}>
                          {getStatusText(user.is_active, isUserLocked(user))}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.last_login ? (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {user.last_login.toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.login_attempts > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {user.login_attempts}
                            </Badge>
                          )}
                          <span className="text-sm">{user.login_attempts}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{user.created_at.toLocaleDateString()}</div>
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {isUserLocked(user) ? (
                              <DropdownMenuItem 
                                onClick={() => handleUnlockUser(user.id)}
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Unlock User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleToggleUserStatus(user.id)}
                              >
                                {user.is_active ? (
                                  <>
                                    <UserX className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteUser(user.id)}
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
    </div>
  );
} 