import {
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiStreamlit,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiFastapi,
  SiPrisma,
  SiZod,
  SiJsonwebtokens,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiGithubactions,
  SiVercel,
  SiPostman,
  SiRender,
  SiPython
} from 'react-icons/si';

import { VscAzure, VscVscode } from 'react-icons/vsc';
import { TbLetterK } from 'react-icons/tb';
import { FaInfinity, FaBug, FaVial, FaSpaceShuttle, FaHeart, FaMoon, FaLinkedin, FaHtml5, FaCss3, FaAngular, FaJava, FaJs, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export const AntigravityIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 180 180" fill="none">
    <path d="M144.248 149.062C151.748 154.688 162.998 150.938 152.685 140.625C121.748 110.625 128.31 28.125 89.8727 28.125C51.4352 28.125 57.9977 110.625 27.0602 140.625C15.8102 151.875 27.9977 154.688 35.4977 149.062C64.5602 129.375 62.6852 94.6875 89.8727 94.6875C117.06 94.6875 115.185 129.375 144.248 149.062Z" fill="currentColor"/>
  </svg>
);

export const DevinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 600 600" fill="currentColor">
    <path d="M38.3 201.7V77.6c0-5.5 3-10.5 7.7-13.3l107.5-62a15 15 0 0 1 15.3 0l107.5 62c4.7 2.8 7.6 7.8 7.6 13.3V141a62.4 62.4 0 0 0 92.4 53.3l55-31.7a15 15 0 0 1 15.2 0l107.5 62c4.7 2.8 7.7 7.9 7.7 13.3V362c0 5.5-3 10.5-7.7 13.3l-107.5 62a15 15 0 0 1-15.3 0L376.8 406a62.4 62.4 0 0 0-92.9 53.1v63.4c0 5.5-3 10.5-7.6 13.2l-107.5 62.1a15 15 0 0 1-15.3 0L46 535.7a15 15 0 0 1-7.7-13.3V398.3c0-5.5 3-10.5 7.7-13.3l107.5-62a15 15 0 0 1 15.3 0l55 31.8a62.4 62.4 0 0 0 92.3-54A66 66 0 0 0 285 246a62 62 0 0 0-61.2-.6l-55.2 32a15 15 0 0 1-15.3 0L45.9 214.9a15 15 0 0 1-7.6-13.2"/>
  </svg>
);

export const IconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FaHtml5,
  FaCss3,
  SiReact,
  FaAngular,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiStreamlit,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiFastapi,
  SiPrisma,
  SiZod,
  SiJsonwebtokens,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiGithubactions,
  SiVercel,
  SiPostman,
  SiRender,
  SiPython,
  FaJava,
  FaJs,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  VscAzure,
  VscVscode,
  FaInfinity,
  FaBug,
  FaVial,
  FaSpaceShuttle,
  FaHeart,
  FaMoon,
  TbLetterK,
  AntigravityIcon,
  DevinIcon
};
