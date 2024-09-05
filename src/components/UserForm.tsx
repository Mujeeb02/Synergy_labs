import React, { useState } from 'react'
import { User } from '../types'
import { createUser, updateUser } from '../services/api'
import { toast } from 'react-toastify'

interface UserFormProps {
  user: User | null
  closeModal: () => void
}

const UserForm: React.FC<UserFormProps> = ({ user, closeModal }) => {
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userData = { name, email, phone }
    try {
      if (user) {
        await updateUser(user.id, userData)
        toast.success('User updated successfully!', {
          position: 'top-right',
        })
      } else {
        await createUser(userData)
        toast.success('User created successfully!', {
          position: 'top-right',
        })
      }
      closeModal()
    } catch (error) {
      toast.error('Error submitting user data!', {
        position: 'top-right',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-bold">{user ? 'Edit User' : 'Create User'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={closeModal} className="rounded-md bg-gray-500 px-4 py-2 text-white">
          Cancel
        </button>
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          {user ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default UserForm
