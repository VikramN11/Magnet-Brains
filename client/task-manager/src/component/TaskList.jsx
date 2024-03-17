import React from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

const TaskList = () => {
  return (
  <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Title</Th>
        <Th>Description</Th>
        <Th>Due Date</Th>
        <Th>Edit</Th>
        <Th>Delete</Th>
      </Tr>
    </Thead>
    <Tbody>
      {/* Data goes here */}
    </Tbody>
  </Table>
</TableContainer>
  )
}

export default TaskList