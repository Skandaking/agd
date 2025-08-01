'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserDialog } from '@/components/dashboard/AddUserDialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Phone,
  Lock,
  Key,
  RotateCcw,
  RefreshCw
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

const resetLoginAttempts = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}/reset-login-attempts`, {
    method: 'PUT',
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to reset login attempts');
  }
  return data.user;
};

const resetPassword = async (userId: number): Promise<{ user: User; message: string }> => {
  const response = await fetch(`/api/users/${userId}/reset-password`, {
    method: 'PUT',
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to reset password');
  }
  return { user: data.user, message: data.message };
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
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Confirmation dialog states
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [statusDialog, setStatusDialog] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [resetAttemptsDialog, setResetAttemptsDialog] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [resetPasswordDialog, setResetPasswordDialog] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [viewUserDialog, setViewUserDialog] = useState<{ isOpen: boolean; user: User | null }>({ isOpen: false, user: null });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Load users on component mount
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setLastUpdated(new Date());
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

  // Auto-refresh users data every 2 minutes to keep data synchronized across tabs
  // Only refresh when the page is visible to save resources
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startPolling = () => {
      interval = setInterval(() => {
        if (!document.hidden) {
          loadUsers();
        }
      }, 120000); // Refresh every 2 minutes (120 seconds)
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        // Refresh immediately when page becomes visible
        loadUsers();
        startPolling();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadUsers]);

  // Refresh data when the window regains focus (when switching back to this tab)
  useEffect(() => {
    const handleFocus = () => {
      loadUsers();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadUsers]);

  const filteredUsers = users;

  const handleCreateUser = async (userData: NewUser) => {
    try {
      const createdUser = await createUser(userData);
      setUsers([...users, createdUser]);
      showToast.success('User created successfully');
      // Refresh the users list to ensure data consistency
      await loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to create user');
      throw error; // Re-throw to let the dialog handle it
    }
  };

  const handleUpdateUser = async (userId: number, userData: Partial<NewUser>) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to update user');
      }
      
      const updatedUser = data.user;
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
      showToast.success('User updated successfully');
      // Refresh the users list to ensure data consistency
      await loadUsers();
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : 'Failed to update user');
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
      // Refresh the users list to ensure data consistency
      await loadUsers();
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
      // Refresh the users list to ensure data consistency
      await loadUsers();
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
      // Refresh the users list to ensure data consistency
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  const handleResetLoginAttempts = async (id: number) => {
    try {
      const updatedUser = await resetLoginAttempts(id);
      setUsers(users.map(user => 
        user.id === id ? updatedUser : user
      ));
      showToast.success('Login attempts reset successfully');
      // Refresh the users list to ensure data consistency
      await loadUsers();
    } catch (error) {
      console.error('Error resetting login attempts:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to reset login attempts');
    }
  };

  const handleResetPassword = async (id: number) => {
    try {
      const result = await resetPassword(id);
      setUsers(users.map(user => 
        user.id === id ? result.user : user
      ));
      showToast.success(result.message);
      // Refresh the users list to ensure data consistency
      await loadUsers();
    } catch (error) {
      console.error('Error resetting password:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to reset password');
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadUsers}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <UserDialog 
            mode={editingUser ? "edit" : "add"}
            existingUser={editingUser}
            onUserCreate={handleCreateUser}
            onUserUpdate={handleUpdateUser}
            onClose={() => setEditingUser(null)}
          />
        </div>
      </div>
      
      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Manage user accounts and their access permissions.
              </CardDescription>
            </div>
            {lastUpdated && (
              <div className="text-xs text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
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
                          {user.login_attempts >= 3 ? (
                            <>
                              <Lock className="h-4 w-4 text-red-500" />
                              <Badge variant="destructive" className="text-xs">
                                {user.login_attempts}
                              </Badge>
                              <span className="text-sm text-red-600 font-medium">Locked</span>
                            </>
                          ) : user.login_attempts > 0 ? (
                            <>
                              <Badge variant="outline" className="text-xs">
                                {user.login_attempts}
                              </Badge>
                            </>
                          ) : (
                            <span className="text-sm text-muted-foreground">0</span>
                          )}
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
                            <DropdownMenuItem onClick={() => setViewUserDialog({ isOpen: true, user })}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.login_attempts > 0 && (
                              <DropdownMenuItem 
                                onClick={() => setResetAttemptsDialog({ isOpen: true, user })}
                              >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset Login Attempts
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => setResetPasswordDialog({ isOpen: true, user })}
                            >
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
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
                                onClick={() => setStatusDialog({ isOpen: true, user })}
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
                              onClick={() => setDeleteDialog({ isOpen: true, user })}
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

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, user: null })}
        onConfirm={async () => {
          if (deleteDialog.user) {
            await handleDeleteUser(deleteDialog.user.id);
            setDeleteDialog({ isOpen: false, user: null });
          }
        }}
        title="Delete User"
        description={`Are you sure you want to delete ${deleteDialog.user?.full_name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      <ConfirmationDialog
        isOpen={statusDialog.isOpen}
        onClose={() => setStatusDialog({ isOpen: false, user: null })}
        onConfirm={async () => {
          if (statusDialog.user) {
            await handleToggleUserStatus(statusDialog.user.id);
            setStatusDialog({ isOpen: false, user: null });
          }
        }}
        title={statusDialog.user?.is_active ? "Deactivate User" : "Activate User"}
        description={`Are you sure you want to ${statusDialog.user?.is_active ? 'deactivate' : 'activate'} ${statusDialog.user?.full_name}?`}
        confirmText={statusDialog.user?.is_active ? "Deactivate" : "Activate"}
        cancelText="Cancel"
      />

      <ConfirmationDialog
        isOpen={resetAttemptsDialog.isOpen}
        onClose={() => setResetAttemptsDialog({ isOpen: false, user: null })}
        onConfirm={async () => {
          if (resetAttemptsDialog.user) {
            await handleResetLoginAttempts(resetAttemptsDialog.user.id);
            setResetAttemptsDialog({ isOpen: false, user: null });
          }
        }}
        title="Reset Login Attempts"
        description={`Are you sure you want to reset login attempts for ${resetAttemptsDialog.user?.full_name}? This will unlock their account if it was locked.`}
        confirmText="Reset"
        cancelText="Cancel"
      />

      <ConfirmationDialog
        isOpen={resetPasswordDialog.isOpen}
        onClose={() => setResetPasswordDialog({ isOpen: false, user: null })}
        onConfirm={async () => {
          if (resetPasswordDialog.user) {
            await handleResetPassword(resetPasswordDialog.user.id);
            setResetPasswordDialog({ isOpen: false, user: null });
          }
        }}
        title="Reset Password"
        description={`Are you sure you want to reset the password for ${resetPasswordDialog.user?.full_name}? The password will be reset to the default password.`}
        confirmText="Reset"
        cancelText="Cancel"
      />

      {/* View User Details Dialog */}
      <Dialog open={viewUserDialog.isOpen} onOpenChange={(open) => !open && setViewUserDialog({ isOpen: false, user: null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete information about {viewUserDialog.user?.full_name}
            </DialogDescription>
          </DialogHeader>
          
          {viewUserDialog.user && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-sm font-medium">{viewUserDialog.user.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <p className="text-sm">{viewUserDialog.user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="text-sm">{viewUserDialog.user.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <div className="mt-1">
                      <Badge variant={getRoleVariant(viewUserDialog.user.role)}>
                        {viewUserDialog.user.role === 'administrator' ? 'Administrator' : 'User'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Account Status</label>
                    <div className="mt-1">
                      <Badge variant={getStatusVariant(viewUserDialog.user.is_active, isUserLocked(viewUserDialog.user))}>
                        {getStatusText(viewUserDialog.user.is_active, isUserLocked(viewUserDialog.user))}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Login Attempts</label>
                    <div className="flex items-center gap-2 mt-1">
                      {viewUserDialog.user.login_attempts >= 3 ? (
                        <>
                          <Lock className="h-4 w-4 text-red-500" />
                          <Badge variant="destructive" className="text-xs">
                            {viewUserDialog.user.login_attempts}
                          </Badge>
                          <span className="text-sm text-red-600 font-medium">Account Locked</span>
                        </>
                      ) : viewUserDialog.user.login_attempts > 0 ? (
                        <>
                          <Badge variant="outline" className="text-xs">
                            {viewUserDialog.user.login_attempts}
                          </Badge>
                          <span className="text-sm">failed attempts</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">No failed attempts</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Activity */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Account Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Login</label>
                    <p className="text-sm">
                      {viewUserDialog.user.last_login ? (
                        <>
                          {new Date(viewUserDialog.user.last_login).toLocaleDateString()} at{' '}
                          {new Date(viewUserDialog.user.last_login).toLocaleTimeString()}
                        </>
                      ) : (
                        'Never logged in'
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Account Created</label>
                    <p className="text-sm">
                      {new Date(viewUserDialog.user.created_at).toLocaleDateString()} at{' '}
                      {new Date(viewUserDialog.user.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-sm">
                      {new Date(viewUserDialog.user.updated_at).toLocaleDateString()} at{' '}
                      {new Date(viewUserDialog.user.updated_at).toLocaleTimeString()}
                    </p>
                  </div>
                  {viewUserDialog.user.locked_until && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Locked Until</label>
                      <p className="text-sm text-red-600">
                        {new Date(viewUserDialog.user.locked_until).toLocaleDateString()} at{' '}
                        {new Date(viewUserDialog.user.locked_until).toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 