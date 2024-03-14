import { Tooltip } from '@chakra-ui/react';

interface CustomTooltipProps {
  label: string;
  children: React.ReactNode;
}

export const CustomTooltip = (props: CustomTooltipProps) => {
  return (
    <Tooltip label={props.label} hasArrow placement="top">
      {props.children}
    </Tooltip>
  );
};

export default CustomTooltip;