import { FC, ReactNode, useState } from "react";

export type ButtonProps = {
  children?: ReactNode;
  link?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (() => Promise<void>) | (() => void);
  role?: "button" | "link";
  disabled?: boolean;
  className?: string;
  buttonType?: "primary" | "secondary" | "tertiary" | "outline";
  title?: string;
  icon?: JSX.Element;
  style?: object;
  hidden?: boolean;
  ariaLabel?: string;
};

const Button: FC<ButtonProps> = ({
  title,
  link,
  children,
  type = "button",
  buttonType,
  className,
  role,
  onClick,
  disabled = false,
  hidden,
  ariaLabel,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultButtonClasses = `font-medium rounded transition-all duration-300 ease-in-out inline-flex items-center justify-center w-fit`;

  const buttonTypeClasses = [
    {
      id: "primary",
      default:
        "bg-primary-700 text-primary-contrast border-none hover:bg-primary-900 hover:text-white",
      disabled: "bg-primary-100 text-white border-transparent",
    },
    {
      id: "secondary",
      default:
        "bg-secondary text-secondary-contrast border-none hover:bg-secondary-900 hover:text-secondary-contrast",
      disabled: "text-white bg-secondary-100",
    },
    {
      id: "tertiary",
      default: "bg-tertiary border-none hover:bg-tertiary-700 text-tertiary-contrast",
      disabled: "bg-tertiary-100 text-grey-500",
    },
    {
      id: "outline",
      default: "bg-transparent hover:bg-primary-50 text-primary-700 relative rounded-md before:absolute before:inset-[0px] before:border-2 before:border-primary-700 before:rounded before:pointer-events-none",
      disabled: "bg-transparent text-primary-100 relative rounded-md before:absolute before:inset-[0px] before:border-2 before:border-primary-100 before:rounded before:pointer-events-none",
    }
  ];

  const buttonTypeClass = buttonTypeClasses.find(
    (x) => x.id === (buttonType || "primary")
  );
  const buttonClasses = [
    disabled || isLoading
      ? `${buttonTypeClass?.disabled} cursor-default pointer-events-none` // disabled button classes
      : buttonTypeClass?.default, // button type classes
    defaultButtonClasses, // default classes
    className || "", // override/additional classes
  ].join(" ");

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // This was necessary because it was causing issues with redirecting vs submitting the form. Specifically for document upload
    if (!title) {
      event.preventDefault();
    }
    if (link) {
      if (link.startsWith("http")) {
        window.open(link, "_blank");
      }
    } else if (onClick !== undefined) {
      try {
        setIsLoading(true);
        await onClick();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button
      role={role ? role : link ? "link" : "button"}
      className={`${
        hidden ? "max-h-0 overflow-hidden hidden" : buttonClasses
      } transition-all duration-300`}
      disabled={disabled || isLoading}
      type={type}
      onClick={handleButtonClick}
      title={title}
      tabIndex={0}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="text-sm leading-none px-4 py-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
