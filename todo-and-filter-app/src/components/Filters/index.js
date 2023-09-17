import { Col, Input, Radio, Row, Select, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import filterSlice from './filterSlice';
/* import {
  searchTodo,
  searchStatusTodo,
  searchPriorityTodo,
} from '../../redux/actions'; */

const { Search } = Input;

export default function Filters() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');

  const handleSearchText = (e) => {
    setSearchText(e.target.value);

    /* dispatch(searchTodo(e.target.value)); */
    dispatch(filterSlice.actions.searchTodo(e.target.value));
  };
  // console.log('searchText:', searchText);

  const [searchStatus, setsearchStatus] = useState('All');
  const handleSearchStatus = (e) => {
    setsearchStatus(e.target.value);

 /*    dispatch(searchStatusTodo(e.target.value)); */
    dispatch(filterSlice.actions.statusTodo(e.target.value));
  };
  // console.log('searchStatus:', searchStatus);

  const [searchPriority, setSearchPriority] = useState([]);

  const handleSelectPriority = (value) => {
    setSearchPriority(value);
/*     dispatch(searchPriorityTodo(value)); */
    dispatch(filterSlice.actions.priorityTodo(value));
  };
  // console.log('searchPriority', searchPriority);
  // console.log('searchPriority', searchPriority.length);
  return (
    <Row justify="center">
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          placeholder="input search text"
          value={searchText}
          onChange={handleSearchText}
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group
          defaultValue={searchStatus}
          value={searchStatus}
          onChange={handleSearchStatus}
        >
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Todo">To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          style={{ width: '100%' }}
          onChange={handleSelectPriority}
          value={searchPriority}
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
      </Col>
    </Row>
  );
}
