import axios from "axios"
import React from "react"
import style from "./items.module.css"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

let Items = ({
  showTasks,
  delItem,
  switchCheck,
  editTask,
  handleOnDragEnd,
}) => {
  //onDblClick event for switch attribute 'contentEditable' on tag 'span'
  const enableContentEditable = (e) => {
    e.target.contentEditable = true
  }

  //onBlur event for switch attribute 'contentEditable' on tag 'span' when click on body site
  const disableBlur = (e, content) => {
    e.target.contentEditable = false
    e.target.textContent = content.name
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={style.items}>
        {(provided) => (
          <ul
            className={style.items}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {showTasks.map((t, index) => (
              <Draggable key={t.uuid} draggableId={t.uuid} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={t.uuid}
                    id={t.uuid}
                    className={style.item}
                  >
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => {
                        switchCheck(t)
                      }}
                    />

                    <span
                      onDoubleClick={enableContentEditable}
                      onKeyDown={(e) => editTask(e, t)}
                      onBlur={(e) => disableBlur(e, t)}
                      className={style.text}
                    >
                      {t.name}
                    </span>

                    <span className={style.date}>
                      {new Date(Date.parse(t.createdAt)).toLocaleString()}
                    </span>

                    <span
                      onClick={() => {
                        delItem(t.uuid)
                      }}
                      className={style.delete}
                    >
                      <img src="https://cdn-icons-png.flaticon.com/512/2602/2602735.png" />
                    </span>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Items
