import { useState, useEffect } from 'react'
import { fetchUsers, deleteUser } from '../services/api'
import { User } from '../types'
import Loader from './Loader'
import UserForm from './UserForm'
import UserDetails from './UserDetail'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data)
      } catch (error) {
        alert('Error fetching users!')
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      setUsers(users.filter((user) => user.id !== id))
    } catch (error) {
      alert('Error deleting user!')
    }
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleUserDetails = (user: User) => {
    setSelectedUser(user)
    setShowDetailsModal(true) // Open the UserDetails modal
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedUser(null) // Reset the selected user
  }

  if (loading)
    return (
      <div className=" mt-[30%] flex items-center justify-center">
        <Loader />
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold text-indigo-600">User Management</h1>

      {/* Create New User Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleCreateUser}
          className="inline-block rounded-lg bg-indigo-500 px-6 py-3 text-xl font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-indigo-600"
        >
          + Create New User
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-lg text-xl shadow-lg">
        <table className="min-w-full border-collapse overflow-hidden rounded-lg bg-white">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="border-b px-6 py-4 text-left text-xl font-semibold">Name</th>
              <th className="border-b px-6 py-4 text-left text-xl font-semibold">Email</th>
              <th className="border-b px-6 py-4 text-left text-xl font-semibold">Phone</th>
              <th className="border-b px-6 py-4 text-left text-xl font-semibold">Actions</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td
                  className="cursor-pointer border-b px-6 py-3 text-blue-600 hover:underline"
                  onClick={() => handleUserDetails(user)}
                >
                  {user.name}
                </td>{' '}
                <td className="border-b px-6 py-4 text-xl">{user.email}</td>
                <td className="border-b px-6 py-4 text-xl">{user.phone}</td>
                <td className="flex space-x-2 border-b px-6 py-4">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="rounded-lg bg-yellow-400 px-4 py-2 text-white shadow transition hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white shadow transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl transition-all duration-300">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-400 transition hover:text-gray-600"
            >
              &#x2715;
            </button>
            <UserForm user={selectedUser} closeModal={handleCloseModal} />
          </div>
        </div>
      )}
      {/* Modal for User Details */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
            <UserDetails user={selectedUser} closeModal={handleCloseDetailsModal} />
          </div>
        </div>
      )}
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  )
}

export default UsersList
