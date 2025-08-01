'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { DEFAULT_USER_PASSWORD } from '@/lib/constants';

interface NewUser {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role: 'user' | 'administrator';
  is_active: boolean;
}

interface ExistingUser {
  id: number;
  email: string;
  full_name: string;
  phone: string | null;
  role: 'user' | 'administrator';
  is_active: boolean;
}

interface UserDialogProps {
  onUserCreate?: (userData: NewUser) => Promise<void>;
  onUserUpdate?: (userId: number, userData: Partial<NewUser>) => Promise<void>;
  onClose?: () => void;
  existingUser?: ExistingUser | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

export function UserDialog({ 
  onUserCreate, 
  onUserUpdate, 
  onClose,
  existingUser, 
  mode = 'add',
  trigger 
}: UserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<NewUser>({
    email: '',
    password: DEFAULT_USER_PASSWORD,
    full_name: '',
    phone: '',
    role: 'user',
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // Update form data when existingUser changes or mode changes
  useEffect(() => {
    if (mode === 'edit' && existingUser) {
      setUserData({
        email: existingUser.email,
        password: DEFAULT_USER_PASSWORD, // Always use default password
        full_name: existingUser.full_name,
        phone: existingUser.phone || '',
        role: existingUser.role,
        is_active: existingUser.is_active,
      });
      
      // Only auto-open if we haven't opened for this user yet
      if (!hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
    } else if (mode === 'add') {
      // Reset form for add mode
      setUserData({
        email: '',
        password: DEFAULT_USER_PASSWORD,
        full_name: '',
        phone: '',
        role: 'user',
        is_active: true,
      });
      setHasAutoOpened(false);
    }
  }, [mode, existingUser, hasAutoOpened]);

  // Reset hasAutoOpened when existingUser changes to a different user or becomes null
  useEffect(() => {
    setHasAutoOpened(false);
  }, [existingUser?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!userData.email || !userData.full_name) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (mode === 'edit' && existingUser && onUserUpdate) {
        // For edit mode, we don't send the password as it's not changing
        const updateData = {
          email: userData.email,
          full_name: userData.full_name,
          phone: userData.phone,
          role: userData.role,
          is_active: userData.is_active,
        };
        await onUserUpdate(existingUser.id, updateData);
      } else if (mode === 'add' && onUserCreate) {
        await onUserCreate(userData);
      }
      
      // Reset form and close dialog on success
      setUserData({
        email: '',
        password: DEFAULT_USER_PASSWORD,
        full_name: '',
        phone: '',
        role: 'user',
        is_active: true,
      });
      setIsOpen(false);
      setHasAutoOpened(false);
      
      // Call onClose callback if provided (especially for edit mode)
      if (onClose) {
        onClose();
      }
    } catch (error) {
      // Re-throw the error so parent component can handle it and show toast
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setUserData({
      email: '',
      password: DEFAULT_USER_PASSWORD,
      full_name: '',
      phone: '',
      role: 'user',
      is_active: true,
    });
    setIsOpen(false);
    setHasAutoOpened(false);
    
    // Call onClose callback if provided (especially for edit mode)
    if (onClose) {
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    // If dialog is being closed, call onClose callback and reset auto-open flag
    if (!open) {
      setHasAutoOpened(false);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {mode === 'edit' ? 'Edit User' : 'Add New User'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">
                Full Name <span className="text-secondary">*</span>
              </Label>
              <Input
                id="full_name"
                value={userData.full_name}
                onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                placeholder="John Doe"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-secondary">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="john.doe@agd.gov.mw"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                placeholder="+265 123 456 789"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-secondary">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={userData.password}
                readOnly
                placeholder="••••••••"
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Default password: {DEFAULT_USER_PASSWORD} (User can change after first login)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={userData.role}
                onChange={(e) => setUserData({ ...userData, role: e.target.value as 'user' | 'administrator' })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isSubmitting}
              >
                <option value="user">User</option>
                <option value="administrator">Administrator</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={userData.is_active}
                onChange={(e) => setUserData({ ...userData, is_active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
                disabled={isSubmitting}
              />
              <Label htmlFor="is_active">Active User</Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (mode === 'edit' ? 'Updating...' : 'Creating...') 
                : (mode === 'edit' ? 'Update User' : 'Create User')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Export both UserDialog and AddUserDialog for backward compatibility
export { UserDialog as AddUserDialog };