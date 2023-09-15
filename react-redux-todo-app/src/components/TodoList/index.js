import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { useState } from 'react';
import { initState } from '../../redux';

export default function TodoList() {
  const [todoName, setTodoName] = useState('');
  const [todoPriority, setTodoPriority] = useState('Medium');
  // const [{filter, todoList}] = initState;
// console.log(initState.todoList);
  const todoList = useSelector((state) => initState.todoList);
  console.log({todoList});
  const dispatch = useDispatch();

  const handleAddItem = (e) => {
    setTodoName(e.target.value);
    console.log(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setTodoPriority(value);
    console.log(value);
  };

  const handleSubmit = () => {
    console.log(dispatch(
      addTodoAction({
        id: uuidv4(),
        name: todoName,
        completed: false,
        priority: todoPriority,
      }))
    );
  };
  


  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        <Todo name="Learn React" prioriry="High" />
        <Todo name="Learn Redux" prioriry="Medium" />
        <Todo name="Learn JavaScript" prioriry="Low" />
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={(e) => handleAddItem(e)} />
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
          <Button type="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
