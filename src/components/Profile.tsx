
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Profile = () => {
    return (
        <main className="w-full md:w-3/4 ">
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
                <Input id="email" placeholder="Email" />

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