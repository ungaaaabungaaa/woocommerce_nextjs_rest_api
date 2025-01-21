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

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_WORDPRESS_SITE_URL`
`NEXT_PUBLIC_SITE_URL`
`NEXT_PUBLIC_API_URL`

Create woocommerce rest api auth keys

`WC_CONSUMER_KEY`
`WC_CONSUMER_SECRET`

add in cocart endpoints

`NEXT_PUBLIC_VIEW_CART_URL`
`NEXT_PUBLIC_ADD_CART_URL`

add in paypal keys

`NEXT_PUBLIC_PAYPAL_CLIENT_ID`

add in firebase web keys

`NEXT_PUBLIC_PAYPAL_CLIENT_ID`
`NEXT_PUBLIC_FIREBASE_API_KEY`
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
`NEXT_PUBLIC_FIREBASE_PROJECT_ID`
`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
`NEXT_PUBLIC_FIREBASE_APP_ID`
`NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Roadmap

- SEO
- ChatBot
- e-Lamma
- Customer Reviews
- Machine learning for Product Recommendation
- Fuzzy Search
- GraphQL
- Stripe Payment Gateway
- SMS

## Documentation

[Cocart](https://linktodocumentation) |
[Woocommerce](https://linktodocumentation) |
[FirebaseAuth](https://linktodocumentation)
