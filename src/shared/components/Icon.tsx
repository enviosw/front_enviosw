import * as FaIcons from 'react-icons/fa';
import { IconProps } from '../types/iconInterface';

export const Icon: React.FC<IconProps> = ({ iconName, size = 24 }) => {
    const IconComponent = FaIcons[iconName as keyof typeof FaIcons];

    return IconComponent ? <IconComponent size={size} /> : <span>Icono no disponible</span>;
};
