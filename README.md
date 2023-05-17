
# Pic Some Photos
![React](public/react.svg) ![Vite](public/vitejs.svg)

This project is the last section in Scrimbas [Advanced React course by Bob Ziroll](https://scrimba.com/learn/react)

## Features

- Favorite images or add them to cart
- localStorage saves your images after the browser closes
- remove items from the gallery or cart page
- checking out clears the cart

## Fun
Bob said we should try our own add-ons to the project, such as localStorage. At first it seems hard to implement, but it is very easy. And exciting, because we have not yet learned a server side language or database. Our previous projects have looked sad because our data erases every time we refresh, now localStorage fixes that.

It is simple as setting the state we already use to localStorage contents if it exist, or make an empty array if it doesn't. we must parse the contents or else javascript can't read it.

```
const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || [])
```

We got it on the initial load. Now we change localStorage every time the state changes.

```
useEffect(() => {
localStorage.setItem("cart", JSON.stringify(cartItems))},[cartItems])
```

**That's All!**
## Github pages fix
previously github pages worked with the [easy vite setup guide](https://github.com/MooseCapital/Vite-react-project-setup-guide) I made. But now we know React router, and this messes some things up. There are some easy fixes in [stackoverflow](https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages)

Instead of switching to HashRouter, we can keep our BrowserRouter

Go to package.json

```
"homepage": "/github-repo-name/#",
```

Go to main.jsx or where react is rendered, and add basename

```
<BrowserRouter basename={'/github-repo-name'}>
```

## Lessons Learned

In our app we have an array of all photos and an array of only items in the cart, *cartItems*.

When all images render, we map over the images and see if the 'carted' property in every photo is true or not. This lets us know what icon to show.

Well this is not a good practice because now I have *cartItems* array, with the 'carted' property, and *photos* array with the 'carted' property. I have to keep those in sync, so every time we remove an item from *cartItems* the 'carted' property in *photos* array turns false

toggle the carted property:

```
setPhotos(prevPhotos => {
    return prevPhotos.map(img => {
        return id === img.id ? {...img, carted: !img.carted} : {...img}
    })
})
```

Bob had a different solution, he did not have a carted property at all. I can't remember where the exact solution was, but I know it was different from mine. He just has the *cartItems* array. Now with a creative solution. when we create each image by mapping over the *photos* array, during this we want to pass down **isInCart** that says true if the image is in the cart, to make our icons filled or not.

We check if the cart id matches any id in photos when the Image Component is created.

```
const photoElements = app.photos.map((item, index) => {
    return (
        <Image toggleFavorite={() => app.toggleFavorite(item.id)}  key={item.id} 
        img={item} class={getClass(index)}
            
        isInCart={app.cartItems.some(cartImage => {
            return cartImage.id === item.id
        })}
        }
        />
    )
})
```
Now checking the *cartItems* id is much simpler than keeping a 'carted' property in sync on both arrays