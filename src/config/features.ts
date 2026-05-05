/**
 * Feature flags.
 *
 * SHOW_PRICING — When true, the public pricing tables (€ amounts, 1/5/10
 * session packages, BTW notes) are rendered on /tarieven and the homepage
 * #tarieven section. When false, a "Pricing on Application" (POA) card is
 * shown instead. Flip this single value to reinstate prices — all pricing
 * data, copy and JSX are preserved in code.
 */
export const SHOW_PRICING = false;
