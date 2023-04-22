# REED Kalisz Website

Product managament website for Reed Kalisz.

# Run

1. Backend: `npm i` `npm run start`
2. Frontend: `cd client` `npm i` `npm run build` `npm run start`

# Develop

**Use [prettier](https://prettier.io/)!**

### backend

Run nodemon: `npm i` `npm run dev`

### frontend

Run the SvelteKit compiler: `cd client` `npm i` `npm run dev` \
Remember to build with `npm run build` for production!

# Docs

## routes, models and controllers

Routing is based on the file system.\
Routes are defined the `server/routes` folder.

- file names should be **plural**
- use **kebab** case style for naming files and folders
- `__index.js` represents the root `/` route
- examples: `products.js`, `menu/menu-items.js`

Models are defined in the `server/models` folder.\
Controllers are defined in the `server/controllers` folder.

- file and folder names should be **singular**
- use **pascal** case style for naming files and folders
- examples: `Product.js`, `Menu/MenuItem.js`

Each Route is passed an Express router and a Controller that corresponds to it.\
Each Route needs to export the Express router.

Each Controller is passed the Model that corresponds to it.\
Each Controller needs to export an object.

Each Model needs to export a mongoose model.

## services

A Controllers job should **only** be to receive requests and handle them.\
In order to do that efficiently a Controller should call on appropriate Services.\
In other words: Controllers order Services to do some job. Sort of like a manager and developer relationship.\
You don't need to use Services, but they will make your life much easier (and leave your code DRY).

**A longer example**: a Controller handles a request to return some product. Say you also need to calculate a price based on the data received from the user. Now, a Controller first handles the request, gets it's parameters and body. After that it orders a CRUD service to fetch the product data. Then it could order the same CRUD service to fetch the price tables. Then orders a calculation service to return a price. In the end the controller returns data to the user.

## middleware

It's just Express middleware.

## the `_` variable

In a **Route** file it represents the corresponding **Controller**.\
In a **Controller** file it represents the corresponding **Model**.\
If either does not exist it will take the value of `null`.\
You can of course still import other Models and Controllers!

## aliases

Aliases offer some additional convenience when importing files.\
Say goodbye to `../../../../`.

The aliases below point to the most important folders in the project.\
They also remove the need to use the `.js` extension when importing js files.

- `#controllers`: `./server/controllers`
- `#routes`: `./server/routes`
- `#middleware`: `./server/middleware`
- `#models`: `./server/models`
- `#services`: `./server/services`

You can also create your own aliases in the `package.js` file.

## batteries included

### services

#### auth

**default** `startSession` `endSession` `getSession` `encryptPassword` `comparePasswords`

Authentication services.\
They only deal with the users session (Redis instead of MongoDB).

#### crud

**default** `create` `read` `update` `del`

CRUD (Create Read Update Delete) operations.\
You can read data from the db using a filter.\
Updating and deleting can only be done by specifying an ID.\
You can also import a send middleware

#### img

**default** `save` `del`

Image uploading services.

### middleware

#### auth

**default**

Authentication services.\
They only deal with the users session (Redis instead of MongoDB).

#### crud

**default** `create` `read` `update` `del`\
**crud** default\
**send** `send`

CRUD (Create Read Update Delete) middleware.\
It uses methods from the crud service.\
You can also import a `send` middleware which immediatelly sends crud results to the client.

#### img

**default** `save` `del`

Image uploading middleware.\
It uses methods from the img service.

# Examples

#### Model

```js
// Product.js
import mongoose from 'mongoose';

export default mongoose.model(
  'Product',
  new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    priceBase: Number, // not the price!
  })
);
```

#### Controller

```js
// Product.js
import calculator from '#services/calculator';

export default _ => ({
  calculate: async (req, res) => {
    try {
      const data = req.json; // data read by `crud.read`
      const prices = calculator.getPrices(data.docs);
      res.status(200).json(prices);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
});
```

#### Route

```js
// products.js
import auth from '#middleware/auth';
import { crud, send } from '#middleware/crud';

export default (router, _) =>
  router
    .post('/', auth, crud.create, send)
    .get('/', crud.read, send)
    .get('/:id', crud.read, send)
    .get('/prices', crud.read, _.calculate);
```
