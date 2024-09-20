import React from 'react';
import Modal from 'src/components/Common/Modal';
import UserForm from './UserForm';
import { User } from 'src/types/user';

interface UserActionModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSubmit: (user: User) => void;
}

const UserActionModal: React.FC<UserActionModalProps> = ({ open, onClose, user, onSubmit }) => {
  return (
    <Modal open={open} onClose={onClose} title={user ? 'Edit User' : 'Add User'}>
      <UserForm
        initialData={user || undefined}
        onSubmit={(updatedUser) => {
          onSubmit(updatedUser);
          onClose();
        }}
      />
    </Modal>
  );
};

export default UserActionModal;
