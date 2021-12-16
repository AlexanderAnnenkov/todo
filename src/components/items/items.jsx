import axios from "axios";
import React  from "react";
import style from "./items.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



let Items = ({
  state,
  setTodos,
  showTasks,
  getTasks,
  setTriggerError,
  setAlert,
  setShowTasks
}) => {

  const token = localStorage.getItem("accessToken");

  // Function 'Delete task'
  const delItem = (id) => {
    try {
      axios.delete(`http://localhost:3002/task/${id}`, {
        headers: {
          authorization: `${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      let newTodos = state.filter((e) => e.uuid !== id);
      setTodos(newTodos);
    } catch (err) {
      setAlert(err.response.data.message);
      setTriggerError(true);
    }
  };

  //Funcion 'Edit check'
  const switchCheck = async (e) => {
    try {
      await axios.patch(
        `http://localhost:3002/task/${e.uuid}`,
        {
          name: e.name,
          done: !e.done,
        },
        {
          headers: {
            authorization: `${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      getTasks();
    } catch (err) {
      setAlert(err.response.data.message);
      setTriggerError(true);
    }
  };

  //onDblClick event for switch attribute 'contentEditable' on tag 'span'
  const enableContentEditable = (e) => {
    e.target.contentEditable = true;
  };

  //onBlur event for switch attribute 'contentEditable' on tag 'span' when click on body site
  const disableBlur = (e, content) => {
    e.target.contentEditable = false;
    e.target.textContent = content.name;
  };

  //onKeyDown event for accept edit in 'Editmode'
  const editTask = async (e, content) => {
    try {
      if (e.key === "Enter") {
        if (e.target.textContent !== "") {
          const editTask = e.target.textContent;
          content.name = e.target.textContent;
          await axios
            .patch(
              `https://heroku-backend-app-for-todo.herokuapp.com/task/${content.uuid}`,
              {
                name: editTask,
                done: false,
              },
              {
                headers: {
                  authorization: `${token}`,
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json;charset=utf-8",
                },
              }
            )
            .then((res) => {
              e.target.contentEditable = false;
              getTasks();
            });
        } else {
          e.target.textContent = content.name;
          e.target.contentEditable = false;
        }
      }
      if (e.key === "Escape") {
        e.target.textContent = content.name;
        e.target.contentEditable = false;
      }
    } catch (err) {
      setAlert(err.response.data.message);
      setTriggerError(true);
    }
  };

  const handleOnDragEnd = (result) =>{
    if(!result.destination) return
    const items = Array.from(state)
    const [reorderitems] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderitems)
    setTodos(items)
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
                        switchCheck(t);
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
                        delItem(t.uuid);
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
  );
};

export default Items;
