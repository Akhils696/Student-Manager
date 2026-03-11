import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, logout, updateProfile } from '../../store/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(updateProfile(profileData));
    if (!result.error) {
      setIsEditing(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    const result = await dispatch(deleteProfile());
    if (!result.error) {
      dispatch(logout());
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-2">
      <div className="surface-panel-strong p-8">
        <p className="text-sm uppercase tracking-[0.26em] text-cyan-600 dark:text-cyan-300">Profile</p>
        <h2 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">Manage your workspace identity</h2>
        <p className="page-copy">Update how your account appears across the planner and keep your login details current.</p>
      </div>

      <div className="surface-panel p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-muted">First Name</label>
                <input id="firstName" name="firstName" type="text" value={profileData.firstName} onChange={handleChange} className="field-input" />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-muted">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={profileData.lastName} onChange={handleChange} className="field-input" />
              </div>
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-muted">Username</label>
                <input id="username" name="username" type="text" value={profileData.username} onChange={handleChange} className="field-input" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">Email</label>
                <input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} className="field-input" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="submit" disabled={isLoading} className={`primary-button ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="secondary-button">Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="metric-card">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted">Name</h3>
                <p className="text-gray-900 dark:text-white">{profileData.firstName} {profileData.lastName}</p>
              </div>
              <div className="metric-card">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted">Username</h3>
                <p className="text-gray-900 dark:text-white">{profileData.username}</p>
              </div>
              <div className="metric-card">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted">Email</h3>
                <p className="text-gray-900 dark:text-white">{profileData.email}</p>
              </div>
              <div className="metric-card">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted">Member Since</h3>
                <p className="text-gray-900 dark:text-white">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => setIsEditing(true)} className="primary-button">Edit Profile</button>
              <button onClick={() => dispatch(logout())} className="secondary-button">Logout</button>
              <button onClick={handleDeleteAccount} className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
