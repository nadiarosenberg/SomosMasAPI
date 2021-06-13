# __Categories__
- [__Categories__](#categories)
- [Model](#model)
  - [name](#name)
  - [description](#description)
  - [image](#image)
  - [timestamps](#timestamps)
- [GET - categories](#get---categories)
- [GET - categories/:id](#get---categoriesid)
- [POST - categories](#post---categories)
- [PUT - categories/:id](#put---categoriesid)
- [DELETE - categories/:id](#delete---categoriesid)

# Model

## name
- ### Type: 
    String
- ### Allow null: 
    False

## description
- ### Type: 
    String
- ### Allow null: 
    True

## image
- ### Type: 
    String
- ### Allow null: 
    True

## timestamps
- ### Type: 
    String
- ### Allow null: 
    True

# GET - categories
Returns all existing categories paginated. If there are no categories, returns an empty array.

- ## Method
GET

- ## Url
/categories

- ## Query string (optional)

        page = int
    
        pageSize = int
    
        order = "ASC" || "DESC"
    
    Example:

        page = 1

        pageSize = 2

        order = "ASC"

- ## Success response
    ### Code
        200 
    ### Content 
        {
            "count": int,
            "rows": [
                {
                    "name": string
                },
                {
                    "name": string
                },
                {
                ...
                }
            ],
            "current": "/categories?page=int&pageSize=int&order=[ASC || DESC]",
            "prev": "/categories?page=int&pageSize=int&order=[ASC || DESC]"|| null
            "next": "/categories?page=int&pageSize=int&order=[ASC || DESC]" || null 
        }
        
    previous and next depend on the pagination performed

    ### Example
    
    For 10 categories, page = 1, pageSize = 2 and order = "ASC":

        {
            "count": 10,
            "rows": [
                {
                    "name": "name1"
                },
                {
                    "name": "name2"
                }
            ],
            "current": "/categories?page=1&pageSize=2&order=ASC",
            "prev": null
            "next": "/categories?page=2&pageSize=2&order=ASC" 
        }

- ## Error response: 

    ### Case: 
        Internal server error
    ### Code 
        500
        
    ### Content
        {"message": "Error getting categories"}


# GET - categories/:id
Returns the category corresponding to the id. If the category does not exist, returns error.

- ## Method
GET

- ## Url
/categories/:id

- ## Url params

Required:

        id = integer

- ## Success response
    ### Code
        200 
    ### Content     
        {
            "ok": true,
            "result": {
                "id": int,
                "name": string,
                "description": string || null,
                "image": string || null,
                "timestamps": string,
                "createdAt": date,
                "updatedAt": date || null,
                "deletedAt": date || null
                }
        }

    ### Example
    
    For id = 1:
    
        {
            "ok": true,
            "result": {
                "id": 1,
                "name": "test",
                "description": "test description",
                "image": "test.png",
                "timestamps": "1622808670938",
                "createdAt": "2021-06-04T12:11:10.000Z",
                "updatedAt": "2021-06-04T12:11:10.000Z",
                "deletedAt": null
            }
        }

- ## Error responses

- ### Case 1
        Internal server error
    
    #### Code: 
        500
    
    #### Content:
        {"message": "Error getting category"}
            
- ### Case 2
        Organization not found
    
    #### Code
        404
    
    #### Content
        {
            "ok": false,
            "message": "Cannot find Category with id = {id}"
        }

# POST - categories
Creates a category.

- ## Method
POST

- ## Url
/categories

- ## Req.body

Required:

        name = string

Optional:

        description = string
    
        image = string

- ## Success response
    ### Code
        200 
    ### Content 
        {
            "ok": true,
            "result": {
                "id": int,
                "name": string,
                "description": string || null,
                "image": string || null,
                "timestamps": string,
                "updatedAt": date,
                "createdAt": date
            }
        }

    ### Example
    
    For name = "test", description = "test description" and image = "test.png":
    
        {
            "ok": true,
            "result": {
                "id": 1,
                "name": "test",
                "description": "test description",
                "image": "test.png",
                "timestamps": 1622808670938,
                "updatedAt": "2021-06-04T12:11:10.944Z",
                "createdAt": "2021-06-04T12:11:10.944Z"
            }
        }
    
- ## Error responses

- ### Case 1
        User is not admin
    
    #### Code:
        403
    
    #### Content
        {"mensaje": "Invalid or missing API-TOKEN header"}

- ### Case 2
        Internal server error
    
    #### Code
        500
    
    #### Content
        {"message": "Error posting category"}

# PUT - categories/:id
Edits the category corresponding to the id. If the category does not exist, returns error.

- ## Method
PUT

- ## Url
/categories/:id

- ## Url params

Required:

        id = integer

- ## Req.body (optional)
    name = string
    
    description = string
    
    image = string
    
If name is sent in req.body, can not be null 

- ## Success response
    ### Code
        200 
    ### Content
        {
            "ok": true,
            "message": "Category was updated successfully.",
            "result": {
                "name": string,
                "description": string || null,
                "image": string || null 
            }
        }
    Content.result will only show the params sent in req.body

    ### Example
    
    For id = 1 and name = "test2":
    
        {
            "ok": true,
            "message": "Category was updated successfully.",
            "result": {
                "name": "test2"
            }
        }
- ## Error response

- ### Case 1
        User is not admin
    
    #### Code
        403
    
    #### Content
        {"mensaje": "Invalid or missing API-TOKEN header"}
    
- ### Case 2
        Organization not found
    
    #### Code
        404
    
    #### Content
        {"message": "Cannot update Category with id = {id}. Category was not found or req.body is empty!"}

- ### Case 3
        Internal server error
    
    #### Code
        500
    
    #### Content
        {"message": "Error updating Category with id ={id}"}

# DELETE - categories/:id
Deletes the category corresponding to the id. If the category does not exist, returns error.

- ## Method
DELETE

- ## Url
/categories/:id

- ## Url params

Required:

        id = integer

- ## Success response
    ### Code
        200 
    ### Content
        {
            "ok": true,
            "message": "Category was deleted successfully!"
        }

- ## Error responses

- ### Case 1
        User is not admin
    
    #### Code
        403
    
    #### Content
        {"mensaje": "Invalid or missing API-TOKEN header"}

- ### Case 2
        Organization not found
    
    #### Code
        404
    
    #### Content
        {
            "ok": false,
            "message": "Cannot delete Category with id ={id}. Category was not found!"
        }

- ### Case 3
        Internal server error
    
    #### Code
        500
    
    #### Content
        {"message": "Error deleting Category with id ={id}}