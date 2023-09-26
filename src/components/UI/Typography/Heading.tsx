import React from 'react';
import { twJoin } from 'tailwind-merge';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = {
  label: string;
  className?: string;
  headingLevel: HeadingLevel;
  props?: React.HTMLAttributes<HTMLHeadingElement>;
};
const Heading = ({
  label,
  className,
  headingLevel,
  ...props
}: HeadingProps) => {
  const HeaderTag: HeadingLevel = headingLevel;

  return (
     <HeaderTag className={twJoin(className)} {...props} >{label}</HeaderTag>
  );
};

export default Heading;
