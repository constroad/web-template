import { useRouter } from 'next/router'

import { Flex, Text } from '@chakra-ui/react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

import { navOptions, nosotrosOptions, serviciosOptions } from './config'

interface IMobileMenu {
  toggleNosotrosMenu: (option: string) => void
  toggleServiciossMenu: (option: string) => void
  nosotrosMenu: string | undefined
  serviciosMenu: string | undefined
  display: boolean | undefined
}

export const MobileMenu = (props: IMobileMenu) => {
  const router = useRouter()
  const path = router.pathname

  const handleOptionClick = (option: any) => {
    if (option.label === 'Nosotros') {
      props.toggleNosotrosMenu(option.label)
    } else if (option.label === 'Servicios') {
      props.toggleServiciossMenu(option.label)
    } else {
      router.push(option.path)
    }
  }

  return (
    <Flex
      position='fixed'
      top={{ base: '65px', md: '95px' }}
      left="0"
      width='100%'
      height='auto'
      zIndex={1000}
      backgroundColor='white'
      flexDir='column'
      alignItems='center'
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
      borderTop='1px solid'
      borderColor='lightgray'
      className={`${props.display ? 'opacity-100 unfold' : 'opacity-0'}`}
    >
      {navOptions.map(opt => (
        <Flex
          flexDir='column'
          key={opt.label}
          position='relative'
          alignItems='start'
          width='full'
          height='min-content'
          borderBottom="1px solid rgba(0, 0, 0, 0.1)"
          cursor='pointer'
          _hover={{shadow: 'md'}}
          onClick={() => handleOptionClick(opt)}
        >
          <Flex
            flexDir='row'
            fontSize={14}
            fontWeight={700}
            height={'70px'}
            color={path === opt.path ? '#feb100' : '#004d89'}
            paddingX='20px'
            paddingY='30px'
            width='100%'
          >
            {opt.label === 'Nosotros' && (
              <Flex width='full' justifyContent='space-between'>
                {opt.label}
                {props.nosotrosMenu ?
                  <FaCaretUp color='#004d89' fontSize={19} /> :
                  <FaCaretDown color='#004d89' fontSize={19} />
                }
              </Flex>
            )}
            {opt.label === 'Servicios' && (
              <Flex width='full' justifyContent='space-between'>
                {opt.label}
                {props.serviciosMenu ?
                  <FaCaretUp color='#004d89' fontSize={19} /> :
                  <FaCaretDown color='#004d89' fontSize={19} />
                }
              </Flex>
            )}
            {opt.label !== 'Nosotros' && opt.label !== 'Servicios' && (
              opt.label
            )}
          </Flex>

          {/* NOSOTROS */}
          {props.nosotrosMenu === 'Nosotros' && opt.label === 'Nosotros' && (
            <Flex
              flexDir='column'
              height='auto'
              width='100%'
              overflow='hidden'
              className={
                props.nosotrosMenu === 'Nosotros' && opt.label === 'Nosotros' ?
                'opacity-100 unfold' :
                'opacity-0'
              }
            >
              {nosotrosOptions.map(nopt => (
              <Flex
                flexDir='column'
                justifyContent='center'
                width='full'
                height='51px'
                paddingY='10px'
                paddingX='20px'
                key={nopt.label}
                borderTop="1px solid rgba(0, 0, 0, 0.1)"
                cursor='pointer'
                _hover={{shadow: 'md'}}
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`${opt.path}${nopt.path}`)
                }}
              >
                <Text
                  width='100%'
                  fontSize={12}
                  fontWeight={700}
                  paddingX='20px'
                  color={
                    path === `${opt.path}${nopt.path}` ?
                    '#feb100' :
                    '#004d89'
                  }
                >
                  - {nopt.label}
                </Text>
              </Flex>
            ))}
            </Flex>
            
          )}

          {/* SERVICIOS */}
          {props.serviciosMenu === 'Servicios' && opt.label === 'Servicios' && (
            <Flex
              flexDir='column'
              height='auto'
              width='100%'
              className={
                props.serviciosMenu === 'Servicios' && opt.label === 'Servicios' ?
                'opacity-100 unfold' :
                'opacity-0'
              }
            >
              {serviciosOptions.map(sopt => (
              <Flex
                flexDir='column'
                justifyContent='center'
                width='full'
                height='51px'
                paddingY='10px'
                paddingX='20px'
                key={sopt.label}
                borderTop="1px solid rgba(0, 0, 0, 0.1)"
                cursor='pointer'
                _hover={{shadow: 'md'}}
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`${opt.path}${sopt.path}`)
                }}
              >
                <Text
                  width='100%'
                  fontSize={12}
                  fontWeight={700}
                  paddingX='20px'
                  color={path === `${opt.path}${sopt.path}` ? '#feb100' : '#004d89'}
                >
                  - {sopt.label}
                </Text>
              </Flex>
            ))}
            </Flex>
            
          )}
        </Flex>
      ))}
    </Flex>
  )
}
