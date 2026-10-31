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
  SiApachekafka,
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
import { FaInfinity, FaBug, FaVial, FaSpaceShuttle, FaHeart, FaMoon, FaLinkedin, FaHtml5, FaCss3, FaAngular, FaJava, FaJs, FaWhatsapp, FaInstagram, FaGit } from 'react-icons/fa';

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

export const GitIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor">
    <path d="M251.172 116.594L139.4 4.828c-6.433-6.437-16.873-6.437-23.314 0l-23.21 23.21 29.443 29.443c6.842-2.312 14.688-.761 20.142 4.693 5.48 5.489 7.02 13.402 4.652 20.266l28.375 28.376c6.865-2.365 14.786-.835 20.269 4.657 7.663 7.66 7.663 20.075 0 27.74-7.665 7.666-20.08 7.666-27.749 0-5.764-5.77-7.188-14.235-4.27-21.336l-26.462-26.462-.003 69.637a19.82 19.82 0 0 1 5.188 3.71c7.663 7.66 7.663 20.076 0 27.747-7.665 7.662-20.086 7.662-27.74 0-7.663-7.671-7.663-20.086 0-27.746a19.654 19.654 0 0 1 6.421-4.281V94.196a19.378 19.378 0 0 1-6.421-4.281c-5.806-5.798-7.202-14.317-4.227-21.446L81.47 39.442l-76.64 76.635c-6.44 6.443-6.44 16.884 0 23.322l111.774 111.768c6.435 6.438 16.873 6.438 23.316 0l111.251-111.249c6.438-6.44 6.438-16.887 0-23.324"/>
  </svg>
);

export const RestApiIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <path d="M16 13c-1.3 0-2.4.8-2.8 2H9c0-.7-.2-1.3-.5-1.8l7.1-7.3c.3 0 .6.1.9.1C17.9 6 19 4.9 19 3.5S17.9 1 16.5 1 14 2.1 14 3.5c0 .3.1.7.2 1l-7 7.2c-.6-.5-1.4-.7-2.2-.7V6.8C6.2 6.4 7 5.3 7 4c0-1.7-1.3-3-3-3S1 2.3 1 4c0 1.3.8 2.4 2 2.8v4.7c-1.2.7-2 2-2 3.4 0 2.2 1.8 4 4 4 1.5 0 2.8-.8 3.4-2h4.7c.4 1.1 1.5 2 2.8 2 1.6 0 3-1.3 3-3C19 14.3 17.6 13 16 13z"/>
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
  SiApachekafka,
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
  DevinIcon,
  GitIcon,
  RestApiIcon
};
