import typefaces from "@/styles/typefaces";
import React from "react";
import { Text, TextProps } from "react-native";

interface SpanProps extends TextProps {
  typeface: keyof typeof typefaces;
}

export const Span: React.FC<SpanProps> = ({
  typeface,
  children,
  style,
  ...props
}) => (
  <Text style={[typefaces[typeface], style]} {...props}>
    {children}
  </Text>
);

export const H1: React.FC<TextProps> = (props) => (
  <Span typeface="h1" {...props} />
);
export const Body: React.FC<TextProps> = (props) => (
  <Span typeface="body" {...props} />
);
export const SmallText: React.FC<TextProps> = (props) => (
  <Span typeface="small" {...props} />
);

export default Span;
