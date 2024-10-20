"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card } from "@/components/ui/card";

const MultiImageCard = ({ children }: { children: React.ReactNode }) => {
  const images = React.Children.toArray(children);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    if (images.length <= 1) {
      setIndex(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Card className="p-0 ">
      <div className="relative w-full aspect-video">
        <AnimatePresence>
          {images.map((image, i) =>
            index === i ? (
              <motion.div
                key={i}
                className="absolute inset-0 overflow-hidden aspect-auto "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {image}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default MultiImageCard;
