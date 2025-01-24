import React from "react";
import { Alert } from "@heroui/alert"; // Make sure the package is installed

const FormAlert = ({
  show,
  description,
}: {
  show: boolean;
  description: string;
}) => {
  if (!show) return null; // Do not render if `show` is false
  return (
    <Alert variant="solid" color="danger" className="w-full text-center">
      {description}
    </Alert>
  );
};

export default FormAlert;
