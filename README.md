This is a [Next.js](https://nextjs.org) project
## Getting Started
First, run the development server:

Database = mongodb

```bash
npm i

npm run dev 
```

Open [http://localhost:3000] with your browser to see the result.

Rest you can follow browser

/school path is protected path and only available to correct owner

if the user goes to subdomain that is not found in database then also its shows default page content

*Features Implemented*

added JWT for tokeniztion
added bcrypt for password hashing


 *at "/school"*
 1. protected
 2. Added subdomain validation subdomain must be unique

 3. When user change subdomain he will be automatically signin to his new subdomain


 *at "/admin"*
 1. added admin go to  -> login & check all the data

"/admin/*" -> 
2. protected redirect to '/admin'



 *at page "/"*
 if not subdomain found then it will be redirected to base domain

 http://school1.localhost:3000 --> valid sub-domain > do nothing & not auth required

 http://school2.localhost:3000 --> valid sub-domain > do nothing --||--

 http://not-subdomain.localhost:3000 --> in valid sub-domain > redirect to http://localhost:3000


<!-- end -->
