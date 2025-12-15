// utils/animations.js

// import { Variants } from 'framer-motion';

// Basic fade in up animation
export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Stagger container for children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stagger item for use with staggerContainer
export const staggerItem = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Floating animation for subtle movement
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Slide in from left
export const slideInLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Slide in from right
export const slideInRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Scale in animation
export const scaleIn = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

// Bounce in animation
export const bounceIn = {
  initial: {
    scale: 0.3,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Page transitions
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Card hover animations
export const cardHover = {
  initial: {
    scale: 1,
    y: 0
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Text reveal animation
export const textReveal = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Gradient background animation
export const gradientBackground = {
  animate: {
    background: [
      'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Pulse animation
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Rotate animation
export const rotateAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Quick fade in
export const quickFadeIn = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Slide up with spring
export const slideUpSpring = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Stagger fade in
export const staggerFadeIn = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  },
  item: {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
};

// Typing animation
export const typingAnimation = {
  initial: {
    width: 0
  },
  animate: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Blur in animation
export const blurIn = {
  initial: {
    filter: "blur(10px)",
    opacity: 0
  },
  animate: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Combined animations for complex components
export const complexAnimation = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: {
      duration: 0.4
    }
  }
};

// Export all animations as a single object for easy importing
export const animations = {
  fadeInUp,
  staggerContainer,
  staggerItem,
  floatingAnimation,
  slideInLeft,
  slideInRight,
  scaleIn,
  bounceIn,
  pageTransition,
  cardHover,
  textReveal,
  gradientBackground,
  pulseAnimation,
  rotateAnimation,
  quickFadeIn,
  slideUpSpring,
  staggerFadeIn,
  typingAnimation,
  blurIn,
  complexAnimation
};

export const variants = {
    initial: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.95,
        transition: {
            duration: 0.4
        }
    }
}

export default animations;