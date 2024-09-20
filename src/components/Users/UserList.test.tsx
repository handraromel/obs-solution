import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserList from 'src/components/Users/UserList';
import { fetchUsers, deleteUser, updateUser } from 'src/store/slices/userSlice';
import { RootState } from 'src/store';

jest.mock('../store/slices/userSlice', () => ({
  fetchUsers: jest.fn(),
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
}));

describe('UserList Component', () => {
  let store: ReturnType<typeof configureStore>;
  const initialState: RootState = {
    users: {
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          company: { name: 'ABC Corp', catchPhrase: '', bs: '' },
          address: {
            city: 'New York',
            street: '',
            suite: '',
            zipcode: '',
            geo: { lat: '', lng: '' },
          },
          website: 'johndoe.com',
          username: 'johndoe',
          phone: '',
        },
      ],
      loading: false,
      error: null,
      lastUpdated: Date.now(),
    },
  };

  beforeEach(() => {
    // store = configureStore({
    //   reducer: {
    //     users: (state = initialState.users) => state,
    //   },
    //   preloadedState: initialState,
    // });
    jest.spyOn(store, 'dispatch');
  });

  it('renders UserList component', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    // expect(screen.getByText('John Doe')).toBeInTheDocument();
    // expect(screen.getByText('john@example.com')).toBeInTheDocument();
    // expect(screen.getByText('ABC Corp')).toBeInTheDocument();
    // expect(screen.getByText('New York')).toBeInTheDocument();
    // expect(screen.getByText('johndoe.com')).toBeInTheDocument();
  });

  it('dispatches fetchUsers action on mount', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(fetchUsers).toHaveBeenCalled();
  });

  it('opens UserDetails modal when Details button is clicked', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    fireEvent.click(screen.getByText('Details'));
    // expect(screen.getByText('User Details')).toBeInTheDocument();
  });

  it('opens UserAction modal for editing when Edit button is clicked', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    fireEvent.click(screen.getByText('Edit'));
    // expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('opens delete confirmation modal when Delete button is clicked', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    fireEvent.click(screen.getByText('Delete'));
    // expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
  });

  it('dispatches deleteUser action when delete is confirmed', async () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(1);
    });
  });

  it('dispatches updateUser action when user is edited', async () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByText('Update User'));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jane Doe' }));
    });
  });

  it('renders loading state', () => {
    const loadingState: RootState = {
      users: {
        ...initialState.users,
        loading: true,
      },
    };
    const loadingStore = configureStore({
      reducer: {
        users: (state = loadingState.users) => state,
      },
      preloadedState: loadingState,
    });

    render(
      <Provider store={loadingStore}>
        <UserList />
      </Provider>
    );

    // expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorState: RootState = {
      users: {
        ...initialState.users,
        error: 'Failed to fetch users',
      },
    };
    const errorStore = configureStore({
      reducer: {
        users: (state = errorState.users) => state,
      },
      preloadedState: errorState,
    });

    render(
      <Provider store={errorStore}>
        <UserList />
      </Provider>
    );

    // expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument();
  });
});
