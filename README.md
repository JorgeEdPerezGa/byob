# byob - An Api for New York State Biodiversity by County

Jorge PerezGa & Melena Suliteanu

## About
The data for this api came from [this government site](https://catalog.data.gov/dataset/biodiversity-by-county-distribution-of-animals-plants-and-natural-communities/resource/a8f394d7-0193-49b0-b44f-ba911ea1be65)
We chose to build this api in order to make the information a little more organized and accessible for developers. It also allows for easy update/deletion/addition of data for authorized users.

## Available Endpoints

### Base Url

`http://perezga-suliteanu-byob.herokuapp.com`

### Obtain Authentication

#### Through the site:
go to `http://perezga-suliteanu-byob.herokuapp.com`

Enter your app name and email to receive token

![Get a token](https://i.imgur.com/h8EJczdm.png)

#### Through the api:

Make a post request to:
`/api/v1/authenticate`

In the body include:
`{
  appName: <your app name>,
  email: <your email>
}`

A successful response returns a JSON web token. Anyone can receive a token but only emails ending in 'turing.io' will be authorized to post, patch, or delete.

### Get all Counties

Make a get request to:
`/api/v1/counties`

A successful response returns an array of all counties in the database.

### Get Specific County

Make a get request to:
`/api/v1/counties/:id`
where :id is the id of the county you want to receive.

A successful response returns the requested county.

### Post New County

Make a post request to:
`/api/v1/counties`

In the body include:
`{
  name: <county name>,
  county_pop_2015: <county populatin in 2015>,
  county_area: <county area in square miles>
}`

A successful response returns the county's id

### Delete County

Make a delete request to:
`/api/v1/counties/:id/:token`
where :id is the id of the county to be deleted and :token is the JWT received from an authentication post. Only users with proper authorization (see authentication endpoint) can delete.

A successful deletion returns the id of the deleted county.

### Patch County

Make a patch request to:
`/api/v1/counties/:id/:token`
where :id is the id of the county to be updated and :token is the JWT received from an authentication post. Only users with proper authorization (see authentication endpoint) can update.

In the body include:
`{
  name: <county name>,
  county_pop_2015: <county populatin in 2015>,
  county_area: <county area in square miles>
}`

A successful deletion returns the id and information of the updated organism.

### Get all Organisms

Make a get request to:
`/api/v1/organisms`

A successful response returns the first 20 organisms in the database. Each successive request returns the next 20.

### Get Specific Organism

Make a get request to:
`/api/v1/organisms/:id`
where :id is the id of the organism you want to receive.

A succesful response returns the requested organism.

### Post New Organism

Make a post request to:
`/api/v1/organisms/:token`
where :token is the JWT received from an authentication post. Only users with proper authorization (see authentication endpoint) can post.

In the body include:
`{
  common_name: <string>, 
  scientific_name: <string>, 
  name: <string>, 
  taxonomic_group: <string>, 
  federal_extinction: <string>
}`

A successful response returns the id of the posted organism.

### Delete Organism

Make a delete request to:
`/api/v1/organisms/:id/:token`
where :id is the id of the organism to be deleted and :token is the JWT received from an authentication post. Only users with proper authorization (see authentication endpoint) can delete.

A successful deletion returns the id of the deleted organism.

### Patch Organism

Make a patch request to:
`/api/v1/organisms/:id/:token`
where :id is the id of the organism to be updated and :token is the JWT received from an authentication post. Only users with proper authorization (see authentication endpoint) can update.

In the body include:
`{
  common_name: <string>, 
  scientific_name: <string>, 
  name: <string>, 
  taxonomic_group: <string>, 
  federal_extinction: <string>
}`

A successful deletion returns the id and information of the updated organism.

## Testing
All routes are fully tested using Mocha, Chai, and Chai-HTTP