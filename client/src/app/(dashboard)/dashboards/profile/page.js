import React from 'react'
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "Profile | Viatours Voyage", description: "Manage your Viatours Voyage profile.", path: "/dashboards/profile", robots: { index: false, follow: false } });

const Profile = () => {
  return (
    <div>This is  Profile page</div>
  )
}

export default Profile
