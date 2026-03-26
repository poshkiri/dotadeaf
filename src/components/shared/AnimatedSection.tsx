"use client";

import React, { Children, ElementType, ReactNode, createElement, useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedSectionVariant = "heading" | "featureCards" | "cta";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant: AnimatedSectionVariant;
};

const transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const headingVariants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition },
};

const featureContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

const ctaVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition },
};

export function AnimatedSection({
  children,
  className,
  as = "div",
  variant,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (variant === "featureCards") {
    const items = Children.toArray(children);
    return createElement(
      motion.div,
      {
        ref,
        className,
        variants: featureContainerVariants,
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
      },
      items.map((child, index) => (
        <motion.div key={index} variants={featureItemVariants}>
          {child}
        </motion.div>
      )),
    );
  }

  const variants = variant === "heading" ? headingVariants : ctaVariants;
  return createElement(
    motion.div,
    {
      ref,
      className,
      variants,
      initial: "hidden",
      animate: isInView ? "visible" : "hidden",
    },
    createElement(as, null, children),
  );
}