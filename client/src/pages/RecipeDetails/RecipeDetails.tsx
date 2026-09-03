
//   "title": "Steak baby!",
//   "description": "Crunchy romaine with creamy cashew Caesar dressing.",
//   "image": "https://example.com/images/vegan-caesar.jpg",
//   "ingredients": [
//     { "name": "Romaine lettuce", "quantity": "1 head" },
//     { "name": "Cashews", "quantity": "1/2 cup" },
//     { "name": "Lemon juice", "quantity": "2 tbsp" },
//     { "name": "Dijon mustard", "quantity": "1 tsp" },
//     { "name": "Garlic clove", "quantity": "1" }
//   ],
//   "instructions": [
//     { "step": 1, "description": "Blend the cashews, lemon juice, mustard, and garlic until smooth." },
//     { "step": 2, "description": "Chop romaine lettuce and place in a bowl." },
//     { "step": 3, "description": "Toss with the blended dressing and serve chilled." }
//   ],
//   "tags": ["vegan", "salad", "healthy"]

// }



import { Link } from 'react-router-dom'

export default function RecipeDetails() {
    return (
        <div>
            <h1> 
                Steak baby!
            </h1>

            <p>Crunchy romaine with creamy cashew Caesar dressing</p>
""
            <img src= "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg" alt="Salad" />
            <p>Tags: vegan salad, healthy </p>

            <h2>Ingridents</h2>
            <ul>
                <li>Romaine lettuce</li>
                <li>Cashews</li>
            </ul>

            <h2>Instructions</h2>
            <ol>
                <li>lend the cashews, lemon juice, mustard, and garlic until smooth</li>
            </ol>
    
        </div>
    );
}