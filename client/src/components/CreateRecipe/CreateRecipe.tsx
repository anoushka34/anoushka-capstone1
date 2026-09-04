import "./CreateRecipe.css";

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
  createdAt?: string;
  onEdit: () => void;
  onDelete: () => void;
};

function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  });
}

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
        {props.createdAt && (
          <p className="recipe-card-date">Created on {formatDate(props.createdAt)}</p>
        )}
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
          <button type="button" className="btn-icon" onClick={props.onEdit} aria-label="Edit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#57852F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="#57852F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="btn-icon" onClick={props.onDelete} aria-label="Delete">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 11v6M14 11v6" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe;