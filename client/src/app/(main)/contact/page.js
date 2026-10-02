import React from 'react'
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "Contact | Viatours Voyage", description: "Get in touch with the Viatours Voyage team.", path: "/contact" });
const Contact = () => {
  return (
    <div className=''>This is Contact pages</div>
  )
};
export default Contact
