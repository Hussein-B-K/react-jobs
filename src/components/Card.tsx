/* eslint-disable react/prop-types */
/**
 * @description A reusable container component for displaying content within a styled card.
 * It provides basic padding, rounded corners, and a shadow.
 * @prop {React.ReactNode} children - The content to be rendered inside the card.
 * @prop {string} [bg="bg-gray-100"] - Optional CSS class to set the background color of the card.
 * Defaults to "bg-gray-100".
 */


interface CardProp {
  children: React.ReactNode,
  bg?: string,
}

const Card = ({ children, bg = "bg-gray-100" }: CardProp) => {
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

export default Card;
