const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const app = express()
const port = 3000

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

// index
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList })
})

// show
app.get('/restaurants/:id', (req, res) => {
  const thisRestaurant = restaurantList.find(item => {
    return item.id.toString() === req.params.id
  })
  res.render('show', { restaurant: thisRestaurant })
})

// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywordInLowerCase = keyword.trim().toLowerCase()
  // 餐廳、分類
  const filterRestaurant = restaurantList.filter(item => {
    return(
      item.name.toLowerCase().includes(keywordInLowerCase) ||
      item.name_en.toLowerCase().includes(keywordInLowerCase) ||
      item.category.toLowerCase().includes(keywordInLowerCase)
    )
  })
  if(filterRestaurant.length === 0) {
    return res.render('nothing', { keyword: keyword })
  }
  res.render('index', { restaurant: filterRestaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})