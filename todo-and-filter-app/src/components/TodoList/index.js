import { Button, Col, Input, Row, Select, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
// import { addTodo } from '../../redux/actions';
import { todosRemainingSelector } from '../../redux/selector';
import Todo from '../Todo';
import todoSlice from './todoSlice';

export default function TodoList() {
  const [todoName, setTodoName] = useState('');
  const [todoPriority, setTodoPriority] = useState('Medium');

  const nameRef = useRef();

  // const todoList = useSelector(todoListInitSelector);
  const todoList = useSelector(todosRemainingSelector);
  console.log('todoListki', todoList);

  const dispatch = useDispatch();

  const handleEnterTodo = (e) => {
    setTodoName(e.target.value);
  };
/* 
  // redux core :::::::::::::
  const handleSubmitTodo = () => {
    dispatch(
      addTodo({
        id: uuidv4(),
        name: todoName,
        compelete: false,
        priority: todoPriority,
      })
    ); */

  //redux toolkit :::::::::::::
  const handleSubmitTodo = () => {
    dispatch(
      todoSlice.actions.addTodo({
        id: uuidv4(),
        name: todoName,
        compelete: false,
        priority: todoPriority,
      })
    );

    nameRef.current.focus();
    setTodoName('');
    setTodoPriority('Medium');
  };

  const handlePriorityChange = (value) => {
    setTodoPriority(value);
  };

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map((item) => (
          <Todo
            key={item.id}
            name={item.name}
            prioriry={item.priority}
            completed={item.completed}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input ref={nameRef} value={todoName} onChange={handleEnterTodo} />
          <Select
            defaultValue="Medium"
            value={todoPriority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleSubmitTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
