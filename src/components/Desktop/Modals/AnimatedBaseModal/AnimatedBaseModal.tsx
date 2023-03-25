import { DockItemType } from "@/interfaces/dock";
import { ReactElement, useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  item: DockItemType;
  onCloseModal: (id: string) => void;
  onUpperModal: (id: string) => void;
  children: ReactElement;
}

function AnimatedBaseModal({ children, onCloseModal, ...restProps }: Props) {
  const { isOpen, nowOpen } = restProps.item;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(
        () => {
          setIsVisible(true);
        },
        nowOpen ? 0 : 900,
      );
    }

    return () => {
      setIsVisible(false);
    };
  }, [isOpen]);

  const handleCloseModal = (id: string) => {
    setIsVisible(false);

    onCloseModal(id);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <BaseModal {...restProps} onCloseModal={handleCloseModal}>
            {children}
          </BaseModal>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedBaseModal;
