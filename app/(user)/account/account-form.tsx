'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Section from '@components/Section'
import { FaUser, FaEnvelope, FaSignOutAlt, FaSave } from 'react-icons/fa'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const getProfile = useCallback(async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        setUsername(data.username)
        setFullname(data.full_name)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.id, supabase])

  useEffect(() => {
    if (!user?.id) return
    getProfile()
  }, [user?.id, getProfile])

  async function updateProfile({
    username,
    fullname,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    if (!user?.id) return

    try {
      setLoading(true)
      setUpdateSuccess(false)

      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-mainColor/15 to-transparent pt-24 pb-16" noPadding={true}>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Account Settings
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your profile information and account preferences
          </p>
        </div>
      </Section>

      {/* Account Form Section */}
      <Section>
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Profile Information</h2>
              <p className="text-muted-foreground">Update your personal details and profile settings</p>
            </div>

            {loading && !fullname ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Email Field (Disabled) */}
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2">
                    <FaEnvelope className="text-mainColor" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="mt-2 bg-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Your email cannot be changed</p>
                </div>

                {/* Full Name Field */}
                <div>
                  <Label htmlFor="fullName" className="text-foreground font-medium flex items-center gap-2">
                    <FaUser className="text-mainColor" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullname || ''}
                    onChange={(e) => setFullname(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Username Field */}
                <div>
                  <Label htmlFor="username" className="text-foreground font-medium flex items-center gap-2">
                    <FaUser className="text-mainColor" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Success Message */}
                {updateSuccess && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                      ✓ Profile updated successfully!
                    </p>
                  </div>
                )}

                {/* Update Button */}
                <Button
                  onClick={() => updateProfile({ fullname, username, avatar_url })}
                  disabled={loading}
                  className="w-full bg-mainColor hover:bg-mainColor/90 text-white font-semibold py-3 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Account Actions Card */}
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Account Actions</h2>
              <p className="text-muted-foreground">Manage your account security and access</p>
            </div>

            <form action="/auth/signout" method="post">
              <Button
                type="submit"
                variant="outline"
                className="w-full border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 text-red-600 dark:text-red-400 font-semibold py-3 flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Account Stats Section */}
      <Section className="bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Activity</h2>
            <p className="text-muted-foreground">Track your engagement with DevsHurdle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-background rounded-lg border border-border text-center">
              <p className="text-3xl font-bold text-mainColor mb-2">0</p>
              <p className="text-foreground font-semibold">Saved Solutions</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border text-center">
              <p className="text-3xl font-bold text-mainColor mb-2">0</p>
              <p className="text-foreground font-semibold">Bookmarks</p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border text-center">
              <p className="text-3xl font-bold text-mainColor mb-2">Member</p>
              <p className="text-foreground font-semibold">Account Status</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Help Section */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Need Help?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            If you're experiencing issues with your account or have questions about your profile settings
          </p>
          <Button className="bg-mainColor hover:bg-mainColor/90 text-white font-semibold px-8 py-3">
            Contact Support
          </Button>
        </div>
      </Section>
    </>
  )
}