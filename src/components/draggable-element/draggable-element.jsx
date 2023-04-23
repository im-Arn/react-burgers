import { deleteConstructorIngredient, moveConstructorIngredient } from '../../services/actions/constructor';
import Style from './draggable-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { useCallback } from 'react';


export function DraggableElement(props) {
  const { name, price, image, uid } = props.ingredient;
  const index = props.index;
  const dispatch = useDispatch();

  const move = useCallback((dragIndex, hoverIndex) => {
    dispatch(moveConstructorIngredient(dragIndex, hoverIndex))
  }, []);

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredientList',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ingredientList',
    hover: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const deleteIngredient = (uid) => {
    dispatch(deleteConstructorIngredient(uid));
  }

  return (
    <>
      <li ref={node => drag(drop(node))} className={Style.listitem2} style={{ background: isDrag ? "linear-gradient(transparent, rgba(55, 27, 158, 0.75), transparent)" : "none" }} key={uid}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={`${name}`}
          price={price}
          thumbnail={image}
          handleClose={(() => { deleteIngredient(uid) })}
        />
      </li>
    </>
  )

};