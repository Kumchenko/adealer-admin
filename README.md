![AppleDealer](https://github.com/Kumchenko/adealer-admin/assets/60291758/469ba79d-96ad-498a-8415-db321cfd0d56)

# ADealer Admin

[Live Demo](https://adealer-admin.vercel.app/login)
_Use admin/admin credentials for it_

#### Summary

It's Frontend of Admin Panel, which is the part of [ADealer project](https://github.com/Kumchenko/appledealer). Admin Panel is UI for processing ADealer incoming data.

This projects implements:

-   Orders and Calls pages, which have forms with what you can **filter** or **sort** according data from Backend.
-   All retrieved data is **cached** and revalidates on demand using RTK Query.
-   Pages with multiple items support **pagination** with selecting count of items per page and the page itself.
-   Individual Order and Call pages for updating, processing or deleting opened Order or Call accordingly with **synchronizing** data with Backend.
-   Login and Logout pages which provide **Authorization** Flow.
-   **Reauthorization** Flow using Axios interceptors with access and refresh tokens.
-   Dashboard page which show basic statistics using **Pie Charts** about Orders and Calls such as count of all, created, processing or done items, popular service.
-   Universal configurable **modal window** for notifying about successful operations, errors or making suggestions for Employee while working with this admin panel
-   **Controlled forms** with validation.
-   **Responsive design** for tablets and phones

#### Technology stack

Next.js, TypeScript, Redux-Toolkit, RTK Query, React, Axios, Formik, Yup, Tailwind

#### Table of contents

-   [Getting started](#getting-started)
-   [Usage](#usage)
    -   [Pages](#pages)
        -   [Login page](#login-page)
        -   [Dashboard page](#dashboard-page)
        -   [Orders page](#orders-page)
        -   [Calls page](#calls-page)
        -   [Logout page](#logout-page)
    -   [Modal window](#modal-window)
-   [Notes](#notes)
-   [Contacts](#contacts)

---

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/Kumchenko/adealer-admin.git
```

2. Install all project dependencies:

```bash
npm i
```

3. Run your [ADealer Server](https://github.com/Kumchenko/adealer-server) and set API address to NEXT_PUBLIC_API in .env.development file

```
# Base API URL for RTK Query requests
NEXT_PUBLIC_API=http://HOST:PORT
```

4. Now you can run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Usage

### Pages

This Admin Panel has 7 pages. Description of each of them is given below.

#### Login page

![Login page](https://github.com/Kumchenko/adealer-admin/assets/60291758/8289e2a9-6c67-4517-aaf9-09597d9906b2)

With this page you can become authorized for accessing admin's info. Provide login and password, which is specified on Employee table of your Database on [ADealer Server](https://github.com/Kumchenko/adealer-server).

---

#### Dashboard page

![Dashboard page](https://github.com/Kumchenko/adealer-admin/assets/60291758/71650824-9140-4e2b-b7a9-913c9e9baa71)

Dashboard page contains statistics about Orders and Calls, such as count and percentage of created, processing or done Orders and count of created or checked Calls, general count of Orders and Calls. Dashboard also shows popular model and component. Some data showed using Pie Charts.

---

#### Orders page

![Orders page](https://github.com/Kumchenko/adealer-admin/assets/60291758/0b0f1ac9-9029-4ba3-b21b-d419e7f6390c)

Example how to use this page is demonstrated above. You can filter Orders, search by some fields or by datetime range of creation or issuing new operation. Also you can change pages, sort Orders by fields, choose sorting order or open Order for processing.

---

#### Calls page

![Calls page](https://github.com/Kumchenko/adealer-admin/assets/60291758/22460b5c-54ec-4ac6-a3e6-88d1fb101afa)

Example how to use this page is demonstrated above. You can filter Calls, search by some fields or by datetime range of creation or issuing new operation. Also you can change pages, sort Calls by fields, choose sorting order or open Call for processing.

---

#### Order page

![Order page](https://github.com/Kumchenko/adealer-admin/assets/60291758/38687be3-4ea4-442b-a6e0-79accf7282e5)

This page can be opened from Orders page. Here you can update some Order information or change statuses. Also you can delete Order or close it and return to all Orders.

---

#### Call page

![Call page](https://github.com/Kumchenko/adealer-admin/assets/60291758/6e0928f1-8d04-45d7-9eff-5f13288ef8d8)

This page can be opened from Calls page. Here you can update some Call information or change status of it. Also you can delete Call or close it and return to all Calls.

---

#### Logout page

![Logout page](https://github.com/Kumchenko/adealer-admin/assets/60291758/ad77d16a-2f3b-4fb8-8e6b-943a60e4b15f)

This page just shows spinner, sends request for invalidating authorization cookies and redirects to '/login'

---

### Modal window

Here you cant see how Modal window looks.

-   Informational modal:

![Info modal](https://github.com/Kumchenko/adealer-admin/assets/60291758/776489b6-90ec-45ea-9d65-0a0cd8bbd084)

-   Error modal:

![Error modal](https://github.com/Kumchenko/adealer-admin/assets/60291758/6c2848c9-b032-460f-8723-7d0aed2e5d75)

## Notes

If you here, then you have read this README till this paragraph. Some basic must-have operations are implemented in this panel, other additional operations you can do through Prisma Studio of your [ADealer Server](https://github.com/Kumchenko/adealer-server) or implement them in this panel by yourself.

## Contacts

Kyrylo Kumchenko – kirillkumchenko@gmail.com

Project link: <https://github.com/Kumchenko/adealer-admin>
