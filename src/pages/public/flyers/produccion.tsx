// components/GenerateImage.tsx
import { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { PortalLayout, toast } from 'src/components';
import { DownloadIcon } from 'src/common/icons';

const GenerateImage = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);

  const handleGenerateImage = async () => {
    if (time === '') {
      toast.error("Ingrese la hora")
      return
    }
    if (imageRef.current) {
      const dataUrl = await htmlToImage.toPng(imageRef.current);
      saveAs(
        dataUrl,
        `produccion-${new Date(date).toLocaleDateString('es-ES')}.png`
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <PortalLayout>
      <Flex flexDir="column" px={5} gap={5}>
        <Box>
          <Text fontWeight={600} textAlign="center" fontSize={18}>
            Generador de Flyer - Producción
          </Text>
        </Box>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <FormControl id="fecha">
                  <FormLabel>Fecha</FormLabel>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl id="hora">
                  <FormLabel>Hora</FormLabel>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <Button onClick={handleGenerateImage} gap={1}>
                  <DownloadIcon /> Descargar
                </Button>
              </GridItem>
            </Grid>
        
          <Box
            ref={imageRef}
            position="relative"
            width="300px"
            height="400px"
            mt={4}
          >
            <img
              src="/templates/flyer/production-constroad-template.png"
              alt="Plantilla"
              style={{ width: '100%', height: '100%' }}
            />
            <Box
              position="absolute"
              top="150px"
              left="30px"
              color="white"
              fontWeight={600}
            >
              <Box>FECHA: {date ? formatDate(date) : ''}</Box>
              <Box>HORA: {time ? formatTime(time) : ''}</Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </PortalLayout>
  );
};

export default GenerateImage;