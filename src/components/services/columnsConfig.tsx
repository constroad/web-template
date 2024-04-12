import { Button, Text } from "@chakra-ui/react"
import { TableColumn } from "../Table"
import { ServiceType } from "./utils"

export const generateServiceColumns = () => {
  const columns: TableColumn[] = [
    { key: 'description', label: 'Descripción', width: '50%' },
    { key: 'phase', label: 'Fase', width: '12%' },
    { key: 'unit', label: 'Unidad', width: '5%' },
    { key: 'quantity', label: 'Cantidad', width: '5%' },
    { key: 'unitPrice', label: 'Precio', width: '5%' },
  ]
  return columns
}

export const generateMobileServiceColumns = (handleSelectProduct: (row: ServiceType) => void) => {
  const columns: TableColumn[] = [
    {
      key: 'description',
      label: 'Nombre',
      width: '65%',
      render: (item, row) => {
        return (
          <Text
            fontSize={10}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            maxW='185px'
            w='185px'
            minW='185px'
          >
            {item}
          </Text>
        )
      }
    },
    {
      key: 'alias',
      label: 'Ver',
      width: '15%',
      render: (item, row) => (
        <Button onClick={() => handleSelectProduct(row)} size='md' px='5px' minW='30px' w='30px' maxWidth='30px' maxHeight='20px' fontSize={{ base: 10, md: 12 }} colorScheme="blue">
          Ver
        </Button>
      )
    },
  ]
  return columns
}