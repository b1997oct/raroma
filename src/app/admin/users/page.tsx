import Profile from '@/db/Tables/Profile'
import get_base_url from '@/lib/get_base_url'
import Link from 'next/link'
import React from 'react'

export default async function Page() {

    const data = await Profile.aggregate([
        {
            $lookup: {
                from: "schools",
                localField: "_id",
                foreignField: "user",
                as: "school"
            }
        },
        { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } }
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
                                <th>User</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Hashed Password</th>
                                <th>School</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => {
                                return <tr key={d._id} className='border'>
                                    <td>{i+1}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.password}</td>
                                    <td><Link className='link' href={get_base_url(d.subdomain)}>{d.school?.school_name}</Link></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
