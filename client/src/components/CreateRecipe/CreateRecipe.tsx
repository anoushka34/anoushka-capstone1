type Ingredient = {
  name: string;
  quantity?: string;
};

type Instruction = {
  step: number;
  description: string;
};

type CreatorItemProps = {
  title: string;
  description: string;
  image?: string;
  tags?: string[] | string;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  onEdit: () => void;
  onDelete: () => void;
};

function CreateRecipe(props: CreatorItemProps) {
  const tagList = Array.isArray(props.tags)
    ? props.tags
    : props.tags
      ? props.tags.split(",").map((t) => t.trim())
      : [];

  return (
    <div className="recipe-card">
      {props.image && <img className="recipe-card-image" src={props.image} alt={props.title} />}
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{props.title}</h3>
        <p className="recipe-card-description">{props.description}</p>

        {tagList.length > 0 && (
          <div className="recipe-card-tags">
            {tagList.map((tag, index) => (
              <span key={index} className="recipe-tag">{tag}</span>
            ))}
          </div>
        )}

        {props.ingredients && props.ingredients.length > 0 && (
          <>
            <h4 className="recipe-card-subheading">Ingredients</h4>
            <ul className="recipe-card-list">
              {props.ingredients.map((ing, index) => (
                <li key={index}>
                  {ing.name}{ing.quantity ? ` - ${ing.quantity}` : ""}
                </li>
              ))}
            </ul>
          </>
        )}

        {props.instructions && props.instructions.length > 0 && (
          <>
            <h4 className="recipe-card-subheading">Instructions</h4>
            <ol className="recipe-card-list">
              {props.instructions.map((instr) => (
                <li key={instr.step}>{instr.description}</li>
              ))}
            </ol>
          </>
        )}

        <div className="recipe-card-actions">
          <button type="button" className="btn-icon" onClick={props.onEdit} aria-label="Edit">✏️</button>
          <button type="button" className="btn-icon" onClick={props.onDelete} aria-label="Delete">🗑️</button>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe;