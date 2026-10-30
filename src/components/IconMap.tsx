import {
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiZod,
  SiJsonwebtokens,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiGithubactions,
  SiVercel,
  SiVitest,
  SiPostman,
  SiOpenaigym,
  SiRender
} from 'react-icons/si';

import { VscAzure, VscVscode } from 'react-icons/vsc';
import { TbLetterK } from 'react-icons/tb';
import { FaInfinity, FaBug, FaVial, FaSpaceShuttle, FaHeart, FaMoon, FaLinkedin, FaHtml5, FaCss3, FaAngular } from 'react-icons/fa';

export const AntigravityIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 20L12 5L19 20" />
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
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiZod,
  SiJsonwebtokens,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiGithubactions,
  SiVercel,
  SiVitest,
  SiPostman,
  SiOpenaigym,
  SiRender,
  FaLinkedin,
  VscAzure,
  VscVscode,
  FaInfinity,
  FaBug,
  FaVial,
  FaSpaceShuttle,
  FaHeart,
  FaMoon,
  TbLetterK,
  AntigravityIcon
};
