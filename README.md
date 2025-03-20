This is a [Next.js](https://nextjs.org) project
## Getting Started
First, run the development server:

Database = mongodb

```bash
npm i

npm run dev 
```

Open [http://localhost:3000] with your browser to see the result.


*Features Implemented*

 JWT for tokeniztion
 bcrypt for password hashing

 *implimented subdomain based routing*
 1. http://school1.localhost:3000 --> school1
 2. http://school2.localhost:3000 --> school2

 *Data is isolated to its subdomain*
    1. http://school2.localhost:3000 only school2 accounts can only login using this url

 *at [subdomain]/school*
 1. protected only access by school
 2. school can edit its profile

 *at "/admin"*
 1. added admin go to  -> login
    Login Creds : email = admin@test.com & password= admin

 2. [/admin/*] protected redirect to */admin*

<!-- end -->
