
import PropTypes from "prop-types";

const PropTypesIngredients = PropTypes.shape({
     calories: PropTypes.number.isRequired,
     carbohydrates: PropTypes.number.isRequired,
     fat: PropTypes.number.isRequired,
     image: PropTypes.string.isRequired,
     image_large: PropTypes.string.isRequired,
     image_mobile: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     price: PropTypes.number.isRequired,
     proteins: PropTypes.number.isRequired,
     _id: PropTypes.string.isRequired,
     type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
});

export default PropTypesIngredients