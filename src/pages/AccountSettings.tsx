import { getSession } from '../services/UserService.tsx'
import { useEffect, useState } from 'react'

import { logout } from '../services/AuthService.tsx'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const logoutHandle = async () => {
    logout().then(() => {
        window.location.href = import.meta.env.VITE_cognito_logout_url
        return
    })
}

const AccountSettings = () => {
    const [user, setUser] = useState({ username: '', email: '' })

    useEffect(() => {
        getSession().then((data) => {
            console.log(data)
            setUser(data)
        })
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600 mb-8">
                Manage your account settings and set e-mail preferences.
            </p>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <nav className="space-y-1">
                        <a className="block px-4 py-2 bg-gray-100 text-gray-900 rounded">
                            Profile
                        </a>
                    </nav>
                </aside>

                <main className="w-full md:w-3/4">
                    <h2 className="text-2xl font-semibold mb-2">Profile</h2>
                    <p className="text-gray-600 mb-6">
                        This is how others will see you on the site.
                    </p>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="Enter name" />
                            <p className="text-sm text-gray-500">
                                This is your public display name. It can be your
                                real name or a pseudonym. You can only change
                                this once every 30 days.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Select>
                                <SelectTrigger id="email">
                                    <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="email1">
                                        email1@example.com
                                    </SelectItem>
                                    <SelectItem value="email2">
                                        email2@example.com
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-gray-500">
                                You can manage verified email addresses in your
                                email settings.
                            </p>
                        </div>

                        <Button type="submit" className="w-full md:w-auto">
                            Update profile
                        </Button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default AccountSettings
