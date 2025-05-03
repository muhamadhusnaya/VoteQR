const ReminderMessage = ({ children, variant }) => {
  return (
    <>
      <p className={`${variant} mt-12 text-2xl font-semibold`}>
        {children}
      </p>
    </>
  );
};

export default ReminderMessage;
