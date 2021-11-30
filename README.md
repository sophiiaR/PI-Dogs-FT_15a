
# Dogspedia

<p align="left">
  <img height="200" src="./dog.png" />
</p>
Individual Project - SPA

## Features

- See up to 9 dog breeds in a single page with their name, image, and temperament.
- Pagination
- See the detail (image, name, height (in cm) and weight (in kg), life span, and temperaments) of a certain breed by clicking the image.
- Filter breeds by temperament and by existing breed or created by us.
- Sort dog breeds both in ascending and descending order, alphabetically and by weight.
- Search input to find dog breeds by name.
- Create your own breed.

### Tech Stack

**Front-end**: React, Redux.

**Back-end**: Node, Express.

**DB**: PostgreSQL, Sequelize.

**Requirements**: 
* __Node__: 12.18.3 or higher
* __NPM__: 6.14.16 or higher

## How to Run Locally

To run this project, first you will need to add the following environment variables to your .env file.

`API_KEY` - you can get one by creating an account on the [dogs api](https://thedogapi.com).

`DB_USER` - your database username.

`DB_PASSWORD` - your database password.

`DB_HOST`- the host where your database is located.

`DB_NAME`: dogs

Next steps:

Clone the project

```bash
git clone https://github.com/sophiiaR/PI-Dogs-FT_15a.git
```

Go to the project directory

```bash
cd PI-Dogs-FT_15a
```

Head to the api folder and install dependencies

```bash
cd api
npm install
```

Head to the client folder

```bash
cd client
npm install
```

Finally, execute `npm start` in both folders.

## Screenshots
#### Landing Page
![landing](https://user-images.githubusercontent.com/78318499/144047950-61d88353-158a-479c-9be9-98731b2b3432.png)

#### Home Page
![home](https://user-images.githubusercontent.com/78318499/144048298-3d47bbc8-0797-4133-b954-d2b1dcade751.png)

#### Detail Page
![detail](https://user-images.githubusercontent.com/78318499/144048367-27744c33-17bc-49dd-af64-925f4079bdfc.png)


