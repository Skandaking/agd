'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
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
  locked_until: string | null;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

interface NewUser {
  email: string;
  password: string;
  full_name: string;
  role: 'user' | 'administrator';
  is_active: boolean;
}

// API functions
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch users');
  }
  return data.users;
};

const createUser = async (userData: NewUser): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to create user');
  }
  return data.user;
};

const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete user');
  }
};

const unlockUser = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}/unlock`, {
    method: 'PUT',
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to unlock user');
  }
  return data.user;
};

const toggleUserStatus = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}/toggle-status`, {
    method: 'PUT',
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to toggle user status');
  }
  return data.user;
};

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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Load users on component mount
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Memoize breadcrumbs to prevent infinite re-renders
  const breadcrumbs = useMemo(() => [
    { label: 'Home', href: '/dashboard' },
    { label: 'Users' },
  ], []);

  useEffect(() => {
    setPageTitle('User Management');
    setBreadcrumbs(breadcrumbs);
  }, [setPageTitle, setBreadcrumbs, breadcrumbs]);

  // Load users separately to avoid dependency issues
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'active') {
      matchesStatus = user.is_active && !isUserLocked(user);
    } else if (statusFilter === 'inactive') {
      matchesStatus = !user.is_active;
    } else if (statusFilter === 'locked') {
      matchesStatus = isUserLocked(user);
    }
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newUser.email || !newUser.password || !newUser.full_name) {
      showToast.error('Please fill in all required fields');
      return;
    }

    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      showToast.success('User created successfully');
      setIsAddUserOpen(false);
      setNewUser({
        email: '',
        password: '',
        full_name: '',
        role: 'user',
        is_active: true,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to create user');
    }
  };

  const handleToggleUserStatus = async (id: number) => {
    try {
      const updatedUser = await toggleUserStatus(id);
      setUsers(users.map(user => 
        user.id === id ? updatedUser : user
      ));
      showToast.success('User status updated successfully');
    } catch (error) {
      console.error('Error updating user status:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to update user status');
    }
  };

  const handleUnlockUser = async (id: number) => {
    try {
      const updatedUser = await unlockUser(id);
      setUsers(users.map(user => 
        user.id === id ? updatedUser : user
      ));
      showToast.success('User unlocked successfully');
    } catch (error) {
      console.error('Error unlocking user:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to unlock user');
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      showToast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  const isUserLocked = (user: User) => {
    return !!(user.locked_until && new Date() < new Date(user.locked_until));
  };

  const stats = {
    total: users.length,
    administrators: users.filter(u => u.role === 'administrator').length,
    activeUsers: users.filter(u => u.is_active && !isUserLocked(u)).length,
    lockedUsers: users.filter(u => isUserLocked(u)).length,
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
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
                            {new Date(user.last_login).toLocaleDateString()}
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
                        <div className="text-sm">{new Date(user.created_at).toLocaleDateString()}</div>
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