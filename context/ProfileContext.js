import { useState } from 'react'
import constate from 'constate'

const useProfile = () => {
  const [profile, setProfile] = useState(null)
  const [profileError, setProfileError] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  return {
    profile,
    setProfile,
    profileError,
    setProfileError,
    profileLoading,
    setProfileLoading,
    loadingMessage,
    setLoadingMessage,
  }
}

export const [ProfileProvider, useProfileContext] = constate(useProfile)
