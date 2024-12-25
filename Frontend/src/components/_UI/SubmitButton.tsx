type SubmitButtonProps = {
  isLoading: boolean;
  buttonText: string;
  buttonColor?: string;
};

const SubmitButton = ({
  isLoading,
  buttonText,
  buttonColor = 'btn-primary',
}: SubmitButtonProps) => {
  return (
    <button type="submit" className={`btn ${buttonColor} w-100`} disabled={isLoading}>
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm pr-2"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        <div>{buttonText}</div>
      )}
    </button>
  );
};

export default SubmitButton;
