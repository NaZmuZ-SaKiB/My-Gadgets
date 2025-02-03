# My Gadgets

This is the frontend of my full-stack ecommerce project. User can browse products by a robust filtering system. User can add a product to their cart or wishlist. User authentication and role based route protection is implemented. User account is needed to purchase a product which can be managed by the user. Stripe Payment is implemented for online payment. NextJs server side rendering and server actions is heavily used in this project to take the full benefits if NextJs framework. NextJs built-in loading page and ReactJs suspense component is utilized to show loading states.

### [Live Site Link](https://lost-and-found-system-nextjs.vercel.app)

### Credendials:

`User:`
`email:` spider@man.com
`password:` 11111111

## Technology

1.  NextJs
2.  Jose
3.  Stripe
4.  Tanstack Query
5.  React Hook Form
6.  Cloudinary
7.  Shadcn UI
8.  Tailwind CSS
9.  Zod
10. JsPDF
11. TypeScript

## Run the project in your local mechine

### Requirements

- Node Js (Make sure you have node js installed on your mechine).

### Installation

1. Clone this repo:
   - `git clone https://github.com/NaZmuZ-SaKiB/My-Gadgets.git`
2. Install all necessary dependencies:
   - `cd My-Gadgets`
   - `npm install` or `yarn`
3. Create a `.env` file in current directory and add following properties:

   - `NEXT_PUBLIC_FRONTEND_URL` = frontend url
   - `BACKEND_URL` = backend server url
   - `JWT_SECRET` = token secret for jwt
   - `NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME` = cloudinary folder name
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = cloudinary cloud name
   - `NEXT_PUBLIC_CLOUDINARY_API_KEY` = cloudinary api key
   - `CLOUDINARY_API_SECRET` = cloudinary api secret
   - `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` = stripe public key
   - `STRIPE_SECRET_KEY` = stripe secret key

4. Run the development server using following command:
   - `npm run dev` or `yarn dev`
5. To build the project run following command:
   - `npm run build` or `yarn build`
6. To run the build version of the project run following command:

   - `npm run start` or `yarn start`

### Routes

- **/** : Homepage
- **/sign-in** : User login page
- **/sign-up** : User registration page
- **/account** : Update Account information page
- **/account/orders** : Orders page
- **/account/addresses** : Edit, Remove and Add address page
- **/account/change-password** : Change password page
- **/wishlist** : Wishlist page
- **/compare** : Compare page
- **/checkout** : Checkout page
- **/payment** : Payment page
- **/payment-success** : Payment success page
- **/shop** : Shop page
- **/shop/:category** : Shop page (Category wise)
- **/products/:slug/:id** : Product details page
- **/search** : Search page
- **/contact** : Contact page
- **/about-us** : About page
- **/privacy-policy** : Privacy policy page
- **/emi-terms** : EMI Terms page
- **/refund-return-policy** : Refund & Return policy page
- **/orders/:id** : Single order details page
- **/orders/:id/invoice** : Order invoice page

```
Admin Routes
```

- **/admin** : Admin Dashboard
- **/admin/media** : Media page
- **/admin/products** : Products Listing page
- **/admin/products/:id** : Products Edit page
- **/admin/products/add-product** : Add Product page
- **/admin/categories** : Add Category + Categories Listing page
- **/admin/categories/:id** : Edit Category page
- **/admin/brands** : Add Brand + Brands Listing page
- **/admin/brands/:id** : Edit Brand page
- **/admin/reviews** : Reviews page
- **/admin/orders** : Orders Listing page
- **/admin/orders/:id** : Orders Details page
- **/admin/users** : Users Listing page
- **/admin/users/add-admin** : Add Admin page
- **/admin/users/profile** : Admin Profile page
- **/admin/branches** : Add Branch + Branches Listing page
- **/admin/branches/:id** : Edit Branch page
- **/admin/settings/homepage** : Homepage Settings page
- **/admin/settings/category** : Category Settings page
- **/admin/settings/footer** : Footer Settings page
- **/admin/settings/social** : Social Settings page

### Deployment

1. Push the project at Github.
2. Create a vercel account and connect the github repository.
3. Go to Add new project and select the repository.
4. Add the environment variables.
5. Deploy the project.
