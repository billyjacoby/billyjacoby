# doublet
Handle any Javascript and Typescript function as an error and response tuple. This prevents declaring variables outside of a try/catch block for a cleaner flow.

Forked from [mats852/doublet](https://github.com/mats852/doublet) to return an object instead of an array.

<!-- [![doublet](https://img.shields.io/npm/v/doublet.svg)](https://www.npmjs.com/package/doublet)
[![Github licence](https://img.shields.io/github/license/mats852/doublet)](https://img.shields.io/github/license/mats852/doublet)
[![CI](https://github.com/mats852/doublet/actions/workflows/main.yml/badge.svg)](https://github.com/mats852/doublet/actions/workflows/main.yml) -->

## Installation

```shell
npm i @billyjacoby/doublet
```

## Usage
### Traditionnal error handling
```ts
import doublet from 'doublet';
import HttpException from 'your-favorite-error-handler';

async function fetchUser(id: string): User {
  let user;

  try {
    user = await fetch(`/users/${id}`).then(res => res.json());
  } catch (error) {
    throw new HttpException(`Could not fetch user ID "${id}", Error; ${error.message}`, error.status);
  }

  // Do something with user
}

```

### With doublet

```ts
import axios from 'axios';
import doublet from 'doublet';
import HttpException from 'your-favorite-error-handler';

async function fetchUser(id: string): User {
  const {data: user, error: userError} = await doublet(axios, `/users/${id}`);
  if (userError) throw new HttpException(`Could not fetch user ID "${id}", Error; ${userError.message}`, userError.status);

  // Do something with user
}
```