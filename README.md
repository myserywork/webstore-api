# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run


### Querys

```js
query users{
  allUsers {
    id,
    username,
    email,
    password,
  }
}


mutation login {
  login(email:"test@live.zxc",password: "test")
}

mutation createUser {
  createUser(
    username:"pedromoriartydf",
    password: "test",
    email: "tesct@live.zxc"
  ) {
    username,
    email
  }
}
mutation editUser {
  editUser(id: 1,
    Input: {
      username: "test",
      email: "test@test.cz",
      first_name: "David",
      last_name: "Test"}
   ) {
    id
    username
    email
  }
}


mutation deleteUser {
  deleteUser(id: 1) 
}


mutation createAxdress {
  createAdress(Input: {
    referency: "12" ,
    postCode: "12345678",
    streetAdress: "test",
    city: "xxxxxx",
    country: "test",
    number: 5,
    extra: "tesct@live.zxc",
    description: "dota"
  } ) {
    referency
    postCode
    city
    extra
    description
  }
}


mutation editAdress {
  editAdress(id:1,
  Input: {
    referency: "13" ,
    postCode: "12345678",
    streetAdress: "test",
    city: "xxxxxx",
    country: "test",
    number: 5,
    extra: "tesct@live.zxc",
    description: "dota"
  } ) {
    referency
    postCode
    city
    extra
    description
  }
}


mutation deleteAdress{
  deleteAdress(id: 5) 
}

query fetchUserAdresses{
  fetchUserAdresses(userId: 9) {
    id,
    postCode
  }
}


query allAdress{
  allAdresses {
    id,
    postCode
  }
}

mutation createGallery {
  createGallery(Input: {
    url: "12" ,
    product_id: 1,
  } ) {
    product_id,
    url
  }
}


mutation createxCoupon {
  editCoupon(id:25, Input: {
    title: "DotA 3" ,
    number_of_coupon: 123,
    number_of_used_coupon: 123,
    discount_in_percent: 5,
    category_id : 1,
    code: "tesct@live.zxc",
    status: "dota",
    minimum_amount: 1,
    expiration_date: "expiration_date",
    description: "description",
  } ) {
    title
    number_of_coupon
  }
}


mutation editGallery {
  editGallery(id: 2,Input: {
    url: "1352" ,
    product_id: 1,
  } ) {
    product_id,
    url
  }
}


mutation editIdentification {
  editIdentification(id:2,Input: {
    name: "Garena" ,
    value: "1",
    user_id : 1
  } ) {
    name,
    value,
    user_id
  }
}


mutation createOrder {
  createOrder(Input: {
    user_id: 1,
    payment_method: "123",
    deliveryTime: "5",
    amount : 1,
    subtotal: 1,
    status: "dota",
    discount: 1,
    deliveryFee: 1,
    deliveryAddress: 1,
    description: "description",
  } ) {
    payment_method
    deliveryTime
  }
}


mutation createOrder {
  createProduct(Input: {
    title: "test qwe 123",
    slug: "123",
    type: "5",
    unit : 1,
    image: "1",
    description: "dota",
    price: 1,
    salePrice: 1,
    discountInPercent: 1,
    author: 1,
    meta:"afeta a mina"
  } ) {
    title
    
  }
}

mutation createProductCategory {
  createProductCategory(Input: {
    title: "dota2",
    product_id: 1,
    category_id: 1
  } ) {
    title
    
  }
}

mutation createOrder {
  editOrderProduct(id: 3,Input: {
    title: "test qwwqweqwewqwwwe 123",
    slug: "123",
    type: "5",
    unit : 1,
    description: "dota",
    price: 1,
    salePrice: 1,
    discountInPercent: 1,
  } ) {
    title
    
  }
}

```
