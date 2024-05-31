import { Box, Flex, Text } from '@chakra-ui/react';
import { TableColumn } from '../Table';
import { CONSTROAD_COLORS } from 'src/styles/shared';

export const generateDispatchColumns = () => {
  const columns: TableColumn[] = [
    {
      key: 'description',
      label: 'Description',
      width: '20%',
      render: (item, row) => {
        return (
          <Flex flexDir="column" lineHeight={3}>
            <Text>{item}</Text>
            <Flex gap={2}>
            <Text color="gray">Fecha:{row.date}</Text>
            <Text color="gray">obra:{row.obra}</Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      key: 'client',
      label: 'Cliente',
      width: '20%',
      render: (item, row) => {
        return (
          <Flex flexDir="column">
            <Text>{item}</Text>
            <Text>{row.clientRuc}</Text>
          </Flex>
        );
      },
    },
    {
      key: 'company',
      label: 'Transportista',
      width: '20%',
      render: (item, row) => {
        return (
          <Flex flexDir="column" lineHeight={3}>
            <Text>{item}</Text>
            <Box as={Flex} gap={2}>
              <Text color="gray">placa:{row.plate}</Text>
              <Text color="gray">Chofer:{row.driverName}</Text>
            </Box>
          </Flex>
        );
      },
    },
    {
      key: 'quantity',
      bgColor: CONSTROAD_COLORS.yellow,
      label: 'M3',
      width: '5%',
    },
    {
      key: 'price',
      bgColor: CONSTROAD_COLORS.yellow,
      label: 'Precio',
      width: '5%',
    },
    {
      key: 'total',
      bgColor: CONSTROAD_COLORS.yellow,
      label: 'Total',
      width: '5%',
      render: (item) => {
        return (<Text color="red">{item}</Text>)
      }
    },
  ];

  return columns;
};