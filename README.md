# NextJs Headless Woocomerce Rest App

This project sets up a headless WordPress WooCommerce site with a Next.js frontend. By utilizing WooCommerce as the CMS (Content Management System) and payment provider, we can create an efficient, dynamic eCommerce platform. The backend (WooCommerce) serves as the product and payment system, while the frontend (Next.js) provides a modern, fast user experience.

WooCommerce's REST API is used to connect the Next.js frontend with the WooCommerce backend. Additionally, PayPal is integrated as the payment provider to securely process transactions.

## Screenshots

### home Screen

![Home](https://i.imgur.com/eu1vr1z.jpg)

### Product Screen

![Product](https://i.imgur.com/qqLfGmp.png)

### Scearch Screen

![Search](https://i.imgur.com/bdVrg9Q.png)

### Cart Screen

![Cart](https://i.imgur.com/R3VAP59.png)

### Auth Screen

![Authentication](https://i.imgur.com/SzXbKkg.png)

## Tech Stack

**Client:** React, Redux, TailwindCSS , Shadcn, Nextjs

**Server:** Firebase Auth, Wordpress Woocommerce Rest

## Demo

Demo Link Hosted On vercel

https://woocommerce-nextjs-rest-api.vercel.app/

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

# Environment Variables

This guide will help you configure the .env file when setting up the ClothVillage project. Follow the steps below to ensure all environment variables are correctly configured.

# Environment Variables Explained

### Backend and Frontend URLs

`NEXT_PUBLIC_WORDPRESS_SITE_URL`

- This is the backend WordPress site URL.
  `NEXT_PUBLIC_SITE_URL`
- This is the frontend URL. Replace it with the domain you use for the frontend (e.g., a Vercel deployment URL).

# WooCommerce API Keys

`WC_CONSUMER_KEY=ck_a87bee45cf036ead38159015b3660139962b9c2e`
`WC_CONSUMER_SECRET=cs_fca482b412b6d14ffe164ab6ff8f4f1d6af17ad9`

These keys are generated in WordPress for the REST API. To generate them:

1. Log in to your WordPress admin panel.
2. Navigate to WooCommerce > Settings > Advanced > REST API.
3. Click "Add Key."
4. Enter a description, select the user, and set permissions to Read/Write.
5. Generate the key and copy the Consumer Key and Consumer Secret into the .env file.

# CoCart API Endpoints

- `NEXT_PUBLIC_VIEW_CART_URL=https://clothvillage.com/wp-json/cocart/v2/cart`
- `NEXT_PUBLIC_ADD_CART_URL=https://clothvillage.com/wp-json/cocart/v2/cart/add-item`

These are CoCart endpoints used for cart operations. Note that the URL might change if the backend URL changes, but the endpoints (/cart and /cart/add-item) remain the same.

# Backend API URL

- `NEXT_PUBLIC_API_URL=https://clothvillage.com`
- This is the backend API URL.

# PayPal Client ID

- `NEXT_PUBLIC_PAYPAL_CLIENT_ID=AaMWJxShAuaNSFi30bJSDmVbAwy1LqZgWYyvvFNkkPZEts0uqTh80r2UitF8O32p5odfqFUhzF1Jy0Wq`

1. To generate a PayPal client ID for payment processing:
2. Log in to your PayPal Developer account: https://developer.paypal.com.
3. Navigate to Dashboard > My Apps & Credentials.
4. Create a new app under REST API apps.

# Firebase SDK Keys

- `NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBw7eEVv205f4cAWFYH_xbmuz5JyPXy8LA`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=clothesvillageauth.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID=clothesvillageauth`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=clothesvillageauth.firebase.storage.app`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=448354174238`
- `NEXT_PUBLIC_FIREBASE_APP_ID=1:448354174238:web:7bb4de2650c9b3b345b50f`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BXJ1P36ZEZ`

These are Firebase SDK keys. Ensure they match your Firebase project. If you need to set up a Firebase project:

1. Go to Firebase Console.
2. Create a new project or select an existing one.
3. Navigate to Project Settings > General > Your Apps.
4. Add a new app and copy the configuration keys.

# Deployment on Vercel

If deploying on Vercel, ensure the following:

Update the `NEXT_PUBLIC_SITE_URL` variable to your Vercel deployment URL.
Add all environment variables in the Vercel dashboard:
Go to Settings > Environment Variables in your Vercel project.
Add the variables one by one.

# example .env file

`NEXT_PUBLIC_WORDPRESS_SITE_URL=https://clothvillage.com`
`NEXT_PUBLIC_SITE_URL=http://localhost:3000`
`WC_CONSUMER_KEY=ck_a87bee45cf036ead38159015b3660139962b9c2e`
`WC_CONSUMER_SECRET=cs_fca482b412b6d14ffe164ab6ff8f4f1d6af17ad9`
`NEXT_PUBLIC_VIEW_CART_URL=https://clothvillage.com/wp-json/cocart/v2/cart`
`NEXT_PUBLIC_ADD_CART_URL=https://clothvillage.com/wp-json/cocart/v2/cart/add-item`
`NEXT_PUBLIC_API_URL=https://clothvillage.com`
`NEXT_PUBLIC_PAYPAL_CLIENT_ID=AaMWJxShAuaNSFi30bJSDmVbAwy1LqZgWYyvvFNkkPZEts0uqTh80r2UitF8O32p5odfqFUhzF1Jy0Wq`
`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBw7eEVv205f4cAWFYH_xbmuz5JyPXy8LA`
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=clothesvillageauth.firebaseapp.com`
`NEXT_PUBLIC_FIREBASE_PROJECT_ID=clothesvillageauth`
`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=clothesvillageauth.firebasestorage.app`
`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=448354174238`
`NEXT_PUBLIC_FIREBASE_APP_ID=1:448354174238:web:7bb4de2650c9b3b345b50f`
`NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BXJ1P36ZEZ`

## Roadmap

- SEO
- Customer Reviews
- Machine learning for Product Recommendation
- Fuzzy Search
- GraphQL
- Stripe Payment Gateway
- SMS

## Documentation

[Cocart](https://linktodocumentation) |
[Woocommerce](https://linktodocumentation)
