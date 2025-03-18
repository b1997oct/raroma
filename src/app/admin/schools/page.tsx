import Profile from '@/db/Tables/Profile'
import School from '@/db/Tables/School'
import get_base_url from '@/lib/get_base_url'
import Link from 'next/link'
import React from 'react'

export default async function Page() {

    const data = await School.aggregate([
        {
            $lookup: {
                from: "profiles",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user"}
    ])

    return (
        <div>
            <div className='p-4'>
                <h3>User Table</h3>
            </div>
            <div className='flex justify-center mt-4'>
                <div className='w-full shadow p-4'>
                    <h2>All User Profiles</h2>

                    <table className='w-full mt-8'>
                        <thead >
                            <tr className='border'>
                            <th>SL</th>
                                <th>School</th>
                                <th>Assigned Sub-Domain</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Description</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => {
                                return <tr key={d._id} className='border'>
                                    <td>{i+1}</td>
                                    <td><Link className='link' href={get_base_url(d.user.subdomain)}>{d.school_name}</Link></td>
                                    <td>{d.user.subdomain}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.description}</td>
                                    <td>{d.user.name}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
