import React, { useState } from 'react'
import axios from 'axios'

import { Flex, Text } from '@chakra-ui/react'

import { ContactForm, ContactFormType, PortalLayout, SubtitleComponent, initialContactForm, toast } from 'src/components'
import { useAsync, useScreenSize } from 'src/common/hooks'
import { API_ROUTES } from 'src/common/consts'
import { SiFacebook } from 'react-icons/si'
import { AiFillInstagram } from 'react-icons/ai'
import { LocationIcon, MailIcon, WhatsAppIcon } from 'src/common/icons'
import { FaYoutube } from "react-icons/fa";
import { CONSTROAD_COLORS } from '../../styles/shared';

const postEmail = (path: string, data: ContactFormType) => axios.post(path, data);
const Contactanos = () => {
  const [formData, setFormData] = useState<ContactFormType>(initialContactForm)
  const { run, isLoading } = useAsync({ onSuccess: successFunction })
  const { isMobile } = useScreenSize()

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data = {
      email: formData.email,
      name: formData.name,
      companyName: formData.companyName,
      ruc: formData.ruc,
      message: formData.message,
      phone: formData.phone,
      nroCubos: formData.nroCubos,
      unitPrice: '',
      nroQuote: ''
    }
    await run( postEmail( API_ROUTES.sendEmail, data ) )

    setFormData(initialContactForm)
  };

  function successFunction() {
    toast.success('Cotización solicitada!')
  }

  return (
    <PortalLayout noPaddingTop>
      <Flex width='100%' marginTop='10px' mb='20px' flexDir='column' px={{ base: '30px', md: '120px' }}>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          width={{ base: '100%', md: '100%' }}
          marginX='auto'
          justifyContent='space-between'
        >
          <Flex
            flexDir='column'
            width={{ base: '100%', md: '39%' }}
            marginTop={{ base: '20px', md: '40px' }}
          >
            <SubtitleComponent text='CONTÁCTANOS' />
            
            <ContactForm
              user={formData}
              setter={setFormData}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
            />

          </Flex>

          <Flex
            width={{ base: '100%', md: '59%' }}
            justifyContent={{ base: 'center', md: 'center' }}
            marginTop={{ base: '20px', md: '20px' }}
            alignItems='center'
            flexDir='column'
            pt={{ base: '0px', md: '30px' }}
          >
            <iframe
              className='w-full'
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.784458000577!2d-76.87262702479192!3d-11.989411040835808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c300705538cf%3A0xdb0d06d91ffcf2a3!2sconstroad!5e0!3m2!1ses-419!2spe!4v1709245188866!5m2!1ses-419!2spe"
              width="600"
              height={ isMobile ? "350px" : "335px"}
              loading="lazy"
            />
          </Flex>

        </Flex>

        <Flex w='100%' border='1px solid #e2e8f0' h={{ base: 'fit-content', md: '80px' }} mt='50px' rounded='6px' flexDir={{ base: 'column', md: 'row' }} >
          <Flex w={{ base: '100%', md: '25%' }} p='10px' borderRight={{ base: 'none', md: '1px solid #e2e8f0' }} flexDir='column' justifyContent=''>
            <Flex alignItems='center' gap='8px'>
              <Text className='font-logo' fontSize={20} fontWeight={600} >Dirección</Text>
              <Flex mb='5px'><LocationIcon fontSize={18} color={CONSTROAD_COLORS.darkOrange} /></Flex>
            </Flex>
            <Text className='font-logo' fontSize={14} fontWeight={300} lineHeight={{ base: '12px', md: '15px' }}>
              Carapongo S/N Urbanización El Portillo <br/>
              Lurigancho - Chosica - Lima
            </Text>
          </Flex>

          <Flex w={{ base: '100%', md: '25%' }} p='10px' borderRight={{ base: 'none', md: '1px solid #e2e8f0' }} flexDir='column' justifyContent=''>
            <Flex alignItems='center' gap='8px'>
              <Text className='font-logo' fontSize={20} fontWeight={600} >Correo</Text>
              <Flex mb='5px'><MailIcon color={CONSTROAD_COLORS.darkOrange} /></Flex>
            </Flex>
            <Text className='font-logo' fontSize={14} fontWeight={300} lineHeight={{ base: '12px', md: '15px' }}>administracion@constroad.com</Text>
          </Flex>

          <Flex w={{ base: '100%', md: '25%' }} p='10px' borderRight={{ base: 'none', md: '1px solid #e2e8f0' }} flexDir='column' justifyContent=''>
            <Flex alignItems='center' gap='8px'>
              <Text className='font-logo' fontSize={20} fontWeight={600} >Teléfono</Text>
              <Flex mb='5px'><WhatsAppIcon color={CONSTROAD_COLORS.darkOrange} /></Flex>
            </Flex>
            <Text className='font-logo' fontSize={14} fontWeight={300} lineHeight={{ base: '12px', md: '15px' }}>994 173 962</Text>
          </Flex>

          <Flex w={{ base: '100%', md: '25%' }} p='10px' borderRight={{ base: 'none', md: '1px solid #e2e8f0' }} flexDir='column' justifyContent=''>
            <Text className='font-logo' fontSize={20} fontWeight={600} >Síguenos en:</Text>
            <Flex gap='15px'>
              <Flex w='25px' h='25px' rounded='4px' border='1px solid gray' justifyContent='center' alignItems='center' _hover={{ bg: 'black', color: 'white', cursor: 'pointer' }}><SiFacebook/></Flex>
              <Flex w='25px' h='25px' rounded='4px' border='1px solid gray' justifyContent='center' alignItems='center' _hover={{ bg: 'black', color: 'white', cursor: 'pointer' }}><AiFillInstagram/></Flex>
              <Flex w='25px' h='25px' rounded='4px' border='1px solid gray' justifyContent='center' alignItems='center' _hover={{ bg: 'black', color: 'white', cursor: 'pointer' }}><FaYoutube/></Flex>
            </Flex>
          </Flex>

        </Flex>
      </Flex>
    </PortalLayout>
  )
}

export default Contactanos
