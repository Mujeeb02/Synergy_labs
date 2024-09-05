import React from 'react'
import { User } from '../types'

interface UserDetailsProps {
  user: User
  closeModal: () => void
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, closeModal }) => {
  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute right-2 top-2 text-gray-500 hover:text-red-500 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* User Details */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-indigo-600">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-indigo-500">
          <a href={`mailto:${user.email}`} className="hover:underline">
            {user.email}
          </a>
        </p>
      </div>

      {/* User Info Section */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Personal Information</h3>
          <p className="text-gray-700">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-gray-700">
            <strong>Website:</strong>{' '}
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline"
            >
              {user.website}
            </a>
          </p>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Address</h3>
          <p className="text-gray-700">
            <strong>Street:</strong> {user.address.street}, {user.address.suite}
          </p>
          <p className="text-gray-700">
            <strong>City:</strong> {user.address.city}
          </p>
          <p className="text-gray-700">
            <strong>Zipcode:</strong> {user.address.zipcode}
          </p>
          <p className="text-gray-700">
            <strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
          </p>
        </div>
      </div>

      {/* Company Information */}
      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-700">Company</h3>
        <p className="text-gray-700">
          <strong>Name:</strong> {user.company.name}
        </p>
        <p className="text-gray-700">
          <strong>CatchPhrase:</strong> {user.company.catchPhrase}
        </p>
        <p className="text-gray-700">
          <strong>BS:</strong> {user.company.bs}
        </p>
      </div>
    </div>
  )
}

export default UserDetails
