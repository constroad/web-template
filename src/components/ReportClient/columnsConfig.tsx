import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { TableColumn } from '../Table';
import { CONSTROAD_COLORS } from 'src/styles/shared';
import { formatMoney } from 'src/utils/general';
import { DownloadIcon, MenuVerticalIcon, ViewIcon } from 'src/common/icons';

const Summary = (value: number, symbol = 'S/.', bgColor?: string) => {
  return (
    <Box
      bgColor={bgColor ?? 'black'}
      color="white"
      textAlign="right"
      fontWeight={600}
      fontSize={12}
    >
      {symbol}
      {formatMoney(value)}
    </Box>
  );
};

export const generateReportClientColumns = (
  onViewDispatches: any,
  onDownloadPDF: any,
  onDownloadCertificates: any
) => {
  const columns: TableColumn[] = [
    {
      key: 'fechaProgramacion',
      label: 'Fecha',
      width: '5%',
      render: (item, row) => (
        <Flex flexDir="column" alignItems="center">
          {new Date(item).toLocaleDateString('es-PE')}
        </Flex>
      ),
    },
    {
      key: 'fechaVencimiento',
      label: 'Vence',
      width: '5%',
      render: (item, row) => {
        return (
          <Flex justifyContent="center">
            {item && new Date(item).toLocaleDateString('es-PE')}
          </Flex>
        );
      },
    },
    {
      key: 'obra',
      label: 'Obra',
      width: '40%',
      render: (item, row) => {
        return <Flex>{item}</Flex>;
      },
    },
    {
      key: 'cantidadCubos',
      bgColor: CONSTROAD_COLORS.yellow,
      color: CONSTROAD_COLORS.black,
      label: 'M3 Pedidos',
      width: '7%',
      summary: (value) => Summary(value, ''),
      render: (item) => {
        return <Box textAlign="center">{item}</Box>;
      },
    },
    {
      key: 'montoAdelanto',
      bgColor: CONSTROAD_COLORS.yellow,
      color: CONSTROAD_COLORS.black,
      label: 'Adelanto',
      width: '7%',
      render: (item) => {
        return <Box textAlign="right">S/.{formatMoney(item)}</Box>;
      },
    },
    {
      key: 'totalPedido',
      bgColor: CONSTROAD_COLORS.yellow,
      color: CONSTROAD_COLORS.black,
      label: 'Total',
      width: '7%',
      summary: (value) => Summary(value),
      render: (item) => {
        return <Box textAlign="right">S/.{formatMoney(item)}</Box>;
      },
    },
    {
      key: 'montoPorCobrar',
      bgColor: CONSTROAD_COLORS.yellow,
      color: CONSTROAD_COLORS.black,
      label: 'Debe',
      width: '7%',
      tdStyles: {
        px: 0,
      },
      summary: (value) => Summary(value, 'S/.', 'red'),
      render: (item, row) => {
        return (
          <Box
            bgColor={row.isPaid ? '#d7ead4' : 'pink'}
            rounded={2}
            textAlign="right"
          >
            {!row.isPaid && <>S/.{formatMoney(item)}</>}
            {row.isPaid && 'Pagado'}
          </Box>
        );
      },
    },
    {
      key: '_id',
      label: '',
      width: '2%',
      render: (item, row) => {
        return (
          <Flex
            width="inherit"
            alignItems="center"
            justifyContent="space-between"
          >
            <Menu data-testid="page-menu" variant="brand">
              <MenuButton
                as={IconButton}
                variant="unstyled"
                minW="auto"
                h="auto"
                aria-label="Page details"
                icon={<MenuVerticalIcon />}
                rounded="full"
              />

              <MenuList maxW="170px">
                <MenuItem
                  onClick={() => onViewDispatches(row)}
                  as={Flex}
                  gap={2}
                >
                  <ViewIcon />
                  Ver despachos
                </MenuItem>
                <MenuItem
                  onClick={() => onDownloadPDF(row)}
                  color="red"
                  as={Flex}
                  gap={2}
                >
                  <DownloadIcon />
                  Descargar como PDF
                </MenuItem>
                <MenuItem
                  onClick={() => onDownloadCertificates(row)}
                  color="red"
                  as={Flex}
                  gap={2}
                >
                  <DownloadIcon />
                  Descargar certificados
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        );
      },
    },
  ];

  return columns;
};

export const generateDispatchColumns = () => {
  const columns: TableColumn[] = [
    {
      key: 'date',
      label: 'Fecha',
      width: '5%',
      render: (item, row) => (
        <Flex flexDir="column" alignItems="center">
          {new Date(item).toLocaleDateString('es-PE')}
        </Flex>
      ),
    },
    {
      key: 'plate',
      label: 'Placa',
      width: '5%',
      render: (item, row) => (
        <Flex flexDir="column" alignItems="center">
          {item}
        </Flex>
      ),
    },
    {
      key: 'driverName',
      label: 'Chofer',
      width: '5%',
      render: (item, row) => (
        <Flex flexDir="column" alignItems="center">
          {item}
        </Flex>
      ),
    },
    {
      key: 'hour',
      label: 'Hora',
      width: '5%',
      render: (item, row) => (
        <Flex flexDir="column" alignItems="center">
          {item}
        </Flex>
      ),
    },
    {
      key: 'quantity',
      label: 'M3',
      width: '5%',
      render: (item, row) => (
        <Flex flexDir="column" alignItems="center">
          {item}
        </Flex>
      ),
    },
  ];

  return columns;
};
