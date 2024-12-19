export {};

declare global {
  interface BigInt {
    /**
     * Converts the BigInt to a JSON-compatible string representation.
     */
    toJSON(): string;
  }
}
