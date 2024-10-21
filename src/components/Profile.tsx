
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSession } from '@/services/UserService'
import { useEffect, useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState({ username: '', email: '' })

    useEffect(() => {
        getSession().then((data) => {
            setUser(data)
        })
    }, [])
    return (
        <main className="w-full md:w-3/4 ">
        <h2 className="text-2xl font-semibold mb-2">Profile</h2>
        <p className="text-gray-600 mb-6">
            This is how others will see you on the site.
        </p>

        <form className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input readOnly id="username" value={user.username}/>
                <p className="text-sm text-gray-500">
                    This is your public display name.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input readOnly id="email" value={user.email} />

                <p className="text-sm text-gray-500">
                    You can manage verified email addresses in your
                    email settings.
                </p>
            </div>

            {/* <Button type="submit" className="w-full md:w-auto">
                Update profile
            </Button> */}
        </form>
    </main>
    )
}

export default Profile