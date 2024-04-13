export const motionStyles = {
  viewport: { once: true },
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } },
  animate: { y: [0, -20, 0] },
  transition: {
    repeat: Infinity,
    duration: 5,
  },
};

export const pageTransitions = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 3, delay: 2 } },
};
