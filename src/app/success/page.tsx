import Layout from '@/components/Layout';
import get_base_url from '@/lib/get_base_url';
import React from 'react'

export default async function Page({ searchParams }) {

    const { token , subdomain="admin" } = await searchParams
    console.log('token: ', token);

    const url = get_base_url(subdomain) + '/token?token=' + token
    console.log('url: ', url);

    return (
        <Layout active='Login'>
            <div className='flex justify-center'>
                <div className='w-full max-w-sm shadow-sm p-4 mt-20'>
                    <h2 className='text-4xl font-bold mb-20'>Login Successfull</h2>
                    <a href={url}><button>Take Me to my dashboard</button></a>
                </div>
            </div>
        </Layout>
    )
}
