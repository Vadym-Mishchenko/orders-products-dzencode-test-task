import { type Variants, type Transition } from 'framer-motion';

const transition: Transition = {
  duration: 0.4,
  ease: 'easeOut',
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};
