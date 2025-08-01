'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AddUserDialog } from '@/components/dashboard/AddUserDialog';
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
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  User,
  Clock,
  UserCheck,
  UserX,
  Phone
} from 'lucide-react';

interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string | null;
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
  phone: string;
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

  const filteredUsers = users;

  const handleCreateUser = async (userData: NewUser) => {
    try {
      const createdUser = await createUser(userData);
      setUsers([...users, createdUser]);
      showToast.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to create user');
      throw error; // Re-throw to let the dialog handle it
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
        <AddUserDialog onUserCreate={handleCreateUser} />
      </div>
      
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
                  <TableHead>Phone</TableHead>
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
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No users found.
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
                        {user.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{user.phone}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not provided</span>
                        )}
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
                            <div className="text-sm">
                              <div>{new Date(user.last_login).toLocaleDateString()}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(user.last_login).toLocaleTimeString()}
                              </div>
                            </div>
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
                        <div className="text-sm">
                          <div>{new Date(user.created_at).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(user.created_at).toLocaleTimeString()}
                          </div>
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