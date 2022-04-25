import React from 'react'
import { nanoid } from 'nanoid'

import MealItem from './MealItem'
import Card from '../UI/Card';



const AvailableMeals = () => {

    /* 
        useEffect can't have an async function inside it, since it returns a 
        cleanup function, which shouldn't be a promise.

        to use an async function inside usEEffect, create a new one
        inside it. for example: 

        useEffect(()=>{
            const fetch = async()=>{ await fetch(data) }
        },[])
    */

    const [meals, setMeals] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [httpError, sethttpError] = React.useState(null)


    React.useEffect(() => {

        const fetchMeals = async () => {
            setIsLoading(true)
            const response = await fetch("https://max-food-app-278de-default-rtdb.firebaseio.com/meals.json")
            const responseData = await response.json()

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const loadedMeals = []
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }

            setMeals(loadedMeals)
            setIsLoading(false)
        }

        //we create this new function because fetchMeals() must be a Promise, since we throw an error inside it
        fetchMeals().catch(error => {
            setIsLoading(false)
            sethttpError(error.message)
        })

    }, [])


    if (isLoading) {
        return (
            <section className='loading'>
                <p>Loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className='error'>
                <p>{httpError}</p>
            </section>
        )
    }

    return (
        <section className='meals'>
            <Card>
                <ul>
                    {
                        meals.map(meal => {
                            return (
                                <MealItem
                                    key={nanoid()}
                                    name={meal.name}
                                    description={meal.description}
                                    price={meal.price}
                                    id={meal.id}
                                />
                            )
                        })
                    }
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals